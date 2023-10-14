import React, {useCallback, useMemo, useRef, useState} from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";
import {AgGridReact} from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {useNavigate} from "react-router-dom"; // Optional theme CSS
export type TCardTableProps = {
	collectionId?: string
}

export const CardTable: React.FC<TCardTableProps> = ({
	                                                     collectionId,
                                                     }) => {
	const gridRef = useRef<any>(); // Optional - for accessing Grid's API

	const sides = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.sides));

	const navigate = useNavigate();

	const navigateToCard = useCallback(() => {
		navigate(`/collections/${collectionId}/cards/${cardId}`);
	}, []);

	const [columnDefs] = useState(
		[
			{
				field: 'test',
				headerName: '',
				width: '50px',
				editable: false, sortable: false, resizable: false, filer: 'none'
			},
			...(sides || []).map((side, idx) => {
				return {
					headerName: side,
					children: [
						{field: `sides.${idx}.header`, headerName: 'Header', editable: true, filter: 'string'},
						{field: `sides.${idx}.word`, headerName: 'Word', editable: true, filter: 'string'},
						{field: `sides.${idx}.footer`, headerName: 'Footer', editable: true, filter: 'string'}
					]
				};
			})]);

	const defaultColDef = useMemo(() => ({
		sortable: true,
		resizable: true,
		suppressMovable: true,
	}), []);


	const cards = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.cards
	));

	return <div className={'card-table'}>
		<div className="ag-theme-alpine">
			<AgGridReact
				ref={gridRef}
				domLayout={'autoHeight'}
				rowData={cards}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				animateRows={true}
				sideBar={'columns'}
				rowSelection={'single'}
				// suppressCellFocus={true}
				enableCellEditingOnBackspace={true}
				// enterNavigatesVertically={true}
				// enterNavigatesVerticallyAfterEdit={true}
			/>
		</div>
	</div>;
};
