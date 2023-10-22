import React, {useCallback} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {CollectionDetailsForm} from "./collection-details-form.component.tsx";
import {TCollection} from "../../../store/data/types.ts";
import {getCollection} from "../../../store/data/collections-store.selectors.ts";
import {useCardNavigateHook} from "../../../components/utils/useCardNavigate.hook.tsx";
import {
	createCollection,
	getDefaultCollection,
	updateCollection
} from "../../../store/data/collections-store.actions.ts";

export const CollectionDetailsData: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	let collectionId = params.collectionId;
	const isNew = params.collectionId === 'new';

	const state: TCollection = isNew ? getDefaultCollection() : getCollection(collectionId)!;

	const {resetPosition} = useCardNavigateHook(collectionId, '');
	resetPosition();

	// const [initState, setInitState] = useState<TCollection>(getCollection(params.collectionId)!);

	const handleBack = useCallback(() => {
			navigate('/collections');
	}, []);

	const handleSubmit = useCallback((values: TCollection) => {
		if (isNew) {
			createCollection(values);
			navigate(`/collections`);
			return;
		}
		updateCollection(values);
		navigate('/collections');
	}, []);

	const handleGoCards = useCallback(() => {
		navigate(`/collections/${collectionId}/cards`);
	}, []);

	return <CollectionDetailsForm
		initialState={state}
		onSubmit={handleSubmit}
		onCancel={handleBack}
		goCards={handleGoCards}
		isNew={isNew}/>;
};
