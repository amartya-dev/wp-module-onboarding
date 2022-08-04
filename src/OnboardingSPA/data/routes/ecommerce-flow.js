import { __ } from '@wordpress/i18n';
import { store, institution, box } from '@wordpress/icons';
import { lazy } from '@wordpress/element';
import { orderBy, filter } from 'lodash';

import {
	routes as defaultInitialRoutes,
	steps as defaultInitialSteps,
	initialTopSteps as defaultInitialTopSteps,
} from './default-flow';

const StepAddress = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepAddress' )
);
const StepTax = lazy( () => import( '../../pages/Steps/Ecommerce/StepTax' ) );
const StepProducts = lazy( () =>
	import( '../../pages/Steps/Ecommerce/StepProducts' )
);

import { VIEW_NAV_ECOMMERCE_STORE_INFO } from '../../../constants';

export const ecommerceSteps = [
	{
		path: '/ecommerce/step/address',
		title: __( 'Street Address', 'wp-module-onboarding' ),
		heading: __( 'Street Address', 'wp-module-onboarding' ),
		subheading: __(
			'Hello, add a subheading for the learn more sidebar.',
			'wp-module-onboarding'
		),
		description: __(
			"Hello, add a description for the learn more sidebar.",
			'wp-module-onboarding'
		),
		Component: StepAddress,
		Icon: store,
		priority: 85,
		VIEW: VIEW_NAV_ECOMMERCE_STORE_INFO,
	},
	{
		path: '/ecommerce/step/tax',
		title: __( 'Tax Info', 'wp-module-onboarding' ),
		heading: __( 'Tax Info', 'wp-module-onboarding' ),
		subheading: __(
			'Hello, add a subheading for the learn more sidebar.',
			'wp-module-onboarding'
		),
		description: __(
			"Hello, add a description for the learn more sidebar.",
			'wp-module-onboarding'
		),
		Component: StepTax,
		Icon: institution,
		priority: 90,
		VIEW: VIEW_NAV_ECOMMERCE_STORE_INFO,
	},
	{
		path: '/ecommerce/step/products',
		title: __( 'Product Info', 'wp-module-onboarding' ),
		heading: __( 'Product Info', 'wp-module-onboarding' ),
		subheading: __(
			'Hello, add a subheading for the learn more sidebar.',
			'wp-module-onboarding'
		),
		description: __(
			"Hello, add a description for the learn more sidebar.",
			'wp-module-onboarding'
		),
		Component: StepProducts,
		Icon: box,
		priority: 95,
		VIEW: VIEW_NAV_ECOMMERCE_STORE_INFO,
	},
];

export const steps = orderBy(
	[
		...filter(
			defaultInitialSteps,
			( step ) => ! step.path.includes( '/step/top-priority' )
		),
		...ecommerceSteps,
	],
	[ 'priority' ],
	[ 'asc' ]
);

export const routes = orderBy(
	[ ...steps, ...defaultInitialRoutes ],
	[ 'priority' ],
	[ 'asc' ]
);

export const initialTopSteps = () => {
	const topSteps = filter( ecommerceSteps, ( step ) => {
		return ! step.path.includes( '/ecommerce/step' );
	} );

	const ecommerceStep = {
		/* This is a pseudo step to stand-in for all StoreInfo steps and does not have a Component to render */
		path: '/ecommerce/step/address',
		title: __( 'Store Info', 'wp-module-onboarding' ),
		description: '',
		Icon: store,
		VIEW: VIEW_NAV_ECOMMERCE_STORE_INFO,
		priority: 41 /* matches priority for first store info step */,
	};

	topSteps.push( ecommerceStep );

	const filteredSteps = filter(
		defaultInitialTopSteps(),
		( step ) => ! step.path.includes( '/step/top-priority' )
	);

	return orderBy(
		[ ...filteredSteps, ...topSteps ],
		[ 'priority' ],
		[ 'asc' ]
	);
};
