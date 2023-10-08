import React, {useCallback, useState} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {CollectionScene} from "../components/scene/collection-scene.component.tsx";
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik, FormikHelpers,} from 'formik';
import {TCollection} from "../store/data/collections-store.ts";
import {AppSecondaryPageHeader} from "../components/app-secondary-page-header.component.tsx";

const InitialValues: TCollection = {
	title: '',
	author: '',
	isLocal: true
}

// TODO: replace sides with array
function getInitialValues(): TCollection & { side1: string, side2: string } {
	return {
		...InitialValues,
		stat: {
			changed_at: new Date(),
			created_at: new Date()
		},
		side1: 'Side 1',
		side2: 'Side 2'
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

		<fieldset>
			<label htmlFor="side1">Side I Name*</label>
			<Field id="side1" name="side1"
			       validate={validateTitle}
			       autoComplete="off"
			       maxLength={50} size={40}
			       className={errors.side1 && touched.side1 ? 'error' : ''}
			       placeholder="English" type={'text'}/>
		</fieldset>
		{touched.side1 && <ErrorMessage name="side1" component="div" className={'error'}/>}

		<fieldset>
			<label htmlFor="side2">Side II Name*</label>
			<Field id="side2" name="side2"
			       validate={validateTitle}
			       autoComplete="off"
			       maxLength={50} size={40}
			       className={errors.side2 && touched.side2 ? 'error' : ''}
			       placeholder="Español" type={'text'}/>
		</fieldset>
		{touched.side2 && <ErrorMessage name="side2" component="div" className={'error'}/>}

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
		<AppSecondaryPageHeader
			title={'New collection'}
			subtitle={'Create your own set of cards'}
			image={<CollectionScene/>}
			onBack={handleBack}
		/>
		<div className={'collection-editor'}>
			<Formik
				initialValues={initState}
				onReset={handleBack}
				onSubmit={handleSubmit}
				validateOnBlur={true}
				component={CollectionForm}/>
		</div>
	</AppPage>;
};
