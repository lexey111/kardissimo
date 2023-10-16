import React, {useEffect, useRef} from "react";
import {Field, Form,} from 'formik';
import {TCard, TCardSide} from "../../store/data/types.ts";

export type TCardFormProps = {
	handleReset: any
	handleChange: any
	handleSideFocus: any
	values: TCard
}
export const CardForm: React.FC<TCardFormProps> = ({
	                                                   handleReset,
	                                                   handleChange,
	                                                   handleSideFocus,
	                                                   values,
                                                   }: any) => {

	const destroying = useRef(false);
	useEffect(() => {
		return () => {
			destroying.current = true;
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (!destroying.current) {
				document.getElementById('sides[0].header')?.focus();
			}
		}, 200);
	}, []);

	return <Form onChange={handleChange}>
		{values.sides?.map((_: TCardSide, idx: number) => {
			return <div key={idx.toString()}>
				<h3 className={idx === 0 ? 'title' : ''}>Side {idx + 1}: <b>{values.names[idx]}</b></h3>

				<fieldset>
					<div className={'field-set'}>
						<Field id={`sides[${idx}].header`} name={`sides[${idx}].header`}
						       autoComplete="off"
						       maxLength={128} size={30}
						       onFocus={handleSideFocus}
						       placeholder="Top text"
						       type={'text'}/>
					</div>
				</fieldset>

				<fieldset>
					<div className={'field-set'}>
						<Field id={`sides[${idx}].word`} name={`sides[${idx}].word`}
						       autoComplete="off"
						       onFocus={handleSideFocus}
						       maxLength={256} size={30}
						       placeholder="Main text"
						       as={'textarea'}/>
					</div>
				</fieldset>

				<fieldset>
					<div className={'field-set'}>
						<Field id={`sides[${idx}].footer`} name={`sides[${idx}].footer`}
						       autoComplete="off"
						       onFocus={handleSideFocus}
						       maxLength={128} size={30}
						       placeholder="Bottom text"
						       type={'text'}/>
					</div>
				</fieldset>

			</div>;
		})}
		<fieldset className={'actions'}>
			<button type="button" className={'pure-button'}
			        onClick={handleReset}>&larr; Cancel (Esc)
			</button>
			&nbsp;
			<button type="submit"
				//onClick={handleSubmit}
				    className={'pure-button pure-button-primary'}>Save
			</button>
		</fieldset>
	</Form>
};
