import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AgGridReact} from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {TCardListTableMode, TCardListTableViewMode} from "../../../../../store/settings/types-settings.ts";
import {PreviewCell} from "./card-table-preview.component.tsx";
import {RemoveCell} from "./card-table-remove.component.tsx";
import {useCardNavigateHook} from "../../../../../hooks/useCardNavigate.hook.tsx";
import {moveCardTo} from "../../../../../store/data/cardboxes-store.selectors.ts";
import {useSettingsQuery} from "../../../../../store/settings/hooks/useSettingsHook.tsx";
import {TSCard} from "../../../../../store/cards/types-card.ts";

export type TCardTableProps = {
	cardboxId: number
	sides: Array<string>
	cards: Array<TSCard>
}

function getTableDefs(cardboxId: number, sides?: Array<string>, tableEditMode?: TCardListTableMode, tableViewMode?: TCardListTableViewMode) {
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
		result.push(...(sides || [])
			.map((side, idx) => {
				return {
					headerName: side,
					editable: false, sortable: false, resizable: false, filter: '',
					children: [
						{
							field: `side${idx + 1}header`,
							headerName: 'Header',
							editable: tableEditMode === 'editable',
							wrapText: true,
							autoHeight: true,
							filter: true,
							sortable: false
							//hide: tableViewMode === 'narrow'
						},
						{
							field: `side${idx + 1}text`,
							headerName: 'Text',
							editable: tableEditMode === 'editable',
							wrapText: true,
							sortable: false,
							autoHeight: true,
							filter: true,
						},
						{
							field: `side${idx + 1}footer`,
							headerName: 'Footer',
							editable: tableEditMode === 'editable',
							wrapText: true,
							sortable: false,
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
				field: `side${idx + 1}text`,
				headerName: side,
				editable: tableEditMode === 'editable',
				sortable: false,
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
		sides,
		cards,
	}) => {

	const {goCard} = useCardNavigateHook(cardboxId, '');

	const {isLoading, error, data: appState} = useSettingsQuery();

	const [readonly, setReadonly] = useState(appState?.tableEditMode === 'readonly');

	const gridRef = useRef<any>(); // Optional - for accessing Grid's API

	const [columnDefs, setColumnDefs] = useState(getTableDefs(cardboxId, sides, appState?.tableEditMode, appState?.tableViewMode));

	const [sourceIndex, setSourceIndex] = useState(-1);

	useEffect(() => {
		if (!gridRef.current.api) {
			return;
		}

		setReadonly(appState?.tableEditMode === 'readonly');

		if (appState?.tableEditMode === 'readonly') {
			gridRef.current.api.stopEditing();
		}

		setColumnDefs(getTableDefs(cardboxId, sides, appState?.tableEditMode, appState?.tableViewMode));

	}, [gridRef.current, appState?.tableEditMode, appState?.tableViewMode, sides]);

	useEffect(() => {
		if (!gridRef.current.api) {
			return;
		}

		setTimeout(() => {
			gridRef.current?.api && gridRef.current.api.sizeColumnsToFit();
			const storedPos = parseInt(localStorage.getItem('_lastCardsScrollPos') || '', 10);
			localStorage.setItem('_lastCardsScrollPos', '-1');

			if (!isNaN(storedPos) && storedPos !== -1) {
				document.scrollingElement!.scrollTop = storedPos;
			}
		}, 0);
	}, [gridRef.current, appState?.tableViewMode, appState?.tableEditMode]);

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

	useEffect(() => {
		gridRef.current?.api?.setRowData(cards);
	}, [cards?.length]);

	const processDoubleClick = useCallback((e: any) => {
		if (readonly) {
			localStorage.setItem('_lastCardsScrollPos', (document.scrollingElement?.scrollTop || 0).toString());
			goCard(e.data.id);
		}
	}, [goCard, readonly]);

	const handleDrag = useCallback((e: any) => {
		const endIndex = e.overIndex;
		moveCardTo(cardboxId, sourceIndex, endIndex)
	}, [sourceIndex]);

	const handleDragEnter = useCallback((e: any) => {
		setSourceIndex(() => e.overIndex);
	}, [setSourceIndex]);

	if (isLoading || error) {
		return null;
	}

	return <div className={'card-table ' + appState?.tableEditMode + ' ' + appState?.tableViewMode}>
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
