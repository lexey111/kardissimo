import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AgGridReact} from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {useCardNavigateHook} from "../../../../../hooks/useCardNavigate.hook.tsx";
import {useSettingsQuery} from "../../../../../store/settings/hooks/useSettingsHook.tsx";
import {TSCard} from "../../../../../store/cards/types-card.ts";
import {getTableDefs} from "./table-utils.ts";

export type TCardTableProps = {
	cardboxId: number
	sides: Array<string>
	cards: Array<TSCard>
	handleMove: (dragIndex: number, hoverIndex: number) => void
}

export const CardTable: React.FC<TCardTableProps> = (
	{
		cardboxId,
		sides,
		cards,
		handleMove
	}) => {

	const {goCard} = useCardNavigateHook(cardboxId, '');

	const {isLoading, error, data: appState} = useSettingsQuery();

	const [readonly, setReadonly] = useState(appState?.tableEditMode === 'readonly');

	const gridRef = useRef<any>(); // Optional - for accessing Grid's API

	const [columnDefs, setColumnDefs] = useState(getTableDefs(cardboxId, sides, appState?.tableEditMode, appState?.tableViewMode));

	const [sourceDragId, setSourceDragId] = useState(-1);

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

	const handleDragEnd = useCallback((e: any) => {
		const endId = e.overNode.data.id;
		handleMove(sourceDragId, endId);

	}, [sourceDragId]);

	const handleDragEnter = useCallback((e: any) => {
		setSourceDragId(() => e.node.data.id);
	}, [setSourceDragId]);

	const getRowClass = useCallback((params: any) => {
		if (params.node.data.unstable === true) {
			return 'unstable';
		}
		return '';
	}, []);

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
				animateRows={false}
				rowSelection={'single'}
				onRowDragEnd={handleDragEnd}
				onRowDragEnter={handleDragEnter}
				rowDragManaged={false}
				getRowClass={getRowClass}
				pagination={true}
				paginationPageSize={20}
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
