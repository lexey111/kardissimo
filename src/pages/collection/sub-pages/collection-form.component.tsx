import React, {useCallback} from "react";
import {Field, Form,} from 'formik';
import {Tooltip} from 'react-tooltip';
import {useSearchParams} from "react-router-dom";
import {Fonts} from "../../../resources/fonts.ts";
import {TCollectionSide} from "../../../store/data/types.ts";
import {ColorPicker} from "./color-picker.component.tsx";

function validateRequired(value: string) {
	if (!value || !value.trim()) {
		return 'Please fill the field';
	}
	if (value.length < 3 || value.length > 50) {
		return 'Must be 3..50 characters long';
	}

	return;
}

export const CollectionForm: React.FC = ({
	                                         handleSubmit,
	                                         handleReset,
	                                         setFieldValue,
	                                         values,
	                                         errors,
	                                         touched,
                                         }: any) => {

	const [searchParams] = useSearchParams();
	const isNew = searchParams.get('new') !== null;

	const titleError = touched.title && errors.title;
	const titleClass = touched.title
		? errors.title ? ' invalid' : ' valid'
		: '';

	const handleColorComplete = useCallback((idx: number, c: any) => {
		setFieldValue(`sides[${idx}].color`, c.hex);
	}, []);

	const handleTextColorComplete = useCallback((idx: number, c: any) => {
		setFieldValue(`sides[${idx}].fontColor`, c.hex);
	}, []);

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

		{values.sides?.map((_side: TCollectionSide, idx: number) => {
			const name = 'sides[' + idx + '].name';
			const fontName = 'sides[' + idx + '].fontName';
			const fontSize = 'sides[' + idx + '].fontSize';
			const color = 'sides[' + idx + '].color';
			const fontColor = 'sides[' + idx + '].fontColor';

			const sideClass = touched.sides?.[idx]
				? errors.sides?.[idx] ? ' invalid' : ' valid' : '';

			const sideError = touched.sides?.[idx] && errors.sides?.[idx].name;

			return <div key={name}>
				<h3>Side {idx + 1}</h3>

				<fieldset className={'required' + sideClass}>
					<label htmlFor={'sides[' + idx + ']'}>Name</label>
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
								{errors.sides?.[idx].name}
							</Tooltip>
						</div>}
					</div>
				</fieldset>

				<div className={'field-row-set'}>
					<fieldset>
						<label htmlFor={fontName}>Font</label>
						<div className={'field-set'}>
							<Field id={fontName}
							       name={fontName}
							       placeholder="Font"
							       as={'select'}>
								{Object.keys(Fonts).map(key => {
									return <option value={key} key={key}>{key}</option>;
								})}
							</Field>
							<div className={'font-size'}>
								<Field id={fontSize}
								       name={fontSize}
								       placeholder="Font size"
								       as={'select'}>
									<option value={'XS'} key={'XS'}>XS</option>
									<option value={'S'} key={'S'}>S</option>
									<option value={'M'} key={'M'}>M</option>
									<option value={'L'} key={'L'}>L</option>
									<option value={'XL'} key={'XL'}>XL</option>
								</Field>
							</div>
						</div>
					</fieldset>
				</div>

				<fieldset>
					<label htmlFor={color}>Background</label>
					<div className={'field-set'}>
						<ColorPicker color={_side.color} onComplete={(col) => handleColorComplete(idx, col)}/>
					<label htmlFor={fontColor} className={'secondary-label'}>Text</label>
						<ColorPicker color={_side.fontColor} onComplete={(col) => handleTextColorComplete(idx, col)}/>
					</div>
				</fieldset>

			</div>
		})}

		<fieldset className={'actions'}>
			<button type="button" className={'pure-button'}
			        onClick={handleReset}>{isNew ? 'Cancel' : 'Reset'}
			</button>
			&nbsp;
			<button type="button"
			        onClick={handleSubmit}
			        disabled={hasErrors || (!isNew && Object.keys(touched).length === 0)}
			        className={'pure-button pure-button-primary'}>{isNew ? 'Create' : 'Save'}
			</button>
		</fieldset>
	</Form>
};
