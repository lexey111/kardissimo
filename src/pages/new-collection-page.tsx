import React, {useCallback, useState} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {CollectionScene} from "../components/scene/collection-scene.component.tsx";
import {AppPageHeader} from "../components/app-page-header.component.tsx";
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik, FormikHelpers,} from 'formik';
import {TCollection} from "../store/data/collections-store.ts";


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
		}
	};
}

function validateTitle(value: string) {
	let error;
	if (!value || !value.trim()) {
		error = 'Please fill the field';
	}
	if (value.length < 3 || value.length > 50) {
		error = 'Length must be from 3 to 50 characters';
	}
	return error;
}

const CollectionForm = ({
	                        handleSubmit,
	                        handleReset,
	                        // handleChange,
	                        // handleBlur,
	                        // values,
	                        errors,
	                        touched,
	                        // setErrors,
                        }: any) => {


	return <Form>
		<fieldset>
			<label htmlFor="title">Title*</label>
			<Field id="title" name="title" type={'text'}
			       validate={validateTitle}
			       autoFocus={'on'}
			       autoComplete="off"
			       maxLength={50} size={40}
			       className={errors.title && touched.title ? 'error' : ''}
			       placeholder="My first collection" required/>
		</fieldset>
		{touched.title && <ErrorMessage name="title" component="div" className={'error'}/>}

		<fieldset>
			<label htmlFor="author">Author</label>
			<Field id="author" name="author"
			       autoComplete="off"
			       maxLength={50} size={40}
			       placeholder="John Doe" type={'text'}/>
		</fieldset>
		<fieldset className={'actions'}>
			<button type="button" className={'pure-button'} onClick={handleReset}>&larr; Cancel</button>
			&nbsp;
			<button type="button" onClick={handleSubmit} className={'pure-button pure-button-primary'}>Continue</button>
		</fieldset>
	</Form>
};

export const NewCollectionPage: React.FC = () => {
	const navigate = useNavigate();

	const [initState] = useState<TCollection>(getInitialValues());

	const handleBack = useCallback(() => {
		console.log('go back');
		navigate(-1);
	}, []);

	const handleSubmit = useCallback((values: TCollection, actions: FormikHelpers<TCollection>) => {
		console.log({values, actions});
		alert(JSON.stringify(values, null, 2));
		actions.setSubmitting(false);
	}, []);

	return <AppPage title={'New collection page'}>
		<AppPageHeader
			title={'New collection'}
			subtitle={'Create your own set of cards'}
			image={<CollectionScene/>}
			onBack={handleBack}
		/>
		<div className={'collection-editor'}>
			<h1>Fill the form, please</h1>
			<Formik
				initialValues={initState}
				onReset={handleBack}
				onSubmit={handleSubmit}
				validateOnBlur={false}
				component={CollectionForm}/>
		</div>
	</AppPage>;
};
