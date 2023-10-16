import React from "react";
import {Field, Form,} from 'formik';
import {Tooltip} from 'react-tooltip';
import {NavLink} from "react-router-dom";
import {AppPageError} from "../../components/app-page-error.component.tsx";
import {Fonts} from "../../resources/fonts.ts";

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

export const CollectionForm: React.FC = ({
	                                         handleSubmit,
	                                         handleReset,
	                                         values,
	                                         errors,
	                                         touched,
                                         }: any) => {

	if (!values || !values.sides) {
		return <AppPageError title={'Error: Not found'}
		                     subtitle={'Sorry for that.'}
		                     back={<NavLink to={'/collections'}>Back to collections</NavLink>}/>;
	}

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

		<h3>Sides</h3>
		{values.sides?.map((_: string, idx: number) => {
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
		<h3>Appearance</h3>
		<fieldset>
			<label htmlFor={'appearance.fontName'}>Font</label>
			<div className={'field-set'}>
				<Field id={'appearance.fontName'}
				       name={'appearance.fontName'}
				       placeholder="Font"
				       as={'select'}>
					{Object.keys(Fonts).map(key => {
						return <option value={key} key={key}>{key}</option>;
					})}
				</Field>
			</div>
		</fieldset>

		<fieldset className={'actions'}>
			<button type="button" className={'pure-button'}
			        onClick={handleReset}>&larr; Cancel
			</button>
			&nbsp;
			<button type="button"
			        onClick={handleSubmit}
			        disabled={hasErrors}
			        className={'pure-button pure-button-primary'}>Save
			</button>
		</fieldset>
	</Form>
};
