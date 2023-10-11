import React, {useCallback, useState} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {CollectionScene} from "../components/scene/collection-scene.component.tsx";
import {useNavigate} from 'react-router-dom';
import {Field, Form, Formik, FormikHelpers,} from 'formik';
import {TCollection} from "../store/data/collections-store.ts";
import {AppSecondaryPageHeader} from "../components/app-secondary-page-header.component.tsx";
import {Tooltip} from 'react-tooltip';


const InitialValues: TCollection = {
	title: '',
	author: '',
	isLocal: true
}

// TODO: replace sides with array
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

function validateRequired(value: string) {
	let error;
	if (!value || !value.trim()) {
		return 'Please fill the field';
	}
	if (value.length < 3 || value.length > 50) {
		return 'Must be 3..50 characters long';
	}
	return error;
}

const CollectionForm = ({
	                        handleSubmit,
	                        handleReset,
	                        // handleChange,
	                        // handleBlur,
	                        values,
	                        errors,
	                        touched,
	                        // setErrors,
                        }: any) => {

	const titleError = touched.title && errors.title;
	const titleClass = touched.title
		? errors.title ? ' invalid' : ' valid'
		: '';

	const hasErrors = Object.keys(errors).length > 0;

	return <Form>
		<fieldset className={'required' + titleClass}>
			<label htmlFor="title">Title</label>
			<div className={'field-set'}>
				<Field id="title" name="title" type={'text'}
				       validate={validateRequired}
				       autoFocus={'on'}
				       autoComplete="off"
				       maxLength={50} size={40}
				       placeholder="My first collection" required/>
				{titleError && <div>
					<a data-tooltip-id="title-tooltip" className={'tooltip-error'}>⚠</a>
					<Tooltip id="title-tooltip" place={'right'}
					         style={{backgroundColor: "#ff005b", color: "#fff"}}>
						{errors.title}
					</Tooltip>
				</div>}
			</div>
		</fieldset>

		<fieldset>
			<label htmlFor="author">Author</label>
			<div className={'field-set'}>
				<Field id="author" name="author"
				       autoComplete="off"
				       maxLength={50} size={40}
				       placeholder="John Doe" type={'text'}/>
			</div>
		</fieldset>

		<h3>Side Names</h3>
		{values.sides.map((_: string, idx: number) => {
			const name = 'sides[' + idx + ']';
			const sideClass = touched.sides?.[idx]
				? errors.sides?.[idx] ? ' invalid' : ' valid' : '';

			const sideError = touched.sides?.[idx] && errors.sides?.[idx];

			return <fieldset className={'required' + sideClass} key={name}>
				<label htmlFor={'sides[' + idx + ']'}>Side {idx + 1}</label>
				<div className={'field-set'}>
					<Field id={name} name={name}
					       validate={validateRequired}
					       autoComplete="off"
					       maxLength={30} size={40}
					       placeholder="English" type={'text'}/>

					{sideError && <div>
						<a data-tooltip-id={"title-tooltip-" + idx} className={'tooltip-error'}>⚠</a>
						<Tooltip id={"title-tooltip-" + idx} place={'right'}
						         style={{backgroundColor: "#ff005b", color: "#fff"}}>
							{errors.sides?.[idx]}
						</Tooltip>
					</div>}
				</div>
			</fieldset>
		})}

		<fieldset className={'actions'}>
			<button type="button" className={'pure-button'}
			        onClick={handleReset}>&larr; Cancel
			</button>
			&nbsp;
			<button type="button"
			        onClick={handleSubmit}
			        disabled={hasErrors}
			        className={'pure-button pure-button-primary'}>Continue &rarr;
			</button>
		</fieldset>
	</Form>
};

export const NewCollectionPage: React.FC = () => {
	const navigate = useNavigate();

	const [initState] = useState<TCollection>(getInitialValues());

	const handleBack = useCallback(() => {
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
				validateOnMount={true}
				validateOnChange={true}
				validateOnBlur={true}
				component={CollectionForm}/>
		</div>
	</AppPage>;
};
