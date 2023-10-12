import React from "react";
import {Field, Form,} from 'formik';
import {TCardSide} from "../../store/data/types.ts";

export const CardForm: React.FC = ({
	                                   handleSubmit,
	                                   handleReset,
	                                   values,
                                   }: any) => {

	// {"id":"D-rt4bwbcetiss4z","sides":[{"word":"The word"},{"word":"La palabra"}]}
	return <Form>
		{values.sides?.map((_: TCardSide, idx: number) => {
			return <div key={idx.toString()}>
				<h3 className={idx === 0 ? 'title' : ''}>Side {idx + 1}: <b>{values.names[idx]}</b></h3>

				<fieldset>
					<label htmlFor={`sides[${idx}].header`}>Header</label>
					<div className={'field-set'}>
						<Field id={`sides[${idx}].header`} name={`sides[${idx}].header`}
						       autoComplete="off"
						       maxLength={128} size={40}
						       placeholder="Top text"
						       type={'text'}/>
					</div>
				</fieldset>

				<fieldset>
					<label htmlFor={`sides[${idx}].word`}>Text</label>
					<div className={'field-set'}>
						<Field id={`sides[${idx}].word`} name={`sides[${idx}].word`}
						       autoComplete="off"
						       maxLength={256} size={40}
						       placeholder="Main text"
						       as={'textarea'}/>
					</div>
				</fieldset>

				<fieldset>
					<label htmlFor={`sides[${idx}].footer`}>Footer</label>
					<div className={'field-set'}>
						<Field id={`sides[${idx}].footer`} name={`sides[${idx}].footer`}
						       autoComplete="off"
						       maxLength={128} size={40}
						       placeholder="Bottom text"
						       type={'text'}/>
					</div>
				</fieldset>

			</div>;
		})}
		<fieldset className={'actions'}>
			<button type="button" className={'pure-button'}
			        onClick={handleReset}>&larr; Cancel
			</button>
			&nbsp;
			<button type="button"
			        onClick={handleSubmit}
			        className={'pure-button pure-button-primary'}>Save
			</button>
		</fieldset>
	</Form>
};
