import React, {useCallback} from "react";

export type TSwitchProps = {
	value: boolean
	text?: string
	boldOnFocus?: boolean
	onChange: (value: boolean) => void
}

export const Switch: React.FC<TSwitchProps> = ({value, text, onChange, boldOnFocus = true}) => {
	const handleClick = useCallback(() => {
		onChange(!value);
	}, [value, onChange]);

	const handleKeys = useCallback((e: any) => {
		if (e.key === ' ' || e.key === 'Enter') {
			handleClick();
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
	}, [handleClick]);

	const classes = ['switch-wrapper'];
	if (value) {
		classes.push('checked');
	}
	if (text) {
		classes.push('with-label');
	}
	if (!boldOnFocus) {
		classes.push('no-bold')
	}

	return <span
		className={classes.join(' ')}
		onKeyDown={handleKeys}
		tabIndex={0}
		onClick={handleClick}>
		<span className={'switch-body'}>
			<span className={'switch-handle'}></span>
		</span>
		{!!text && <span className={'switch-label'}>{text}</span>}
	</span>;
}
