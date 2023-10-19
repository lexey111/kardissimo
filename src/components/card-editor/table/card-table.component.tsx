import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {ICollectionState, useCollectionStore} from "../../../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";
import {AgGridReact} from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {useNavigate} from "react-router-dom";
import {TCardListTableMode, TCardListTableViewMode, useSettingsStore} from "../../../store/settings/settings-store.ts";
import {PreviewCell} from "./card-table-preview.component.tsx";
import {RemoveCell} from "./card-table-remove.component.tsx"; // Optional theme CSS

export type TCardTableProps = {
	collectionId?: string
}

function getTableDefs(collectionId?: string, sides?: [string, string], tableEditMode?: TCardListTableMode, tableViewMode?: TCardListTableViewMode) {
	let result = [];

	const previewColumn: any = {
		field: '_preview',
		headerName: '',
		width: 60,
		maxWidth: 60,
		minWidth: 60,
		editable: false, sortable: false, resizable: false, filter: '',
		cellRenderer: PreviewCell,
		cellRendererParams: {
			collectionId: collectionId
		}
	};

	const deleteColumn: any = {
		field: '_delete',
		headerName: '',
		width: 60,
		maxWidth: 60,
		minWidth: 60,
		editable: false, sortable: false, resizable: false, filter: '',
		cellRenderer: RemoveCell,
		cellRendererParams: {
			collectionId: collectionId
		}
	};

	if (tableViewMode === 'wide') {
		result.push(...(sides || []).map((side, idx) => {
			return {
				headerName: side,
				editable: false, sortable: false, resizable: false, filter: '',
				children: [
					{
						field: `sides.${idx}.header`,
						headerName: 'Header',
						editable: tableEditMode === 'editable',
						filter: true,
						//hide: tableViewMode === 'narrow'
					},
					{
						field: `sides.${idx}.word`,
						headerName: 'Word',
						editable: tableEditMode === 'editable',
						filter: true,
					},
					{
						field: `sides.${idx}.footer`,
						headerName: 'Footer',
						editable: tableEditMode === 'editable',
						filter: true,
						// hide: tableViewMode === 'narrow'
					}]
			};
		}));

		result[0].children.splice(0, 0, previewColumn);
		result[sides!.length - 1].children.push(deleteColumn);
	} else {
		result.push(...(sides || []).map((side, idx) => {
			return {
				field: `sides.${idx}.word`,
				headerName: side,
				editable: tableEditMode === 'editable',
				filter: true,
			};
		}));

		result.splice(0, 0, previewColumn);
		result.push(deleteColumn);
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

	}, [gridRef.current, tableEditMode, tableViewMode, sides]);

	useEffect(() => {
		if (!gridRef.current.api) {
			return;
		}

		setTimeout(() => {
			gridRef.current?.api && gridRef.current.api.sizeColumnsToFit();
		}, 0);
	}, [gridRef.current, tableViewMode, tableEditMode]);


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
			const scrollContainer: any = window.document.scrollingElement;
			if (scrollContainer && scrollContainer?.scrollTop > 0) {
				localStorage.setItem('_list_scroll_position', scrollContainer.scrollTop);
			}
			navigate(`/collections/${collectionId}/cards/${e.data.id}`, {preventScrollReset: true});
		}
	}, [readonly]);

	return <div className={'card-table ' + tableEditMode + ' ' + tableViewMode}>
		<div className="ag-theme-alpine">
			<AgGridReact
				ref={gridRef}
				domLayout={'autoHeight'}
				rowData={cards}
				columnDefs={columnDefs as any}
				defaultColDef={defaultColDef}
				animateRows={true}
				rowSelection={'single'}
				//suppressCellFocus={readonly}
				enableCellEditingOnBackspace={true}
				onRowDoubleClicked={processDoubleClick}
				onGridReady={handleReady}
				enterNavigatesVertically={true}
				enterNavigatesVerticallyAfterEdit={true}
			/>
		</div>
	</div>;
};
