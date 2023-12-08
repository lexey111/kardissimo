import React from "react";
import {CardboxListItem} from "./cardbox-list.item.component.tsx";
import {EmptyCardboxListAdd} from "./empty-cardbox-list-add.component.tsx";
import {CardboxListAddItem} from "./cardbox-list.add-item.component.tsx";
import {IoIosAddCircle} from "react-icons/io";
import {useCardboxes} from "../../../../../store/cardboxes/hooks/useCardboxesHook.tsx";
import {WaitInline} from "../../../../../components/utils/wait-inline.component.tsx";

export const CardboxList: React.FC = () => {
	const {data, isLoading} = useCardboxes();

	if (isLoading) {
		return <WaitInline text={'Loading data...'}/>;
	}

	if (!data || data.length === 0) {
		return <div className={'cardbox-list empty'}>
			<EmptyCardboxListAdd/>
			<p className={'no-data-text'}>
				<span className={'arrow-up'}></span>
				There are no yet card boxes to display. Please, use the button <IoIosAddCircle/> above to create the
				first one.
			</p>
		</div>;
	}

	return <div className={'cardbox-list'}>
		{data?.map(cardbox => {
			return <div key={cardbox.id} className={'cardbox-item'}>
				<CardboxListItem cardbox={cardbox}/>
			</div>;
		})}

		<CardboxListAddItem/>
	</div>;
};
