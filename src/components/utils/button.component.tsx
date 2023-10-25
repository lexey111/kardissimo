import React from "react";

export type TButtonProps = {
	type?: 'primary' | 'success' | 'secondary' | 'round' | 'danger' | 'round-danger' | 'round-primary' | 'round-success'
	disabled?: boolean
	pressed?: boolean
	size?: 'sm' | 'md' | 'lg' | 'xl'
	variant?: 'full-width' | 'margin-right' | 'white-ring'
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
		case 'success' :
			classNames.push('pure-button-success');
			break;
		case 'danger' :
			classNames.push('pure-button-danger');
			break;
		case 'round' :
			classNames.push('pure-button-round');
			break;
		case 'round-danger' :
			classNames.push('pure-button-round');
			classNames.push('round-danger');
			break;
		case 'round-primary' :
			classNames.push('pure-button-round');
			classNames.push('round-primary');
			break;
		case 'round-success' :
			classNames.push('pure-button-round');
			classNames.push('round-success');
			break;
	}

	switch (size) {
		case 'sm':
			classNames.push('button-sm');
			break;
		case 'md':
			classNames.push('button-md');
			break;
		case 'lg':
			classNames.push('button-lg');
			break;
		case 'xl':
			classNames.push('button-xl');
			break;
	}

	if (variant === 'full-width') {
		classNames.push('full-width');
	}

	if (variant === 'margin-right') {
		classNames.push('margin-right');
	}

	if (variant === 'white-ring') {
		classNames.push('white-ring');
	}

	if (disabled) {
		classNames.push('disabled');
	}

	if (pressed) {
		classNames.push('pressed');
	}

	if (icon && children && type.indexOf('round') === -1) {
		classNames.push('text-icon');
	}

	return <button className={'pure-button' + (classNames.length ? ' ' + classNames.join(' ') : '')}
	               disabled={disabled}
	               onClick={onClick}>
		{icon}
		{type !== 'round' && <span className={'button-text'}>{children}</span>}
	</button>;
};
