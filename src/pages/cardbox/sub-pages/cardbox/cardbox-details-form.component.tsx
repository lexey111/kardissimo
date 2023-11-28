import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Tooltip} from 'react-tooltip';
import {TCardbox, TCardboxSide} from "../../../../store/data/types.ts";
import {CardPreview} from "../../../../components/3d/card-preview-component.tsx";
import {FaGrip} from "react-icons/fa6";
import {Button} from "../../../../components/utils/button.component.tsx";
import {IoCheckmarkCircle} from "react-icons/io5";
import {defaultCardbox} from "../../../../store/data/cardboxes-store.selectors.ts";
import Select from 'react-select'
import {ColorSchemes} from "../../../../resources/colors.ts";
import {Switch} from "../../../../components/utils/switch.component.tsx";
import {colorSchemaOptions, FontNameOptions, FontSizeOptions} from "../../../../resources/options.ts";

function validateRequired(value?: string): string | null {
	if (!value || !value.trim()) {
		return 'Please fill the field';
	}
	if (value.length < 3 || value.length > 50) {
		return 'Must be 3..50 characters long';
	}

	return null;
}

export type TCardboxDetailsFormProps = {
	initialState: TCardbox
	onSubmit: (data: any) => void
	onCancel: () => void
	goCards: (data: any) => void
	isNew: boolean
}


export const CardboxDetailsForm: React.FC<TCardboxDetailsFormProps> = (
	{
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

	const onChangeColorSchema = useCallback((index: number, e: any) => {
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
					colorSchemaName: schemeName,
					color: scheme.color,
					textColor: scheme.textColor
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
	}, [initialHash, state]);


	const titleError = touched && errors?.title;
	const titleClass = touched
		? errors?.title ? ' invalid' : ' valid'
		: '';

	let facesData = {...defaultCardbox, cardboxSides: state.sides}

	if (useFirst && state.cards && state.cards.length > 0) {
		facesData = {
			id: 'none', sides: [
				{
					header: state.cards?.[0].sides?.[0]?.header || '',
					text: state.cards?.[0].sides?.[0]?.text || '',
					footer: state.cards?.[0].sides?.[0]?.footer || '',
				},
				{
					header: state.cards?.[0].sides?.[1]?.header || '',
					text: state.cards?.[0].sides?.[1]?.text || '',
					footer: state.cards?.[0].sides?.[1]?.footer || '',
				},
			],
			cardboxSides: state.sides
		};
	}

	return <div className={'card-side-editor'}>
		<div className={'form-editor'}>
			<fieldset className={'required' + titleClass}>
				<label htmlFor="title">Title</label>
				<div className={'field-set'}>
					<input
						id="title" name="title" type={'text'}
						autoFocus={true}
						autoComplete="off"
						onFocus={() => handleFocus(-1)}
						maxLength={64} size={30}
						value={state.title}
						onChange={(e) => onChangeInput('title', e)}
						placeholder="My first cardbox" required/>
					{titleError && <div>
						<a data-tooltip-id="title-tooltip" className={'tooltip-error'}>⚠</a>
						<Tooltip
							id="title-tooltip" place={'right'}
							variant={'error'}>
							{errors.title}
						</Tooltip>
					</div>}
				</div>
			</fieldset>

			<fieldset>
				<label htmlFor="author">Author</label>
				<div className={'field-set'}>
					<input
						id="author" name="author"
						autoComplete="off"
						onFocus={() => handleFocus(-1)}
						value={state.author}
						onChange={(e) => onChangeInput('author', e)}
						maxLength={50} size={30}
						placeholder="John Doe" type={'text'}/>
				</div>
			</fieldset>

			{state.sides?.map((_side: TCardboxSide, idx: number) => {
				const name = 'sides[' + idx + '].name';
				const fontName = 'sides[' + idx + '].fontName';

				const sideClass = touched && errors?.['name' + idx] ? ' invalid' : ' valid';

				const sideError = touched && errors?.['name' + idx];

				return <div key={name} data-side-idx={idx} className={'side-controls'}>
					<h3>Side {idx + 1}</h3>

					<fieldset className={'required' + sideClass}>
						<label htmlFor={name}>Name</label>
						<div className={'field-set'}>
							<input
								id={name} name={name}
								onFocus={() => handleFocus(idx)}
								value={_side.name}
								onChange={(e) => onChangeSideInput('name', idx, e)}
								autoComplete="off"
								maxLength={64} size={30}
								placeholder="English" type={'text'}/>

							{sideError && <div>
								<a data-tooltip-id={"title-tooltip-" + idx} className={'tooltip-error'}>⚠</a>
								<Tooltip
									id={"title-tooltip-" + idx} place={'right'}
									variant={'error'}>
									{errors?.['name' + idx]}
								</Tooltip>
							</div>}
						</div>
					</fieldset>

					<div className={'field-row-set'}>
						<fieldset>
							<label htmlFor={fontName}>Font</label>
							<div className={'field-set'}>

								<Select
									inputId={fontName}
									name={fontName}
									menuPlacement="auto"
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
									<Select
										options={FontSizeOptions}
										menuPlacement="auto"
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
						<label htmlFor={'colorSchema' + idx}>Colors</label>
						<div className={'field-set'}>
							<Select
								name={'colorSchema' + idx}
								inputId={'colorSchema' + idx}
								options={colorSchemaOptions}
								className="react-select-container"
								menuPlacement="top"
								classNamePrefix="react-select"
								onFocus={() => handleFocus(idx)}
								isSearchable={true}
								placeholder={'Color scheme'}
								onChange={(e) => onChangeColorSchema(idx, e)}
								value={colorSchemaOptions.filter((option: any) => option.value === _side.colorSchemaName)}
							/>
						</div>
					</fieldset>
				</div>
			})}

			{(state?.cards?.length || 0) > 0 && <fieldset className={'checkbox-field'}>
				<span className={'pseudo-label'}></span>

				<Switch value={useFirst} onChange={setUseFirst} text={'Use texts of card #1 to preview'}/>
			</fieldset>}

			<fieldset className={'actions'}>
				{!isNew && <Button
					type={'secondary'}
					icon={<FaGrip/>}
					onClick={() => goCards(state)}>Cards...</Button>}

				<Button onClick={onCancel} type={'secondary'}>
					&larr; Cancel
				</Button>

				<Button
					onClick={() => onSubmit(state)}
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
