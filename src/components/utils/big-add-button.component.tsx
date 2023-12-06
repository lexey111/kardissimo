import React, {useCallback} from "react";
import {FaPlus} from "react-icons/fa";

export type TAddBigButtonProps = {
	onClick: () => void
	icon?: any
	center?: boolean
}

export const BigAddButton: React.FC<TAddBigButtonProps> = ({onClick, icon, center= false}) => {
	const handleKeydown = useCallback((e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			onClick();
		}
	}, []);


	return <div className={'add-some-item' + (center ? ' center' : '')} onKeyDown={handleKeydown} onClick={onClick} tabIndex={0}>
		{icon || <FaPlus/>}
	</div>;
}
