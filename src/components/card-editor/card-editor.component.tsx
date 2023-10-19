import React, {useCallback, useEffect, useState} from "react";
import {getCard, getCollection} from "../../store/data/collections-store.selectors.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {TCard} from "../../store/data/types.ts";
import {Formik} from "formik";
import {CardForm} from "./card-form.component.tsx";
import {removeCard, updateCard} from "../../store/data/collections-store.actions.ts";
import {CardPreview} from "./card-preview-component.tsx";

export type TCardEditorProps = {
	collectionId?: string
	cardId?: string
}

const targetMatcher = new RegExp(/sides\[(\d+)]/);

export const CardEditor: React.FC<TCardEditorProps> = ({collectionId, cardId}) => {
	const [searchParams] = useSearchParams();
	const isNew = searchParams.get('new') !== null;

	const collection = getCollection(collectionId);
	const cardData: any = getCard(collectionId, cardId)!;
	cardData['names'] = collection?.sides;

	const [text1, setText1] = useState(cardData.sides[0].word);
	const [text2, setText2] = useState(cardData.sides[1].word);

	const [header1, setHeader1] = useState(cardData.sides[0].header);
	const [footer1, setFooter1] = useState(cardData.sides[0].footer);

	const [header2, setHeader2] = useState(cardData.sides[1].header);
	const [footer2, setFooter2] = useState(cardData.sides[1].footer);

	const [side, setSide] = useState(0);

	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		if (isNew) {
			// delete the card first
			removeCard(collectionId, cardId);
		}

		navigate(`/collections/${collectionId}/cards?from-new`, {preventScrollReset: true});
	}, []);

	const handleEsc = useCallback((e: any) => {
		if (e.key !== 'Escape') {
			return;
		}
		handleBack();
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleEsc);
		return () => {
			window.removeEventListener('keydown', handleEsc);
		}
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
			if (pair[0] === 'sides[0].header') {
				setHeader1(pair[1]);
			}
			if (pair[0] === 'sides[0].footer') {
				setFooter1(pair[1]);
			}
			if (pair[0] === 'sides[1].header') {
				setHeader2(pair[1]);
			}
			if (pair[0] === 'sides[1].footer') {
				setFooter2(pair[1]);
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

		navigate(`/collections/${collectionId}/cards`, {preventScrollReset: true});
	}, []);

	const handleSideFocus = useCallback((e: any) => {
		const targetId = e?.target?.id;
		if (!targetId) {
			return;
		}
		// sides[0].header
		targetMatcher.lastIndex = -1;
		const side = Number(targetMatcher.exec(targetId)?.[1]);
		if (isNaN(side)) {
			return;
		}

		setSide(side);
	}, []);

	return <div className={'card-side-editor'}>
		<div className={'form-editor'}>
			<Formik initialValues={cardData!}
			        onReset={handleBack}
			        validateOnMount={true}
			        onSubmit={handleSubmit}>
				<CardForm values={cardData!}
				          handleSideFocus={handleSideFocus}
				          handleReset={handleBack}
				          handleChange={handleChange}/>
			</Formik>
		</div>

		<div className={'card-form-preview'}>
			<CardPreview
				text1={text1}
				text2={text2}
				header1={header1}
				header2={header2}
				footer1={footer1}
				footer2={footer2}
				side={side}
			/>
		</div>

	</div>;
};
