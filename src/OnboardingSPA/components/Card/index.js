import { check, Icon } from '@wordpress/icons';
import { Card as WordPressCard } from '@wordpress/components';

/**
 * Interface Cards with standard design.
 *
 * @returns
 */
const Card = ({ id, path, title, desc, isSelected, onSelectedChange }) => {
	return (
		<WordPressCard className={`nfd-card ${isSelected ? 'nfd-selected-card-box' : ''}`}
			onClick={e => onSelectedChange(id)} >
			<div className="nfd-card__top_row">
				<div className="nfd-card__icon">
					<div className="nfd-card__icon_box" style={{ backgroundImage: `var(${path})`}}></div>
				</div>
				<div className={`${isSelected ? 'nfd-card__icon_selected' : 'nfd-card__icon_unselected'}`}>
					<Icon
						className="nfd-card__icon_selected_path"
						icon={check}
						size={64}
					/>
				</div>
			</div>
			<div className={`nfd-card__body ${isSelected ? 'nfd-selected-card' : ''}`}>
				<h2 className="nfd-card__body_title">{title}</h2>
				<p className="nfd-card__body_description">{desc}</p>
			</div>
		</WordPressCard>
	);
};

export default Card;
