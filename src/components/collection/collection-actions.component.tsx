import React, {useCallback} from "react";
import {useCollectionStore} from "../../store/data/collections-store.ts";

export type TCollectionActionsProps = {
	id: string;
}
export const CollectionActions: React.FC<TCollectionActionsProps> = ({id}) => {
	const {remove, rename} = useCollectionStore();

	const removeCollection = useCallback((id: string) => {
		remove(id);
		console.log('Remove', id);
	}, []);

	const renameCollection = useCallback((id: string) => {
		rename(id, 'New name');
		console.log('rename', id);
	}, []);

	return <div className={'collection-item-actions'}>
		<button onClick={() => renameCollection(id!)}>Rename</button>
		<button onClick={() => removeCollection(id!)}>Remove</button>
	</div>;
};
