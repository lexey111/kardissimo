import React, {useCallback} from "react";
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {CollectionDetailsForm} from "./collection-details-form.component.tsx";
import {TCollection} from "../../../store/data/types.ts";
import {removeCollection, updateCollection} from "../../../store/data/collections-store.actions.ts";
import {getCollection} from "../../../store/data/collections-store.selectors.ts";
import {useCardNavigateHook} from "../../../components/utils/useCardNavigate.hook.tsx";

export const CollectionDetailsData: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();

	const {resetPosition} = useCardNavigateHook(params.id, '');
	resetPosition();

	const [searchParams] = useSearchParams();
	const isNew = searchParams.get('new') !== null;

	// const [initState, setInitState] = useState<TCollection>(getCollection(params.id)!);
	const state = getCollection(params.id)!;

	const handleBack = useCallback(() => {
		if (isNew) {
			removeCollection(params.id!);
			navigate('/collections');
			return;
		}
		updateCollection(state);

		//navigate(`/collections/${params.id}/details`);
	}, []);

	const handleSubmit = useCallback((values: TCollection) => {
		updateCollection(values);

		if (isNew) {
			// navigate(`/collections/${params.id}/cards`); // to prevent deletion
			// return;
		}
	}, []);

	return <CollectionDetailsForm
		initialState={state}
		onSubmit={handleSubmit}
		onCancel={handleBack}
		isNew={isNew}/>;
};
