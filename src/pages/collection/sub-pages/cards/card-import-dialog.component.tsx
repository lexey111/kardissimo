import React, {useCallback, useEffect, useRef, useState} from "react";
import {Button} from "../../../../components/utils/button.component.tsx";
import {FaArrowLeft} from "react-icons/fa";
import {Modal} from "../../../../components/utils/modal-component.tsx";
import {FaTrashCan} from "react-icons/fa6";
import {AgGridReact} from "ag-grid-react";
import {TCollectionSide} from "../../../../store/data/types.ts";

function getTableDefs(data: any, sides: Array<TCollectionSide>): any {
	const result: any = [];

	if (!data) {
		return result;
	}

	result.push({
		field: '_num',
		headerName: '#',
		width: 60,
		editable: false, sortable: false, resizable: false, filter: '',
	});

	result.push({
		field: '_checked',
		headerName: '?',
		width: 50,
		cellStyle: {
			align: 'center'
		},
		editable: true, sortable: false, resizable: false, filter: '',
	});

	sides.forEach((side, idx) => {
		if (Object.keys(data[0]).length < 6) {
			result.push({
				headerName: side?.name || '#' + (idx + 1),
				editable: true, sortable: false, resizable: true, filter: '',
				field: 'text' + (idx),
			});
		}

		if (Object.keys(data[0]).length >= 6) {
			result.push({
				headerName: side?.name || '#' + (idx + 1),
				editable: false, sortable: false, resizable: false, filter: '',
				children: [
					{
						headerName: 'Header',
						editable: true,
						sortable: false,
						resizable: true,
						filter: '',
						field: 'header' + (idx)
					},
					{
						headerName: 'Text',
						editable: true,
						sortable: false,
						resizable: true,
						filter: '',
						field: 'text' + (idx)
					},
					{
						headerName: 'Footer',
						editable: true,
						sortable: false,
						resizable: true,
						filter: '',
						field: 'footer' + (idx)
					}
				]
			});
		}
	});

	return result;
}

export type TImportedData = {
	text0: string
	text1: string
	header0?: string
	header1?: string
	footer0?: string
	footer1?: string

	_checked?: boolean
	_num?: number
}

export type TPreviewDialogProps = {
	isOpen: boolean
	setIsOpen: (state: boolean) => void
	handleProcess: (data?: Array<TImportedData>) => void
	data: Array<TImportedData>
	sides?: Array<TCollectionSide>
}

export const ImportPreviewDialog: React.FC<TPreviewDialogProps> = ({isOpen, setIsOpen, handleProcess, data, sides}) => {
	const gridRef = useRef<any>(); // Optional - for accessing Grid's API
	const [columnDefs, setColumnDefs] = useState(null);
	const [localData, setLocalData] = useState<Array<TImportedData>>();

	const [selectionLength, setSelectionLength] = useState(0);
	const handleSelection = useCallback(() => {
		setSelectionLength(() => localData?.filter(d => d._checked).length || 0);
	}, [localData]);

	useEffect(() => {
		if (!data || !data.length) {
			setLocalData(void 0);
			setColumnDefs(null);
			setSelectionLength(0);

			return;
		}

		setLocalData(() => data);
		setColumnDefs(getTableDefs(data, sides || [{name: '#1'}, {name: '#2'}]));
		setSelectionLength(data?.length || 0);
	}, [data]);

	const doImport = useCallback(() => {
		gridRef.current.api.stopEditing();
		handleProcess(localData?.filter?.((d:any) => d._checked));
	}, [localData]);

	return <Modal
		open={isOpen}
		type={Object.keys(data?.[0] || {}).length < 6 ? 'normal' : 'wide'}
		onClose={() => setIsOpen(false)}
		title={'Import data'}
		body={<>
			<p className={'inform'}>
				Tip: the data is editable. You can also select/deselect entries and change values.
			</p>
			<div className={'data-preview'}>
				<div className="ag-theme-alpine">
					<AgGridReact
						ref={gridRef}
						domLayout={'autoHeight'}
						rowData={localData}
						columnDefs={columnDefs as any}
						animateRows={false}
						rowSelection={'single'}
						enableCellEditingOnBackspace={true}
						onCellValueChanged={handleSelection}
						// onGridReady={handleReady}
						enterNavigatesVertically={true}
						enterNavigatesVerticallyAfterEdit={true}
					/>
				</div>

			</div>
		</>}
		actions={<>
			<Button type={'secondary'} onClick={() => setIsOpen(false)} icon={<FaArrowLeft/>}>Cancel (Esc)</Button>
			<Button
				disabled={selectionLength === 0}
				type={'primary'} icon={<FaTrashCan/>}
				onClick={doImport}>Import ({selectionLength})</Button>
		</>}
	/>
}
