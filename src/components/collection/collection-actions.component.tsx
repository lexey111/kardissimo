import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {removeCollection} from "../../store/data/collections-store.actions.ts";
import {countCards} from "../../store/data/collections-store.selectors.ts";

export type TCollectionActionsProps = {
	id: string;
}
export const CollectionActions: React.FC<TCollectionActionsProps> = ({id}) => {
	const navigate = useNavigate();

	const cardCount = countCards(id);

	const editCollection = useCallback((id: string) => {
		navigate('/collections/' + id);
	}, []);

	const goCards = useCallback((id: string) => {
		navigate('/collections/' + id + '/cards');
	}, []);

	return <div className={'collection-item-actions'}>
		<button onClick={() => editCollection(id!)} className={'pure-button pure-button-secondary'}>Edit</button>
		<button onClick={() => goCards(id!)} className={'pure-button pure-button-primary'}>Cards ({cardCount})</button>
		<button onClick={() => removeCollection(id!)} className={'pure-button pure-button-danger'}>Remove</button>
	</div>;
};
