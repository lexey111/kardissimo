import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Tooltip} from 'react-tooltip';
import {TCollection, TCollectionSide} from "../../../store/data/types.ts";
import {Fonts} from "../../../resources/fonts.ts";
import {ColorPicker} from "./color-picker.component.tsx";
import {CardPreview} from "../../../components/card-editor/card-preview-component.tsx";
import {FaGrip} from "react-icons/fa6";
import {Button} from "../../../components/utils/button.component.tsx";

function validateRequired(value?: string): string | null {
	if (!value || !value.trim()) {
		return 'Please fill the field';
	}
	if (value.length < 3 || value.length > 50) {
		return 'Must be 3..50 characters long';
	}

	return null;
}

export type TCollectionDetailsFormProps = {
	initialState: TCollection
	onSubmit: (data: any) => void
	onCancel: () => void
	goCards: (data: any) => void
	isNew: boolean
}

export const CollectionDetailsForm: React.FC<TCollectionDetailsFormProps> = ({
	                                                                             initialState,
	                                                                             onSubmit,
	                                                                             onCancel,
	                                                                             goCards,
	                                                                             isNew
                                                                             }) => {
	const [state, setState] = useState(initialState);
	const initialHash = useMemo(() => JSON.stringify(initialState), [initialState]);

	const [touched, setTouched] = useState(false);
	const [errors, setErrors] = useState<Record<string, string> | null>(null);
	const [side, setSide] = useState(0);

	const handleColorComplete = useCallback((idx: number, c: any) => {
		onChangeSideInput('color', idx, c.hex);
	}, []);

	const handleTextColorComplete = useCallback((idx: number, c: any) => {
		onChangeSideInput('fontColor', idx, c.hex);
	}, []);

	const hasErrors = errors && Object.keys(errors).length > 0;

	const rotateTimer = useRef<any>();
	useEffect(() => {
		return () => {
			clearTimeout(rotateTimer.current);
		}
	}, []);

	const handleFocus = useCallback((idx: number) => {
		if (idx === -1) {
			clearTimeout(rotateTimer.current);
			rotateTimer.current = setTimeout(() => {
				setSide(-1)
			}, 2000);
			return;
		}
		clearTimeout(rotateTimer.current);
		setSide(idx);
	}, []);

	const onChangeInput = useCallback((name: string, e: any) => {
		const value = e.target.value;
		setState(state => ({...state, [name]: value}));
	}, []);

	const onChangeSideInput = useCallback((name: string, index: number, e: any) => {
		const value = e.target ? e.target.value : e;

		setState(state => {
			const updatedSides = state.sides?.map((side, idx) => {
				if (idx !== index) {
					return side;
				}
				return {...side, [name]: value}
			});

			return {...state, sides: updatedSides};
		});
	}, []);

	useEffect(() => {
		setState(() => initialState);
	}, [initialState]);

	useEffect(() => {
		const isTouched = JSON.stringify(state) !== initialHash;
		setTouched(isTouched);

		const errors: Record<string, string> = {};
		const badTitle = validateRequired(state.title);

		if (badTitle) {
			errors.title = badTitle;
		}

		state?.sides?.forEach((side, idx) => {
			const badName = validateRequired(side.name);
			if (badName) {
				errors['name' + idx] = badName;
			}
		});

		if (Object.keys(errors).length > 0) {
			setErrors(errors);
		} else {
			setErrors(null);
		}
	}, [state]);


	const titleError = touched && errors?.title;
	const titleClass = touched
		? errors?.title ? ' invalid' : ' valid'
		: '';

	return <div className={'card-side-editor'}>
		<div className={'form-editor'}>
			<form onSubmit={e => e.preventDefault()}>
				<fieldset className={'required' + titleClass}>
					<label htmlFor="title">Title</label>
					<div className={'field-set'}>
						<input id="title" name="title" type={'text'}
						       autoFocus={true}
						       autoComplete="off"
						       onFocus={() => handleFocus(-1)}
						       maxLength={64} size={30}
						       value={state.title}
						       onChange={(e) => onChangeInput('title', e)}
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
						<input id="author" name="author"
						       autoComplete="off"
						       onFocus={() => handleFocus(-1)}
						       value={state.author}
						       onChange={(e) => onChangeInput('author', e)}
						       maxLength={50} size={30}
						       placeholder="John Doe" type={'text'}/>
					</div>
				</fieldset>

				{state.sides?.map((_side: TCollectionSide, idx: number) => {
					const name = 'sides[' + idx + '].name';
					const fontName = 'sides[' + idx + '].fontName';
					const fontSize = 'sides[' + idx + '].fontSize';

					const sideClass = touched && errors?.['name' + idx] ? ' invalid' : ' valid';

					const sideError = touched && errors?.['name' + idx];

					return <div key={name} data-side-idx={idx} className={'side-controls'}>
						<h3>Side {idx + 1}</h3>

						<fieldset className={'required' + sideClass}>
							<label htmlFor={name}>Name</label>
							<div className={'field-set'}>
								<input id={name} name={name}
								       onFocus={() => handleFocus(idx)}
								       value={_side.name}
								       onChange={(e) => onChangeSideInput('name', idx, e)}
								       autoComplete="off"
								       maxLength={64} size={30}
								       placeholder="English" type={'text'}/>

								{sideError && <div>
									<a data-tooltip-id={"title-tooltip-" + idx} className={'tooltip-error'}>⚠</a>
									<Tooltip id={"title-tooltip-" + idx} place={'right'}
									         style={{backgroundColor: "#ff005b", color: "#fff"}}>
										{errors?.['name' + idx]}
									</Tooltip>
								</div>}
							</div>
						</fieldset>

						<div className={'field-row-set'}>
							<fieldset>
								<label htmlFor={fontName}>Font</label>
								<div className={'field-set'}>
									<select id={fontName}
									        name={fontName}
									        value={_side.fontName}
									        onChange={(e) => onChangeSideInput('fontName', idx, e)}
									        onFocus={() => handleFocus(idx)}
									        placeholder="Font">
										{Object.keys(Fonts).map(key => {
											return <option value={key} key={key}>{key}</option>;
										})}
									</select>
									<div className={'font-size'}>
										<select id={fontSize}
										        name={fontSize}
										        value={_side.fontSize}
										        onChange={(e) => onChangeSideInput('fontSize', idx, e)}
										        onFocus={() => handleFocus(idx)}
										        placeholder="Font size">
											<option value={'XXS'} key={'XXS'}>XXS</option>
											<option value={'XS'} key={'XS'}>XS</option>
											<option value={'S'} key={'S'}>S</option>
											<option value={'M'} key={'M'}>M</option>
											<option value={'L'} key={'L'}>L</option>
											<option value={'XL'} key={'XL'}>XL</option>
											<option value={'XXL'} key={'XXL'}>XXL</option>
										</select>
									</div>
								</div>
							</fieldset>
						</div>

						<fieldset>
							<span className={'pseudo-label'}>Background</span>
							<div className={'field-set'}>
								<ColorPicker
									onFocus={() => handleFocus(idx)}
									color={_side.color} onComplete={(col) => handleColorComplete(idx, col)}/>
								<span className={'pseudo-label secondary-label'}>Text</span>
								<ColorPicker
									onFocus={() => handleFocus(idx)}
									color={_side.fontColor} onComplete={(col) => handleTextColorComplete(idx, col)}/>
							</div>
						</fieldset>

					</div>
				})}

				<fieldset className={'actions'}>
					{!isNew && <Button type={'secondary'}
					                   icon={<FaGrip/>}
					                   onClick={() => goCards(state)}>Cards...</Button>}

					<Button onClick={onCancel} type={'secondary'}>
						&larr; Cancel
					</Button>

					<Button onClick={() => onSubmit(state)}
					        disabled={hasErrors || (!isNew && !touched)}>
						{isNew ? 'Create' : 'Save'}
					</Button>
				</fieldset>
			</form>
		</div>

		<div className={'card-form-preview'}>
			<CardPreview
				card={{
					id: 'none', sides: [
						{
							header: 'Header',
							word: 'Hello world!',
							footer: 'Footer'
						},
						{
							header: 'Encabezado',
							word: '¡Hola Mundo!',
							footer: 'Pie de página'
						},
					],
					collectionSides: state.sides
				}}
				side={side}
			/>
		</div>
	</div>
};
