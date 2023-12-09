import React, {useCallback, useEffect, useRef, useState} from "react";
import {TSCardbox, TSCardboxKey} from "../../../../store/cardboxes/types-cardbox.ts";
import {CardPreview} from "../../../../components/3d/card-preview-component.tsx";
import {NavLink} from "react-router-dom";
import {Button} from "../../../../components/utils/button.component.tsx";
import {IoCheckmarkCircle} from "react-icons/io5";
import {Switch} from "../../../../components/utils/switch.component.tsx";
import {HDivider} from "../../../../components/utils/h-divider.component.tsx";
import Select from "react-select";
import {colorSchemaOptions, FontNameOptions, FontSizeOptions} from "../../../../resources/options.ts";
import {MinScreenWidthContainer} from "../../../../components/utils/min-screen-width-container.tsx";
import {TSCard, TSCardKey} from "../../../../store/cards/types-card.ts";
import {getSideColorsBySchema} from "../../../../store/cardboxes/cardboxes-utils.ts";
import {TFacesData} from "../../../../store/cards/types-card-face.ts";

export type TCardEditorFormProps = {
	cardbox: TSCardbox
	initialState: TSCard
	onSubmit: (data: TSCard) => void
	onCancel: () => void
	isNew: boolean
}

export const CardEditorForm: React.FC<TCardEditorFormProps> = (
	{
		cardbox,
		initialState,
		onSubmit,
		onCancel,
		isNew
	}) => {
	const [state, setState] = useState(initialState);
	const [side, setSide] = useState(0);

	const destroying = useRef(false);

	const handleFocus = useCallback((idx: number) => {
		setSide(idx);
	}, []);

	const onChangeInput = useCallback((name: string, e: any) => {
		const value = e?.target?.value || e?.value || e;
		setState(state => ({...state, [name]: value}));
	}, []);

	useEffect(() => {
		return () => {
			destroying.current = true;
		}
	}, []);

	useEffect(() => {
		setState(() => initialState);
	}, [initialState]);

	useEffect(() => {
		setTimeout(() => {
			if (!destroying.current) {
				const el = document.getElementById('sides[0].text') as HTMLTextAreaElement;
				if (el) {
					el.focus();
					el.selectionStart = 0;
					el.selectionEnd = el.value.length;
				}
			}
		}, 200);
	}, []);

	const saveDisabled = (!state.side1header && !state.side1text && !state.side1footer) || (!state.side2header && !state.side2text && !state.side2footer);
	const facesData: TFacesData = {
		sides: [
			{
				header: state.side1header,
				text: state.side1text,
				footer: state.side1footer
			},
			{
				header: state.side2header,
				text: state.side2text,
				footer: state.side2footer
			},
		],
		cardboxSides: [
			{
				name: cardbox.side1title,
				fontName: state.hasOwnDesign ? state.side1fontName : cardbox.side1fontName,
				fontSize: state.hasOwnDesign ? state.side1fontSize : cardbox.side1fontSize,
				colorSchemaName: state.hasOwnDesign ? state.side1schema : cardbox.side1schema,
				...getSideColorsBySchema(state.hasOwnDesign ? state.side1schema : cardbox.side1schema)
			},
			{
				name: cardbox.side2title,
				fontName: state.hasOwnDesign ? state.side2fontName : cardbox.side2fontName,
				fontSize: state.hasOwnDesign ? state.side2fontSize : cardbox.side2fontSize,
				colorSchemaName: state.hasOwnDesign ? state.side2schema : cardbox.side2schema,
				...getSideColorsBySchema(state.hasOwnDesign ? state.side2schema : cardbox.side2schema)
			},
		]
	};

	return <div className={'card-side-editor'}>
		<div className={'form-editor'}>
			{cardbox &&
				<h2>{isNew ? 'New card' : 'Card'} of &nbsp;
					<NavLink
						to={`/cardboxes/${cardbox.id}/details`}>{cardbox.title}
					</NavLink>
				</h2>}

			{[1, 2].map((_, idx: number) => {
				const fontName = 'sides[' + idx + '].fontName';

				return <div key={idx.toString()}>
					<h3 className={idx === 0 ? 'title' : ''}>Side {idx + 1}: &nbsp;
						<b>{cardbox[`side${idx + 1}title` as TSCardboxKey] as string}</b>
					</h3>

					<fieldset>
						{state.hasOwnDesign && <label htmlFor={`side${idx + 1}header`}>Header</label>}
						<div className={'field-set'}>
							<input
								id={`sides[${idx}].header`} name={`side${idx + 1}header`}
								autoComplete="off"
								maxLength={128} size={30}
								onFocus={() => handleFocus(idx)}
								value={state[`side${idx + 1}header` as TSCardKey] as string}
								onChange={(e) => onChangeInput(`side${idx + 1}header`, e)}
								placeholder="Top text"
								type={'text'}/>
						</div>
					</fieldset>

					<fieldset>
						{state.hasOwnDesign && <label htmlFor={`side${idx + 1}text`}>Text</label>}
						<div className={'field-set'}>
								<textarea
									className={state.hasOwnDesign ? '' : 'big-textarea'}
									id={`sides[${idx}].text`} name={`side${idx + 1}text`}
									autoComplete="off"
									value={state[`side${idx + 1}text` as TSCardKey] as string}
									onFocus={() => handleFocus(idx)}
									onChange={(e) => onChangeInput(`side${idx + 1}text`, e)}
									maxLength={256}
									placeholder="Main text"/>
						</div>
					</fieldset>

					<fieldset>
						{state.hasOwnDesign && <label htmlFor={`side${idx + 1}footer`}>Footer</label>}
						<div className={'field-set'}>
							<input
								id={`sides[${idx}].footer`} name={`side${idx + 1}footer`}
								autoComplete="off"
								value={state[`side${idx + 1}footer` as TSCardKey] as string}
								onFocus={() => handleFocus(idx)}
								onChange={(e) => onChangeInput(`side${idx + 1}footer`, e)}
								maxLength={128} size={30}
								placeholder="Bottom text"
								type={'text'}/>
						</div>
					</fieldset>

					{state.hasOwnDesign && <div className={'appearance-controls'}>
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
										onChange={(e) => onChangeInput(`side${idx + 1}fontName`, e)}
										value={FontNameOptions.filter((option: any) => option.value === state[`side${idx + 1}fontName` as TSCardKey])}
									/>

									<div className={'font-size'}>
										<Select
											options={FontSizeOptions}
											className="react-select-container"
											classNamePrefix="react-select"
											menuPlacement="auto"
											onFocus={() => handleFocus(idx)}
											isSearchable={false}
											placeholder={'Size'}
											onChange={(e) => onChangeInput(`side${idx + 1}fontSize`, e)}
											value={FontSizeOptions.filter((option: any) => option.value === state[`side${idx + 1}fontSize` as TSCardKey])}
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
									menuPlacement="top"
									inputId={'colorSchema' + idx}
									options={colorSchemaOptions}
									className="react-select-container"
									classNamePrefix="react-select"
									onFocus={() => handleFocus(idx)}
									isSearchable={true}
									placeholder={'Color scheme'}
									onChange={(e) => onChangeInput(`side${idx + 1}schema`, e)}
									value={colorSchemaOptions.filter((option: any) => option.value === state[`side${idx + 1}schema` as TSCardKey])}
								/>
							</div>
						</fieldset>
					</div>}

				</div>;
			})}
			<fieldset className={'actions'}>
				<Switch
					value={state.hasOwnDesign}
					boldOnFocus={false}
					onChange={(e) => onChangeInput('hasOwnDesign', e)}
					text={'Own design'}/>

				<HDivider width={'32px'}/>

				<Button onClick={onCancel} type={'secondary'}>&larr; Cancel (Esc)</Button>

				<Button
					onClick={() => onSubmit(state)}
					icon={<IoCheckmarkCircle/>}
					disabled={saveDisabled}>
					{isNew ? 'Create' : 'Save'}
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
	</div>;
};
