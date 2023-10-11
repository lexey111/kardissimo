import React, {useCallback, useState} from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {CollectionScene} from "../../components/scene/collection-scene.component.tsx";
import {useNavigate} from 'react-router-dom';
import {Formik, FormikHelpers,} from 'formik';
import {ICollectionState, TCollection, useCollectionStore} from "../../store/data/collections-store.ts";
import {AppSecondaryPageHeader} from "../../components/app-secondary-page-header.component.tsx";
import {CollectionForm} from "./collection-form.component.tsx";

const InitialValues: TCollection = {
	title: '',
	author: '',
	isLocal: true
}

function getInitialValues(): TCollection {
	return {
		...InitialValues,
		stat: {
			changed_at: new Date(),
			created_at: new Date()
		},
		sides: ['English', 'Español']
	};
}

const selector = (state: ICollectionState) => state.add;

export const NewCollectionPage: React.FC = () => {
	const navigate = useNavigate();
	const add = useCollectionStore(selector);

	const [initState] = useState<TCollection>(getInitialValues());

	const handleBack = useCallback(() => {
		navigate(-1);
	}, []);

	const handleSubmit = useCallback((values: TCollection, actions: FormikHelpers<TCollection>) => {
		// console.log({values, actions});
		// alert(JSON.stringify(values, null, 2));
		// {
		// 	"title": "wdw",
		// 	"author": "dwqdfrf re",
		// 	"isLocal": true,
		// 	"stat": {
		// 	"changed_at": "2023-10-11T13:54:04.561Z",
		// 		"created_at": "2023-10-11T13:54:04.561Z"
		// },
		// 	"sides": [
		// 	"English",
		// 	"Español"
		// ]
		// }
		add({
			title: values.title,
			isLocal: true,
			author: values.author,
			sides: values.sides
		});
		actions.resetForm();
		navigate('/collections');
	}, []);

	return <AppPage title={'New collection page'}>
		<AppSecondaryPageHeader
			title={'New collection'}
			subtitle={'Create your own set of cards'}
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
