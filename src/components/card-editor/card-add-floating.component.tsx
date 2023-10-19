import React, {useCallback} from "react";
import {IoIosAddCircle} from "react-icons/io";
import {useHeight} from "../utils/useHeight.hook.tsx";
import {useCardNavigateHook} from "../utils/useCardNavigate.hook.tsx";


export type TCardAddProps = {
	collectionId?: string
}


export const CardAddFloating: React.FC<TCardAddProps> = ({collectionId}) => {
	const {goCard} = useCardNavigateHook(collectionId!, 'new');
	const {needToShowScroll} = useHeight(50);

	const handleAdd = useCallback(() => {
		goCard();
	}, []);

	if (!needToShowScroll) {
		return null;
	}

	return <div className={'add-card-floating'} onClick={handleAdd}>
		<IoIosAddCircle/>
	</div>;

};
