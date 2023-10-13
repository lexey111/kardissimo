import React, {useCallback, useState} from "react";
import {getCard, getCollection} from "../../store/data/collections-store.selectors.ts";
import {useNavigate} from "react-router-dom";
import {TCard} from "../../store/data/types.ts";
import {Formik} from "formik";
import {CardForm} from "./card-form.component.tsx";
import {removeCard, updateCard} from "../../store/data/collections-store.actions.ts";
import {CardPreview} from "./card-preview-component.tsx";

export type TCardEditorProps = {
	collectionId?: string
	cardId?: string
	isNew?: boolean
}

export const CardEditor: React.FC<TCardEditorProps> = ({collectionId, cardId, isNew = false}) => {

	const collection = getCollection(collectionId);
	const cardData: any = getCard(collectionId, cardId)!;
	cardData['names'] = collection?.sides;

	const [text1, setText1] = useState(cardData.sides[0].word);
	const [text2, setText2] = useState(cardData.sides[1].word);

	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		if (isNew) {
			// delete card first
			removeCard(collectionId, cardId);
		}

		navigate(`/collections/${collectionId}/cards`);
	}, []);

	const handleChange = useCallback((e: any) => {
		const formData = new FormData(e.target.form);

		for (const pair of formData.entries()) {
			if (pair[0] === 'sides[0].word') {
				setText1(pair[1]);
			}
			if (pair[0] === 'sides[1].word') {
				setText2(pair[1]);
			}
		}
	}, []);

	const handleSubmit = useCallback((data: TCard) => {
		// filter ['names']
		updateCard(collectionId, {
			id: data.id,
			sides: data.sides
		});

		//actions.resetForm();

		navigate(`/collections/${collectionId}/cards`);
	}, []);

	return <div className={'card-side-editor'}>
		<div className={'form-editor'}>
			<Formik
				initialValues={cardData!}
				onReset={handleBack}
				onSubmit={handleSubmit}
			>
				<CardForm values={cardData!}
				          handleReset={handleBack}
				          handleChange={handleChange}/>
			</Formik>
		</div>

		<div className={'card-form-preview'}>
			<CardPreview
				text1={text1}
				text2={text2}
			/>
		</div>

	</div>;
};
