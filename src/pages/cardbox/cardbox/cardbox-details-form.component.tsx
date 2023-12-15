import React, {useCallback, useEffect, useRef, useState} from "react";
import {Tooltip} from 'react-tooltip';
import {TSCardbox, TSCardboxKey} from "../../../store/cardboxes/types-cardbox.ts";
import {CardPreview} from "../../../components/3d/card-preview-component.tsx";
import {FaGrip} from "react-icons/fa6";
import {Button} from "../../../components/utils/button.component.tsx";
import {IoCheckmarkCircle} from "react-icons/io5";
import Select from 'react-select'
import {colorSchemaOptions, FontNameOptions, FontSizeOptions} from "../../../resources/options.ts";
import {MinScreenWidthContainer} from "../../../components/utils/min-screen-width-container.tsx";
import {getSideColorsBySchema} from "../../../store/cardboxes/cardboxes-utils.ts";
import {Switch} from "../../../components/utils/switch.component.tsx";
import {TFacesData} from "../../../store/cards/types-card-face.ts";

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
	initialState: TSCardbox
	onSubmit: (data: any) => void
	onCancel: () => void
	goCards: (data: any) => void
	isNew: boolean
}

const sidePlaceholders = ['English', 'Español'];

export const CardboxDetailsForm: React.FC<TCardboxDetailsFormProps> = (
	{
		initialState,
		onSubmit,
		onCancel,
		goCards,
		isNew
	}) => {
	const [state, setState] = useState<TSCardbox>(initialState);

	const [errors, setErrors] = useState<Record<string, string> | null>(null);
	const [side, setSide] = useState(0);

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
		const value = e?.target?.value || e?.value || (e.target ? '' : e);
		setState(state => ({...state, [name]: value}));
	}, []);

	useEffect(() => {
		setState(() => initialState);
	}, [initialState]);

	useEffect(() => {
		const errors: Record<string, string> = {};
		const badTitle = validateRequired(state.title);

		if (badTitle) {
			errors.title = badTitle;
		}

		[1, 2].forEach(side => {
			// @ts-ignore
			const badName = validateRequired(state[`side${side}title`]);
			if (badName) {
				errors[`side${side}title`] = badName;
			}
		});

		if (Object.keys(errors).length > 0) {
			setErrors(() => errors);
		} else {
			setErrors(() => null);
		}
	}, [initialState, state]);


	const titleError = errors?.title;
	const titleClass = errors?.title ? ' invalid' : ' valid';

	const facesData: TFacesData = {
		sides: [
			{
				header: 'header',
				text: 'Hello!',
				footer: 'footer',
			},
			{
				header: 'encabezado de la tarjeta',
				text: '¡Hola!',
				footer: 'pie de tarjeta',
			},
		],
		cardboxSides: [
			{
				name: state.side1title,
				fontName: state.side1fontName,
				fontSize: state.side1fontSize,
				colorSchemaName: state.side1schema,
				...getSideColorsBySchema(state.side1schema)
			},
			{
				name: state.side2title,
				fontName: state.side2fontName,
				fontSize: state.side2fontSize,
				colorSchemaName: state.side2schema,
				...getSideColorsBySchema(state.side2schema)
			},
		]
	};

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
						<a data-tooltip-id="title-tooltip" className={'tooltip-error'}></a>
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

			<fieldset>
				<label htmlFor={'description'}>Description</label>
				<div className={'field-set'}>
								<textarea
									id={'description'} name={'description'}
									autoComplete="off"
									value={state.description}
									onFocus={() => handleFocus(-1)}
									onChange={(e) => onChangeInput('description', e)}
									maxLength={256}
									placeholder="Description"/>
				</div>
			</fieldset>

			{[1, 2].map(sideNumber => {
				const name = `side${sideNumber}title` as TSCardboxKey;
				const fontName = `side${sideNumber}fontName` as TSCardboxKey;
				const fontSizeName = `side${sideNumber}fontSize` as TSCardboxKey;
				const schemaName = `side${sideNumber}schema` as TSCardboxKey;

				const sideClass = errors?.[name] ? ' invalid' : ' valid';
				const sideError = errors?.[name];

				return <div key={name} data-side-idx={sideNumber - 1} className={'side-controls'}>
					<h3>Side {sideNumber}</h3>

					<fieldset className={'required' + sideClass}>
						<label htmlFor={name}>
							Name
						</label>
						<div className={'field-set'}>
							<input
								id={name} name={name}
								onFocus={() => handleFocus(sideNumber - 1)}
								value={state[name] as string}
								onChange={(e) => onChangeInput(name, e)}
								autoComplete="off"
								maxLength={64} size={30}
								placeholder={sidePlaceholders[sideNumber - 1]}
								type={'text'}/>

							{sideError && <div>
								<a data-tooltip-id={"title-tooltip-" + sideNumber} className={'tooltip-error'}></a>
								<Tooltip
									id={"title-tooltip-" + sideNumber} place={'right'}
									variant={'error'}>
									{errors?.[name]}
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
									onFocus={() => handleFocus(sideNumber - 1)}
									isSearchable={false}
									placeholder={'Font'}
									onChange={(e) => onChangeInput(fontName, e)}
									value={FontNameOptions.filter((option: any) => option.value === state[fontName])}
								/>

								<div className={'font-size'}>
									<Select
										options={FontSizeOptions}
										menuPlacement="auto"
										className="react-select-container"
										classNamePrefix="react-select"
										onFocus={() => handleFocus(sideNumber - 1)}
										isSearchable={false}
										placeholder={'Size'}
										onChange={(e) => onChangeInput(fontSizeName, e)}
										value={FontSizeOptions.filter((option: any) => option.value === state[fontSizeName])}
									/>
								</div>
							</div>
						</fieldset>
					</div>

					<fieldset>
						<label htmlFor={schemaName} style={{
							color: getSideColorsBySchema(state[schemaName] as string).textColor
						}}>
							Colors
							<span style={{
								background: getSideColorsBySchema(state[schemaName] as string).color,
							}} className={'color-preview'}></span>
						</label>
						<div className={'field-set'}>
							<Select
								name={schemaName}
								inputId={'colorSchema' + sideNumber}
								options={colorSchemaOptions}
								className="react-select-container"
								menuPlacement="top"
								classNamePrefix="react-select"
								onFocus={() => handleFocus(sideNumber - 1)}
								isSearchable={true}
								placeholder={'Color scheme'}
								onChange={(e) => onChangeInput(schemaName, e)}
								value={colorSchemaOptions.filter((option: any) => option.value === state[schemaName])}
							/>
						</div>
					</fieldset>
				</div>
			})}

			<fieldset className={'checkbox-field'}>
				<span className={'pseudo-label'}></span>

				<div className={'field-set'}>
					<Switch value={state.public} onChange={(e) => onChangeInput('public', e)} text={'Make public'}/>
					<a data-tooltip-id={"tooltip-public"} className={'tooltip-info'}></a>
					<Tooltip
						id={"tooltip-public"} place={'right'}
						variant={'info'}>
						<h4>Publicity</h4>
						<p>
							You can have three level of publicity:
						</p>
						<ul>
							<li>Private, only you can use and change</li>
							<li>Public, you set a list of users who can use</li>
							<li>Public, anyone can use</li>
						</ul>
					</Tooltip>
				</div>
			</fieldset>

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
					disabled={!!hasErrors}>
					{isNew ? 'Create' : 'Save'}
					{hasErrors && <span className={'tooltip-error-ex'}></span>}
				</Button>
			</fieldset>
		</div>

		<MinScreenWidthContainer>
			<div className={'card-form-preview'}>
				<CardPreview
					card={facesData}
					side={side}
				/>
			</div>
		</MinScreenWidthContainer>
	</div>
};
