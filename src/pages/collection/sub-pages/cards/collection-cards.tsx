import React, {useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {CollectionNotFound} from "../../../../components/utils/collection-not-found.component.tsx";
import {getCollection} from "../../../../store/data/collections-store.selectors.ts";
import {CardAddFloating} from "../../../../components/card-editor/card-add-floating.component.tsx";
import {CardList} from "../../../../components/card-editor/list/card-list.component.tsx";
import {CardListHeader} from "../../../../components/card-editor/list/card-list-header.component.tsx";
import {AppSubPage} from "../../../../components/app-subpage.component.tsx";

export const CollectionCards: React.FC = () => {
	const params = useParams()
	const collection = getCollection(params.id);
	const destroying = useRef(false);

	useEffect(() => {
		return () => {
			destroying.current = true;
		}
	}, []);

	useEffect(() => {
		const restoredPosition = Number(localStorage.getItem('_list_scroll_position'));
		if (isNaN(restoredPosition)) {
			return;
		}

		localStorage.removeItem('_list_scroll_position');

		setTimeout(() => {
			if (destroying.current) {
				return;
			}
			const scrollContainer: any = document.querySelector('#root');

			if (scrollContainer) {
				scrollContainer.scrollTop = restoredPosition;
			}
		}, 20);
	}, []);

	if (!collection || !collection.sides) {
		return <CollectionNotFound/>;
	}

	return <AppSubPage float={<CardAddFloating collectionId={collection.id}/>}>

		<div className={'page'}>
			<CardListHeader collectionId={collection.id}/>
			<CardList collectionId={collection.id}/>
		</div>
	</AppSubPage>;
};
