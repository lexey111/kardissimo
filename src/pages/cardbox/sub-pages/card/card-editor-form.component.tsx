import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {TCard, TCardEnriched, TCardSide, TCardbox} from "../../../../store/data/types.ts";
import {CardPreview} from "../../../../components/3d/card-preview-component.tsx";
import {NavLink} from "react-router-dom";
import {Button} from "../../../../components/utils/button.component.tsx";
import {IoCheckmarkCircle} from "react-icons/io5";
import {Switch} from "../../../../components/utils/switch.component.tsx";
import {HDivider} from "../../../../components/utils/h-divider.component.tsx";
import Select from "react-select";
import {colorSchemaOptions, FontNameOptions, FontSizeOptions} from "../../../../resources/options.ts";
import {ColorSchemes} from "../../../../resources/colors.ts";

export type TCardEditorFormProps = {
	cardbox?: TCardbox
	initialState: TCardEnriched
	onSubmit: (data: any) => void
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
	const initialHash = useMemo(() => JSON.stringify(initialState), [initialState]);
	const [touched, setTouched] = useState(false);
	const [side, setSide] = useState(0);

	const destroying = useRef(false);

	const handleFocus = useCallback((idx: number) => {
		setSide(idx);
	}, []);


	const handleOwnDesign = useCallback((value: boolean) => {
		setState((state: any) => {
			return {...state, ownDesign: value};
		});
	}, []);

	const onChangeSideInput = useCallback((name: string, index: number, e: any) => {
		const value = e.target ? e.target.value : e;

		setState((state: any) => {
			const updatedSides = (state as TCard).sides?.map((side, idx) => {
				if (idx !== index) {
					return side;
				}
				return {...side, [name]: value}
			});

			return {...state, sides: updatedSides};
		});
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
					appearance: {
						...side.appearance,
						colorSchemaName: schemeName,
						color: scheme.color,
						textColor: scheme.textColor
					}
				}
			});

			return {...state, sides: updatedSides};
		});
	}, []);

	const onChangeSideFontName = useCallback((index: number, e: any) => {
		setState(state => {
			const updatedSides = state.sides?.map((side, idx) => {
				if (idx !== index) {
					return side;
				}
				return {
					...side,
					appearance: {
						...side.appearance,
						fontName: e.value
					}
				}
			});

			return {...state, sides: updatedSides};
		});
	}, []);

	const onChangeSideFontSize = useCallback((index: number, e: any) => {
		setState(state => {
			const updatedSides = state.sides?.map((side, idx) => {
				if (idx !== index) {
					return side;
				}
				return {
					...side,
					appearance: {
						...side.appearance,
						fontSize: e.value
					}
				}
			});

			return {...state, sides: updatedSides};
		});
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
		const isTouched = JSON.stringify(state) !== initialHash;
		setTouched(isTouched);
	}, [initialHash, state]);


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

	const saveDisabled = !touched || (state?.sides?.some(side => !side.header && !side.text && !side.footer));

	return <div className={'card-side-editor'}>
		<div className={'form-editor'}>
			{cardbox &&
				<h2>Card of &nbsp; <NavLink to={`/cardboxes/${cardbox.id}/details`}>{cardbox.title}</NavLink></h2>}

			{state.ownDesign && <div className={'tab-switcher'}>
				<div className={'pure-button-group'}>
					{state.sides?.map((_, idx: number) => {
						return <Button
							key={idx}
							pressed={side === idx} onClick={() => setSide(() => idx)}>
							{state.cardboxSides?.[idx].name}
						</Button>
					})}
				</div>
			</div>}

			{state.sides?.map((_side: TCardSide, idx: number) => {
				const fontName = 'sides[' + idx + '].fontName';
				if (state.ownDesign && idx !== side) {
					return null;
				}

				return <div key={idx.toString()}>
					{!state.ownDesign && <h3 className={idx === 0 ? 'title' : ''}>Side {idx + 1}: &nbsp;
						<b>{state.cardboxSides?.[idx].name}</b>
					</h3>}

					<fieldset>
						{state.ownDesign && <label htmlFor={`sides[${idx}].header`}>Header</label>}
						<div className={'field-set'}>
							<input
								id={`sides[${idx}].header`} name={`sides[${idx}].header`}
								autoComplete="off"
								maxLength={128} size={30}
								onFocus={() => handleFocus(idx)}
								value={_side.header}
								onChange={(e) => onChangeSideInput('header', idx, e)}
								placeholder="Top text"
								type={'text'}/>
						</div>
					</fieldset>

					<fieldset>
						{state.ownDesign && <label htmlFor={`sides[${idx}].text`}>Text</label>}
						<div className={'field-set'}>
								<textarea
									id={`sides[${idx}].text`} name={`sides[${idx}].text`}
									autoComplete="off"
									value={_side.text}
									onFocus={() => handleFocus(idx)}
									onChange={(e) => onChangeSideInput('text', idx, e)}
									maxLength={256}
									placeholder="Main text"/>
						</div>
					</fieldset>

					<fieldset>
						{state.ownDesign && <label htmlFor={`sides[${idx}].footer`}>Footer</label>}
						<div className={'field-set'}>
							<input
								id={`sides[${idx}].footer`} name={`sides[${idx}].footer`}
								autoComplete="off"
								value={_side.footer}
								onFocus={() => handleFocus(idx)}
								onChange={(e) => onChangeSideInput('footer', idx, e)}
								maxLength={128} size={30}
								placeholder="Bottom text"
								type={'text'}/>
						</div>
					</fieldset>

					{state.ownDesign && <>
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
										onChange={(e) => onChangeSideFontName(idx, e)}
										value={FontNameOptions.filter((option: any) => option.value === _side.appearance?.fontName)}
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
											onChange={(e) => onChangeSideFontSize(idx, e)}
											value={FontSizeOptions.filter((option: any) => option.value === _side.appearance?.fontSize)}
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
									onChange={(e) => onChangeColorSchema(idx, e)}
									value={colorSchemaOptions.filter((option: any) => option.value === _side.appearance?.colorSchemaName)}
								/>
							</div>
						</fieldset>
					</>}

				</div>;
			})}
			<fieldset className={'actions'}>
				<Switch
					value={state.ownDesign}
					boldOnFocus={false}
					onChange={handleOwnDesign}
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

		<div className={'card-form-preview'}>
			<CardPreview
				card={state}
				side={side}
			/>
		</div>
	</div>;
};
