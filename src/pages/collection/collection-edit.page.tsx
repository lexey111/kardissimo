import React, {useCallback, useState} from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {CollectionScene} from "../../components/scene/collection-scene.component.tsx";
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {Formik, FormikHelpers,} from 'formik';
import {AppSecondaryPageHeader} from "../../components/app-secondary-page-header.component.tsx";
import {CollectionForm} from "./collection-form.component.tsx";
import {TCollection} from "../../store/data/types.ts";
import {CollectionNotFound} from "../../components/utils/collection-not-found.component.tsx";
import {updateCollection} from "../../store/data/collections-store.actions.ts";
import {getCollection} from "../../store/data/collections-store.selectors.ts";

export const CollectionEditPage: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams()
	const collection = getCollection(params.id)

	const [initState] = useState<TCollection>(collection!);

	const handleBack = useCallback(() => {
		navigate(-1);
	}, []);

	const handleSubmit = useCallback((values: TCollection, actions: FormikHelpers<TCollection>) => {
		updateCollection(values);

		actions.resetForm();

		navigate('/collections');
	}, []);

	if (!collection || !collection.sides) {
		return <CollectionNotFound/>;
	}

	return <AppPage title={'Collection page'}>
		<AppSecondaryPageHeader
			title={<div>
				<NavLink to={'/collections'}>Collections</NavLink>
				<i>|</i>
				<b>{collection.title}</b>&nbsp; &mdash; Edit
			</div>}
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
