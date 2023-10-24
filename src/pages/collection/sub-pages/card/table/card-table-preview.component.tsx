import React, {useCallback} from "react";
import {MdPageview} from "react-icons/md";
import {useCardNavigateHook} from "../../../../../components/utils/useCardNavigate.hook.tsx";
import {Button} from "../../../../../components/utils/button.component.tsx";

export const PreviewCell: React.FC = (props: any) => {
	const {goCard} = useCardNavigateHook(props.collectionId!, props.data.id!);

	const handleClick = useCallback(() => {
		goCard();
	}, []);

	return <div className={'table-button-column'}>
		<Button type={'round-primary'} onClick={handleClick} icon={<MdPageview/>} size={'sm'}/>
	</div>;
}
