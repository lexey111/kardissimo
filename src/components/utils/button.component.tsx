import React from "react";

export type TButtonProps = {
	type?: 'primary' | 'secondary' | 'round' | 'danger'
	disabled?: boolean
	pressed?: boolean
	size?: 'sm' | 'md' | 'xl'
	variant?: 'full-width'
	icon?: JSX.Element
	onClick: () => void
	children?: any
}

export const Button: React.FC<TButtonProps> = ({
	                                               icon,
	                                               children,
	                                               onClick,
	                                               variant,
	                                               pressed = false,
	                                               disabled = false,
	                                               type = 'primary',
	                                               size = 'md'
                                               }) => {
	let classNames = [];

	switch (type) {
		case 'primary' :
			classNames.push('pure-button-primary');
			break;
		case 'secondary' :
			classNames.push('pure-button-secondary');
			break;
		case 'danger' :
			classNames.push('pure-button-danger');
			break;
		case 'round' :
			classNames.push('pure-button-round');
			break;
	}

	switch (size) {
		case 'sm':
			classNames.push('button-sm');
			break;
		case 'md':
			classNames.push('button-md');
			break;
		case 'xl':
			classNames.push('button-xl');
			break;
	}

	if (variant === 'full-width') {
		classNames.push('full-width');
	}

	if (disabled) {
		classNames.push('disabled');
	}

	if (pressed) {
		classNames.push('pressed');
	}

	if (icon && children) {
		classNames.push('text-icon');
	}

	return <button className={'pure-button' + (classNames.length ? ' ' + classNames.join(' ') : '')}
	               disabled={disabled}
	               onClick={onClick}>
		{icon}
		{type !== 'round' && <span className={'button-text'}>{children}</span>}
	</button>;
};
