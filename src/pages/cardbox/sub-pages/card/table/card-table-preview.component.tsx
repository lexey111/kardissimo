import React, {useCallback} from "react";
import {MdPageview} from "react-icons/md";
import {useCardNavigateHook} from "../../../../../components/hooks/useCardNavigate.hook.tsx";
import {Button} from "../../../../../components/utils/button.component.tsx";

export const PreviewCell: React.FC = (props: any) => {
	const {goCard} = useCardNavigateHook(props.cardboxId!, props.data.id!);

	const handleClick = useCallback(() => {
		localStorage.setItem('_lastCardsScrollPos', (document.scrollingElement?.scrollTop || 0).toString());
		goCard();
	}, [goCard]);

	return <div className={'table-button-column'}>
		<Button type={'round-primary'} onClick={handleClick} icon={<MdPageview/>} size={'sm'}/>
	</div>;
}
