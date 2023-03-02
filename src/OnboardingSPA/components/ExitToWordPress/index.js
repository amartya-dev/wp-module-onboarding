import { useSelect } from '@wordpress/data';
import { useLocation } from 'react-router-dom';
import { chevronLeft } from '@wordpress/icons';
import { Fragment, useState } from '@wordpress/element';
import { Button, ButtonGroup, Modal } from '@wordpress/components';

import { __, sprintf } from '@wordpress/i18n';
import classNames from 'classnames';
import { setFlow } from '../../utils/api/flow';
import { store as nfdOnboardingStore } from '../../store';
import { getSettings, setSettings } from '../../utils/api/settings';
import { wpAdminPage, dashboardPage } from '../../../constants';

/**
 * Self-contained button and confirmation modal for exiting Onboarding page.
 *
 * @param {*} param0
 * @return
 */
const ExitToWordPress = ( {
	buttonText = __( 'Exit to WordPress', 'wp-module-onboarding' ),
	showButtonIcon = true,
	showButton = true,
	buttonVariant = 'secondary',
	buttonClassName = false,
	isModalOpen = false,
	modalTitle = __( 'Exit without finishing?', 'wp-module-onboarding' ),
	modalText = false,
	modalPrimaryCloseButtonText = __( 'Continue', 'wp-module-onboarding' ),
	modalOnClose = false,
	modalExitButtonText = __( 'Exit', 'wp-module-onboarding' ),
} ) => {
	const [ isOpen, setIsOpen ] = useState( isModalOpen );
	const openModal = () => setIsOpen( true );
	const closeModal = () => {
		if ( typeof modalOnClose === 'function' ) {
			modalOnClose();
		}
		setIsOpen( false );
	};

	const location = useLocation();
	const { currentData, brandName } = useSelect(
		( select ) => {
			return {
				currentData:
					select( nfdOnboardingStore ).getCurrentOnboardingData(),
				brandName: select( nfdOnboardingStore ).getNewfoldBrandName(),
			};
		},
		[ location.pathname ]
	);

	if ( ! modalText ) {
		modalText = sprintf(
			/* translators: %s: Brand */
			__(
				'You can restart onboarding from your %s Settings page.',
				'wp-module-onboarding'
			),
			brandName
		);
	}

	async function syncSocialSettingsFinish( currentData ) {
		const initialData = await getSettings();
		const result = await setSettings( currentData?.data?.socialData );
		if ( result?.error !== null ) {
			return initialData?.body;
		}
		return result?.body;
	}

	async function saveData( path, currentData ) {
		if ( currentData ) {
			currentData.hasExited = new Date().getTime();

			// If Social Data is changed then sync it
			if ( path?.includes( 'basic-info' ) ) {
				const socialData = await syncSocialSettingsFinish(
					currentData
				);

				// If Social Data is changed then Sync that also to the store
				if ( socialData && currentData?.data )
					currentData.data.socialData = socialData;
			}
			setFlow( currentData );
		}
		//Redirect to Admin Page for normal customers
		// and Bluehost Dashboard for ecommerce customers
		const exitLink = exitToWordpressForEcommerce()
			? dashboardPage
			: wpAdminPage;
		window.location.replace( exitLink );
	}

	return (
		<Fragment>
			{ showButton && (
				<Button
					icon={ showButtonIcon ? chevronLeft : false }
					variant={ buttonVariant }
					onClick={ openModal }
					className={ classNames(
						`nfd-onboarding-etw__trigger`,
						buttonClassName
					) }
				>
					{ buttonText }
				</Button>
			) }
			{ isOpen && (
				<Modal
					title={ modalTitle }
					onRequestClose={ () => closeModal() }
				>
					<p>{ modalText }</p>
					<ButtonGroup className="nfd-onboarding-etw__buttons">
						<Button
							variant="secondary"
							onClick={ () => closeModal() }
						>
							{ modalPrimaryCloseButtonText }
						</Button>
						<Button
							variant="primary"
							onClick={ ( e ) =>
								saveData( location.pathname, currentData )
							}
						>
							{ modalExitButtonText }
						</Button>
					</ButtonGroup>
				</Modal>
			) }
		</Fragment>
	);
};

/*
 * check if this is the last step
 */
const exitToWordpressForEcommerce = () => {
	if ( window.nfdOnboarding.currentFlow === 'ecommerce' ) {
		return true;
	}
	return false;
};
export default ExitToWordPress;
