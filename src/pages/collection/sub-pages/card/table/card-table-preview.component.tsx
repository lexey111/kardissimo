import React, {useCallback} from "react";
import {MdPageview} from "react-icons/md";
import {useCardNavigateHook} from "../../../../../components/utils/useCardNavigate.hook.tsx";

export const PreviewCell: React.FC = (props: any) => {
	const {goCard} = useCardNavigateHook(props.collectionId!, props.data.id!);

	const handleClick = useCallback(() => {
		goCard();
	}, []);

	return <div className={'table-button-column'}>
		<span onClick={handleClick}><MdPageview/></span>
	</div>;
}
