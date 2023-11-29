import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {ICardboxState, useCardboxStore} from "../../../../../store/data/cardboxes-store.ts";
import {useShallow} from "zustand/react/shallow";
import {AgGridReact} from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
	TCardListTableMode,
	TCardListTableViewMode,
	useSettingsStore
} from "../../../../../store/settings/settings-store.ts";
import {PreviewCell} from "./card-table-preview.component.tsx";
import {RemoveCell} from "./card-table-remove.component.tsx";
import {useCardNavigateHook} from "../../../../../components/hooks/useCardNavigate.hook.tsx";
import {TCardboxSide} from "../../../../../store/data/types.ts";
import {moveCardTo} from "../../../../../store/data/cardboxes-store.selectors.ts"; // Optional theme CSS

export type TCardTableProps = {
	cardboxId?: string
}

function getTableDefs(cardboxId?: string, sides?: Array<TCardboxSide>, tableEditMode?: TCardListTableMode, tableViewMode?: TCardListTableViewMode) {
	const result = [];

	const previewColumn: any = {
		field: '_preview',
		headerName: '',
		rowDrag: true,
		width: 80,
		maxWidth: 80,
		minWidth: 80,
		editable: false, sortable: false, resizable: false, filter: '',
		cellRenderer: PreviewCell,
		cellRendererParams: {
			cardboxId: cardboxId
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
			cardboxId: cardboxId
		}
	};

	if (tableViewMode === 'wide') {
		result.push(...(sides || []).map((side, idx) => {
			return {
				headerName: side.name,
				editable: false, sortable: false, resizable: false, filter: '',
				children: [
					{
						field: `sides.${idx}.header`,
						headerName: 'Header',
						editable: tableEditMode === 'editable',
						wrapText: true,
						autoHeight: true,
						filter: true,
						//hide: tableViewMode === 'narrow'
					},
					{
						field: `sides.${idx}.text`,
						headerName: 'Text',
						editable: tableEditMode === 'editable',
						wrapText: true,
						autoHeight: true,
						filter: true,
					},
					{
						field: `sides.${idx}.footer`,
						headerName: 'Footer',
						editable: tableEditMode === 'editable',
						wrapText: true,
						autoHeight: true,
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
				field: `sides.${idx}.text`,
				headerName: side.name,
				editable: tableEditMode === 'editable',
				filter: true,
			};
		}));

		result.splice(0, 0, previewColumn);
		result.push(deleteColumn);
	}

	return result;
}

export const CardTable: React.FC<TCardTableProps> = (
	{
		cardboxId,
	}) => {

	const {goCard} = useCardNavigateHook(cardboxId!, '');

	const tableEditMode = useSettingsStore((state) => state.tableEditMode);
	const tableViewMode = useSettingsStore((state) => state.tableViewMode);

	const [readonly, setReadonly] = useState(tableEditMode === 'readonly');

	const gridRef = useRef<any>(); // Optional - for accessing Grid's API

	const sides = useCardboxStore(useShallow((state: ICardboxState) => state.cardboxes
		.find(c => c.id === cardboxId)?.sides));

	const [columnDefs, setColumnDefs] = useState(getTableDefs(cardboxId, sides, tableEditMode, tableViewMode));

	const [sourceIndex, setSourceIndex] = useState(-1);

	useEffect(() => {
		if (!gridRef.current.api) {
			return;
		}

		setReadonly(tableEditMode === 'readonly');

		if (tableEditMode === 'readonly') {
			gridRef.current.api.stopEditing();
		}

		setColumnDefs(getTableDefs(cardboxId, sides, tableEditMode, tableViewMode));

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

	const cards = useCardboxStore(useShallow((state: ICardboxState) => state.cardboxes
		.find(c => c.id === cardboxId)?.cards
	));

	useEffect(() => {
		gridRef.current?.api?.setRowData(cards);
	}, [cards?.length]);

	const processDoubleClick = useCallback((e: any) => {
		if (readonly) {
			goCard(e.data.id);
		}
	}, [goCard, readonly]);

	const handleDrag = useCallback((e: any) => {
		const endIndex = e.overIndex;
		moveCardTo(cardboxId!, sourceIndex, endIndex)
	}, [sourceIndex]);

	const handleDragEnter = useCallback((e: any) => {
		setSourceIndex(() => e.overIndex);
	}, [setSourceIndex]);

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
				onRowDragEnd={handleDrag}
				onRowDragEnter={handleDragEnter}
				rowDragManaged={true}
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