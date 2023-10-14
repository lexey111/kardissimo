import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";
import {AgGridReact} from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {useNavigate} from "react-router-dom";
import {TCardListTableMode, TCardListTableViewMode, useSettingsStore} from "../../store/settings/settings-store.ts";
import {PreviewCell} from "./card-table-preview.component.tsx"; // Optional theme CSS

export type TCardTableProps = {
	collectionId?: string
}

function getTableDefs(collectionId?: string, sides?: [string, string], tableEditMode?: TCardListTableMode, tableViewMode?: TCardListTableViewMode) {
	const result: any = [
		{
			field: '_preview',
			headerName: '',
			width: 50,
			editable: false, sortable: false, resizable: false, filter: '',
			cellRenderer: PreviewCell,
			cellRendererParams: {
				collectionId: collectionId
			}
		}];

	if (tableViewMode === 'wide') {
		result.push(...(sides || []).map((side, idx) => {
			return {
				headerName: side,
				children: [
					{
						field: `sides.${idx}.header`,
						headerName: 'Header',
						editable: tableEditMode === 'editable',
						filter: 'string',
						//hide: tableViewMode === 'narrow'
					},
					{
						field: `sides.${idx}.word`,
						headerName: 'Word',
						editable: tableEditMode === 'editable',
						filter: 'string'
					},
					{
						field: `sides.${idx}.footer`,
						headerName: 'Footer',
						editable: tableEditMode === 'editable',
						filter: 'string',
						// hide: tableViewMode === 'narrow'
					}]
			};
		}))
	} else {
		result.push(...(sides || []).map((side, idx) => {
			return {
				field: `sides.${idx}.word`,
				headerName: side,
				editable: tableEditMode === 'editable',
				filter: 'string',
			};
		}))

	}
	return result;
}

export const CardTable: React.FC<TCardTableProps> = ({
	                                                     collectionId,
                                                     }) => {

	const navigate = useNavigate();

	const tableEditMode = useSettingsStore((state) => state.tableEditMode);
	const tableViewMode = useSettingsStore((state) => state.tableViewMode);

	const [readonly, setReadonly] = useState(tableEditMode === 'readonly');

	const gridRef = useRef<any>(); // Optional - for accessing Grid's API

	const sides = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.sides));


	const [columnDefs, setColumnDefs] = useState(getTableDefs(collectionId, sides, tableEditMode, tableViewMode));

	useEffect(() => {
		if (!gridRef.current.api) {
			return;
		}

		setReadonly(tableEditMode === 'readonly');

		if (tableEditMode === 'readonly') {
			gridRef.current.api.stopEditing();
		}

		setColumnDefs(getTableDefs(collectionId, sides, tableEditMode, tableViewMode));

		// sides?.forEach((_, idx) => {
		// 	gridRef.current.columnApi.setColumnVisible(`sides.${idx}.header`, tableViewMode === 'wide');
		// 	gridRef.current.columnApi.setColumnVisible(`sides.${idx}.footer`, tableViewMode === 'wide');
		// });
		//
		setTimeout(() => {
			gridRef.current?.api && gridRef.current.api.sizeColumnsToFit();
		}, 10);
	}, [gridRef.current, tableEditMode, tableViewMode, sides]);


	const defaultColDef = useMemo(() => ({
		sortable: true,
		resizable: true,
		suppressMovable: true,
	}), []);

	const handleReady = useCallback(() => {
		if (!gridRef.current.api) {
			return;
		}
		gridRef.current?.api && gridRef.current.api.sizeColumnsToFit();
	}, []);

	const cards = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.cards //.map(c => ({'_preview': 1, ...c}))
	));

	const processDoubleClick = useCallback((e: any) => {
		if (readonly) {
			navigate(`/collections/${collectionId}/cards/${e.data.id}`);
		}
	}, [readonly]);

	return <div className={'card-table ' + (readonly ? 'readonly' : 'editable')}>
		<div className="ag-theme-alpine">
			<AgGridReact
				ref={gridRef}
				domLayout={'autoHeight'}
				rowData={cards}
				columnDefs={columnDefs as any}
				defaultColDef={defaultColDef}
				animateRows={true}
				rowSelection={'single'}
				suppressCellFocus={readonly}
				enableCellEditingOnBackspace={true}
				onRowDoubleClicked={processDoubleClick}
				onGridReady={handleReady}
				enterNavigatesVertically={true}
				enterNavigatesVerticallyAfterEdit={true}
			/>
		</div>
	</div>;
};
