import React, {useCallback} from "react";
import {IoIosAddCircle} from "react-icons/io";


export type TAddBigButtonProps = {
	onClick: () => void
}

export const BigAddButton: React.FC<TAddBigButtonProps> = ({onClick}) => {
	const handleKeydown = useCallback((e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			onClick();
		}
	}, []);


	return <div className={'add-some-item'} onKeyDown={handleKeydown} onClick={onClick} tabIndex={0}>
		<IoIosAddCircle/>
	</div>;

}
