import React, {useCallback} from "react";
import {getCard, getCollection} from "../../store/data/collections-store.selectors.ts";
import {useNavigate} from "react-router-dom";
import {TCard} from "../../store/data/types.ts";
import {Formik, FormikHelpers} from "formik";
import {CardForm} from "./card-form.component.tsx";
import {updateCard} from "../../store/data/collections-store.actions.ts";

export type TCardEditorProps = {
	collectionId?: string
	cardId?: string
}

export const CardEditor: React.FC<TCardEditorProps> = ({collectionId, cardId}) => {

	const collection = getCollection(collectionId);
	let cardData: any = getCard(collectionId, cardId)!;
	cardData['names'] = collection?.sides;

	const navigate = useNavigate();

	const handleBack = useCallback(() => {
		navigate(-1);
	}, []);

	const handleSubmit = useCallback((values: TCard, actions: FormikHelpers<TCard>) => {
		// filter [names]
		updateCard(collectionId, {id: values.id, sides: values.sides});
		console.log('Save', values);

		actions.resetForm();

		navigate(`/collections/${collectionId}/cards`);
	}, []);

	return <div className={'card-side-editor'}>
		<div className={'form-editor'}>
			<Formik
				initialValues={cardData!}
				onReset={handleBack}
				onSubmit={handleSubmit}
				validateOnMount={true}
				validateOnChange={true}
				validateOnBlur={true}
				component={CardForm}/>
		</div>

	</div>;
};
