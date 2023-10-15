import React, {useCallback, useEffect, useRef} from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {AppSecondaryPageHeader} from "../../components/app-secondary-page-header.component.tsx";
import {CollectionNotFound} from "../../components/utils/collection-not-found.component.tsx";
import {countCards, getCollection} from "../../store/data/collections-store.selectors.ts";
import {CardAddFloating} from "../../components/card-editor/card-add-floating.component.tsx";
import {CardList} from "../../components/card-editor/list/card-list.component.tsx";
import {CollectionScene} from "../../components/scene/collection-scene.component.tsx";
import {CardListHeader} from "../../components/card-editor/list/card-list-header.component.tsx";

export const CardsPage: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams()
	const collection = getCollection(params.id);
	const count = countCards(params.id);
	const destroying = useRef(false);

	useEffect(() => {
		return () => {
			destroying.current = true;
		}
	}, []);

	const handleBack = useCallback(() => {
		navigate('/collections');
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

	return <AppPage title={'Cards: ' + collection?.title}
	                float={<CardAddFloating collectionId={collection.id}/>}>

		<AppSecondaryPageHeader
			title={<div>
				<NavLink to={'/collections'}>Collections</NavLink>
				<i>|</i>
				<b>{collection.title}</b>&nbsp; &mdash; Cards <span className={'badge badge-white'}>{count}</span>
			</div>}
			image={<CollectionScene/>}
			onBack={handleBack}
		/>

		<div className={'page'}>
			<CardListHeader collectionId={collection.id}/>
			<CardList collectionId={collection.id}/>
		</div>
	</AppPage>;
};
