import React, {useCallback, useState} from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {CollectionScene} from "../../components/scene/collection-scene.component.tsx";
import {useNavigate, useParams} from 'react-router-dom';
import {Formik, FormikHelpers,} from 'formik';
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {AppSecondaryPageHeader} from "../../components/app-secondary-page-header.component.tsx";
import {CollectionForm} from "./collection-form.component.tsx";
import {TCollection} from "../../store/data/types.ts";
import {CollectionNotFound} from "../../components/utils/collection-not-found.component.tsx";

const selector = (state: ICollectionState) => state.update;
export const EditCollectionPage: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams()
	const collection = useCollectionStore((state) => state.collections.find(c => c.id === params.id));
	const update = useCollectionStore(selector);

	const [initState] = useState<TCollection>(collection!);

	const handleBack = useCallback(() => {
		navigate(-1);
	}, []);

	const handleSubmit = useCallback((values: TCollection, actions: FormikHelpers<TCollection>) => {
		update(values);

		actions.resetForm();

		navigate('/collections');
	}, []);

	if (!collection || !collection.sides) {
		return <CollectionNotFound/>;
	}

	return <AppPage title={'Collection page'}>
		<AppSecondaryPageHeader
			title={'Collection'}
			subtitle={collection.title}
			image={<CollectionScene/>}
			onBack={handleBack}
		/>
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
	</AppPage>;
};
