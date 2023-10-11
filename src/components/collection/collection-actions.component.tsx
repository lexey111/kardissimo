import React, {useCallback} from "react";
import {useCollectionStore} from "../../store/data/collections-store.ts";
import {useNavigate} from "react-router-dom";

export type TCollectionActionsProps = {
	id: string;
}
export const CollectionActions: React.FC<TCollectionActionsProps> = ({id}) => {
	const {remove} = useCollectionStore();
	const navigate = useNavigate();

	const removeCollection = useCallback((id: string) => {
		console.log('Remove', id);
		remove(id);
	}, []);

	const editCollection = useCallback((id: string) => {
		navigate('/collections/' + id);
	}, []);

	const goCards = useCallback((id: string) => {
		navigate('/collections/' + id + '/cards');
	}, []);

	return <div className={'collection-item-actions'}>
		<button onClick={() => editCollection(id!)} className={'pure-button pure-button-secondary'}>Edit</button>
		<button onClick={() => goCards(id!)} className={'pure-button pure-button-primary'}>Cards</button>
		<button onClick={() => removeCollection(id!)} className={'pure-button pure-button-danger'}>Remove</button>
	</div>;
};
