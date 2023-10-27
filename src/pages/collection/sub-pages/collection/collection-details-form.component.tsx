import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Tooltip} from 'react-tooltip';
import {TCollection, TCollectionSide} from "../../../../store/data/types.ts";
import {Fonts} from "../../../../resources/fonts.ts";
import {CardPreview} from "../../../../components/3d/card-preview-component.tsx";
import {FaGrip} from "react-icons/fa6";
import {Button} from "../../../../components/utils/button.component.tsx";
import {IoCheckmarkCircle} from "react-icons/io5";
import {ColorSchemes} from "../../../../resources/colors.ts";
import {defaultCollection} from "../../../../store/data/collections-store.selectors.ts";
import Select from 'react-select'

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

const FontSizeOptions: any = [
	{value: 'XXS', label: 'XXS'},
	{value: 'XS', label: 'XS'},
	{value: 'S', label: 'S'},
	{value: 'M', label: 'M'},
	{value: 'L', label: 'L'},
	{value: 'XL', label: 'XL'},
	{value: 'XXL', label: 'XXL'},
];

const FontNameOptions = Object.keys(Fonts).map(key => {
	return {value: key, label: key};
});

const ColorSchemeOptions = Object.keys(ColorSchemes).map(key => {
	return {value: key, label: key};
})

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
	const [useFirst, setUseFirst] = useState(false);

	// const handleColorComplete = useCallback((idx: number, c: any) => {
	// 	onChangeSideInput('color', idx, c.hex);
	// }, []);
	//
	// const handleTextColorComplete = useCallback((idx: number, c: any) => {
	// 	onChangeSideInput('fontColor', idx, c.hex);
	// }, []);

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

	const onChangeColorScheme = useCallback((index: number, e: any) => {
		const schemeName = e.value;
		const scheme = ColorSchemes[schemeName];
		if (!scheme) {
			return;
		}

		setState(state => {
			const updatedSides = state.sides?.map((side, idx) => {
				if (idx !== index) {
					return side;
				}
				return {
					...side,
					colorSchemeName: schemeName,
					color: scheme.background,
					fontColor: scheme.text
				}
			});

			return {...state, sides: updatedSides};
		});
	}, []);

	const onChangeSideInput = useCallback((name: string, index: number, e: any) => {
		const value = e.target
			? e.target.value
			: e.value ? e.value : e;

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

	const handleUseFirst = useCallback((e: any) => {
		const value = e?.target ? e?.target?.checked : false;
		setUseFirst(value);
	}, [useFirst]);

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

	let facesData = {...defaultCollection, collectionSides: state.sides}

	if (useFirst && state.cards && state.cards.length > 0) {
		facesData = {
			id: 'none', sides: [
				{
					header: state.cards?.[0].sides?.[0]?.header || '',
					word: state.cards?.[0].sides?.[0]?.word || '',
					footer: state.cards?.[0].sides?.[0]?.footer || '',
				},
				{
					header: state.cards?.[0].sides?.[1]?.header || '',
					word: state.cards?.[0].sides?.[1]?.word || '',
					footer: state.cards?.[0].sides?.[1]?.footer || '',
				},
			],
			collectionSides: state.sides
		};
	}

	return <div className={'card-side-editor'}>
		<div className={'form-editor'}>
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

								<Select inputId={fontName}
								        name={fontName}
								        options={FontNameOptions}
								        className="react-select-container"
								        classNamePrefix="react-select"
								        onFocus={() => handleFocus(idx)}
								        isSearchable={false}
								        placeholder={'Font'}
								        onChange={(e) => onChangeSideInput('fontName', idx, e)}
								        value={FontNameOptions.filter((option: any) => option.value === _side.fontName)}
								/>

								<div className={'font-size'}>
									<Select options={FontSizeOptions}
									        className="react-select-container"
									        classNamePrefix="react-select"
									        onFocus={() => handleFocus(idx)}
									        isSearchable={false}
									        placeholder={'Size'}
									        onChange={(e) => onChangeSideInput('fontSize', idx, e)}
									        value={FontSizeOptions.filter((option: any) => option.value === _side.fontSize)}
									/>
								</div>
							</div>
						</fieldset>
					</div>

					<fieldset>
						<label htmlFor={'colorScheme' + idx}>Colors</label>
						<div className={'field-set'}>
							<Select name={'colorScheme' + idx}
							        inputId={'colorScheme' + idx}
							        options={ColorSchemeOptions}
							        className="react-select-container"
							        classNamePrefix="react-select"
							        onFocus={() => handleFocus(idx)}
							        isSearchable={true}
							        placeholder={'Color scheme'}
							        onChange={(e) => onChangeColorScheme(idx, e)}
							        value={ColorSchemeOptions.filter((option: any) => option.value === _side.colorSchemeName)}
							/>
						</div>
					</fieldset>

					{/*<fieldset>*/}
					{/*	<span className={'pseudo-label'}>Background</span>*/}
					{/*	<div className={'field-set'}>*/}
					{/*		<ColorPicker*/}
					{/*			onFocus={() => handleFocus(idx)}*/}
					{/*			color={_side.color} onComplete={(col) => handleColorComplete(idx, col)}/>*/}
					{/*		<span className={'pseudo-label secondary-label'}>Text</span>*/}
					{/*		<ColorPicker*/}
					{/*			onFocus={() => handleFocus(idx)}*/}
					{/*			color={_side.fontColor} onComplete={(col) => handleTextColorComplete(idx, col)}/>*/}
					{/*	</div>*/}
					{/*</fieldset>*/}

				</div>
			})}

			{(state?.cards?.length || 0) > 0 && <fieldset className={'checkbox-field'}>
				<span className={'pseudo-label'}></span>
				<label htmlFor={'useFirstCard'} className={'checkbox-label'}>
					<input type={'checkbox'}
					       onChange={handleUseFirst}
					       name={'useFirstCard'} id={'useFirstCard'}/>
					Use card #1 to preview
					<span className="checkmark"></span>
				</label>
			</fieldset>}

			<fieldset className={'actions'}>
				{!isNew && <Button type={'secondary'}
				                   icon={<FaGrip/>}
				                   onClick={() => goCards(state)}>Cards...</Button>}

				<Button onClick={onCancel} type={'secondary'}>
					&larr; Cancel
				</Button>

				<Button onClick={() => onSubmit(state)}
				        icon={<IoCheckmarkCircle/>}
				        disabled={hasErrors || (!isNew && !touched)}>
					{isNew ? 'Create' : 'Save'}
				</Button>
			</fieldset>
		</div>

		<div className={'card-form-preview'}>
			<CardPreview
				card={facesData}
				side={side}
			/>
		</div>
	</div>
};
