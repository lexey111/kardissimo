import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {TCard, TCardEnriched, TCardSide, TCollection} from "../../../../store/data/types.ts";
import {CardPreview} from "../../../../components/3d/card-preview-component.tsx";
import {NavLink} from "react-router-dom";
import {Button} from "../../../../components/utils/button.component.tsx";
import {IoCheckmarkCircle} from "react-icons/io5";

export type TCardEditorFormProps = {
	collection?: TCollection
	initialState: TCardEnriched
	onSubmit: (data: any) => void
	onCancel: () => void
	isNew: boolean
}

export const CardEditorForm: React.FC<TCardEditorFormProps> = (
	{
		collection,
		initialState,
		onSubmit,
		onCancel,
		isNew
	}) => {
	const [state, setState] = useState(initialState);
	const initialHash = useMemo(() => JSON.stringify(initialState), [initialState]);
	const [touched, setTouched] = useState(false);
	const [side, setSide] = useState(-1);

	const destroying = useRef(false);

	const handleFocus = useCallback((idx: number) => {
		setSide(idx);
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

	return <div className={'card-side-editor'}>
		<div className={'form-editor'}>
			{collection &&
				<h2><NavLink to={`/collections/${collection.id}/details`}>{collection.title}</NavLink></h2>}

			{state.sides?.map((side: TCardSide, idx: number) => {
				return <div key={idx.toString()}>
					<h3 className={idx === 0 ? 'title' : ''}>Side {idx + 1}: <b>{state.collectionSides?.[idx].name}</b>
					</h3>

					<fieldset>
						<div className={'field-set'}>
							<input
								id={`sides[${idx}].header`} name={`sides[${idx}].header`}
								autoComplete="off"
								maxLength={128} size={30}
								onFocus={() => handleFocus(idx)}
								value={side.header}
								onChange={(e) => onChangeSideInput('header', idx, e)}
								placeholder="Top text"
								type={'text'}/>
						</div>
					</fieldset>

					<fieldset>
						<div className={'field-set'}>
								<textarea
									id={`sides[${idx}].text`} name={`sides[${idx}].text`}
									autoComplete="off"
									value={side.text}
									onFocus={() => handleFocus(idx)}
									onChange={(e) => onChangeSideInput('text', idx, e)}
									maxLength={256}
									placeholder="Main text"/>
						</div>
					</fieldset>

					<fieldset>
						<div className={'field-set'}>
							<input
								id={`sides[${idx}].footer`} name={`sides[${idx}].footer`}
								autoComplete="off"
								value={side.footer}
								onFocus={() => handleFocus(idx)}
								onChange={(e) => onChangeSideInput('footer', idx, e)}
								maxLength={128} size={30}
								placeholder="Bottom text"
								type={'text'}/>
						</div>
					</fieldset>

				</div>;
			})}
			<fieldset className={'actions'}>
				<Button onClick={onCancel} type={'secondary'}>&larr; Cancel (Esc)</Button>
				<Button
					onClick={() => onSubmit(state)}
					icon={<IoCheckmarkCircle/>}
					disabled={!touched}>
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
