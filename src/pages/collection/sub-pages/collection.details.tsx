import React, {useCallback, useState} from "react";
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {Formik,} from 'formik';
import {CollectionForm} from "./collection-form.component.tsx";
import {TCollection} from "../../../store/data/types.ts";
import {PageNotFound} from "../../../components/utils/page-not-found.component.tsx";
import {removeCollection, updateCollection} from "../../../store/data/collections-store.actions.ts";
import {getCollection} from "../../../store/data/collections-store.selectors.ts";
import {AppSubPage} from "../../../components/app-subpage.component.tsx";
import {useCardNavigateHook} from "../../../components/utils/useCardNavigate.hook.tsx";

export const CollectionDetails: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	const collection = getCollection(params.id);

	const {resetPosition} = useCardNavigateHook(params.id, '');
	resetPosition();

	const [searchParams] = useSearchParams();
	const isNew = searchParams.get('new') !== null;

	const [initState] = useState<TCollection>(collection!);

	const handleBack = useCallback(() => {
		//setInitState(getCollection(params.id)!);
		if (isNew) {
			removeCollection(params.id!);
			navigate('/collections');
			return;
		}
		navigate(`/collections/${collection!.id}/details`);
	}, []);

	const handleSubmit = useCallback((values: TCollection) => {
		updateCollection(values);

		if (isNew) {
			navigate(`/collections/${collection!.id}/cards`); // to prevent deletion
			return;
		}

		navigate(`/collections/${collection!.id}/details`);
	}, []);

	if (!collection || !collection.sides) {
		return <PageNotFound/>;
	}

	return <AppSubPage>
		<div className={'form-editor'}>
			<Formik
				initialValues={initState}
				onReset={handleBack}
				onSubmit={handleSubmit}
				validateOnMount={true}
				validateOnChange={true}
				validateOnBlur={true}
				component={CollectionForm}/>
		</div>
	</AppSubPage>;
};
