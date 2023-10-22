import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {TCard, TCardEnriched, TCardSide, TCollection} from "../../store/data/types.ts";
import {CardPreview} from "./card-preview-component.tsx";
import {NavLink} from "react-router-dom";
import {FaCircleArrowRight} from "react-icons/fa6";

export type TCardEditorFormProps = {
	collection?: TCollection
	initialState: TCardEnriched
	onSubmit: (data: any) => void
	onCancel: () => void
	isNew: boolean
}

export const CardEditorForm: React.FC<TCardEditorFormProps> = ({
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
	}, [state]);


	useEffect(() => {
		setTimeout(() => {
			if (!destroying.current) {
				document.getElementById('sides[0].header')?.focus();
			}
		}, 200);
	}, []);

	return <div className={'card-side-editor'}>
		<div className={'form-editor'}>
			<form>
				{collection && <h2><NavLink to={`/collections/${collection.id}/details`}>{collection.title}  <FaCircleArrowRight/></NavLink></h2>}

				{state.sides?.map((side: TCardSide, idx: number) => {
					return <div key={idx.toString()}>
						<h3 className={idx === 0 ? 'title' : ''}>Side {idx + 1}: <b>{state.collectionSides?.[idx].name}</b>
						</h3>

						<fieldset>
							<div className={'field-set'}>
								<input id={`sides[${idx}].header`} name={`sides[${idx}].header`}
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
								<textarea id={`sides[${idx}].word`} name={`sides[${idx}].word`}
								          autoComplete="off"
								          value={side.word}
								          onFocus={() => handleFocus(idx)}
								          onChange={(e) => onChangeSideInput('word', idx, e)}
								          maxLength={256}
								          placeholder="Main text"/>
							</div>
						</fieldset>

						<fieldset>
							<div className={'field-set'}>
								<input id={`sides[${idx}].footer`} name={`sides[${idx}].footer`}
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
					<button type="button" className={'pure-button'}
					        onClick={onCancel}>&larr; Cancel (Esc)
					</button>
					&nbsp;
					<button type="button"
					        onClick={() => onSubmit(state)}
					        disabled={!touched}
					        className={'pure-button pure-button-primary'}>{isNew ? 'Create' : 'Save'}
					</button>
				</fieldset>
			</form>
		</div>

		<div className={'card-form-preview'}>
			<CardPreview
				card={state}
				side={side}
			/>
		</div>
	</div>;
};
