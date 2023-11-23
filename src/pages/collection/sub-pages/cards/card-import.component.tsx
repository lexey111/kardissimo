import React, {useCallback, useEffect, useRef, useState} from "react";
import {Button} from "../../../../components/utils/button.component.tsx";
import {toast} from "react-toastify";
import {getCollection} from "../../../../store/data/collections-store.selectors.ts";
import {useParams} from "react-router-dom";
import {FaArrowLeft, FaFileImport} from "react-icons/fa";
import {IoIosAddCircle} from "react-icons/io";
import {Modal} from "../../../../components/utils/modal-component.tsx";
import {FaTrashCan} from "react-icons/fa6";
import {AgGridReact} from "ag-grid-react";
import {TCollectionSide} from "../../../../store/data/types.ts";

export type TCardListNoDataProps = {
	collapsed?: boolean
};

function parseClipboard(str: string) {
	const parsedRows = str.split('\n');

	return parsedRows.map(rowStr => {
		let values = rowStr.split('\t');

		if (!values || !Array.isArray(values) || values.length === 0) {
			return undefined;
		}

		if (values.length !== 2 && values.length < 6) {
			values = rowStr.split(',');
		}

		if (values.length !== 2 && values.length < 6) {
			return undefined;
		}

		if (values.length === 2) {
			if (values[0].trim() === '' && values[1].trim() === '') {
				return undefined;
			}
			return {text0: values[0].trim(), text1: values[1].trim()};
		}

		if (values.length >= 6) {
			if (values[0].trim() === '' && values[1].trim() === '' && values[2].trim() === '' && values[3].trim() === '' && values[4].trim() === '' && values[5].trim() === '') {
				return undefined;
			}

			return {
				header0: values[0].trim(),
				text0: values[1].trim(),
				footer0: values[2].trim(),
				header1: values[3].trim(),
				text1: values[4].trim(),
				footer1: values[5].trim(),
			};
		}
		return undefined;
	}).filter(Boolean);
}

function getTableDefs(data: any, sides: Array<TCollectionSide>): any {
	const result: any = [];

	if (!data) {
		return result;
	}

	const checkboxColumn: any = {
		field: '_checkbox',
		headerName: '',
		width: 40,
		maxWidth: 40,
		minWidth: 40,
		editable: false, sortable: false, resizable: false, filter: '',
	};

	result.push(checkboxColumn);

	sides.forEach((side, idx) => {
		if (Object.keys(data[0]).length === 2) {
			result.push({
				headerName: side?.name || '#' + (idx + 1),
				editable: true, sortable: false, resizable: true, filter: '',
				field: 'text' + (idx),
			});
		}

		if (Object.keys(data[0]).length === 6) {
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

// @ts-ignore
const PreviewDialog: React.FC = ({isOpen, setIsOpen, handleProcess, data, sides}) => {
	const gridRef = useRef<any>(); // Optional - for accessing Grid's API
	const [columnDefs, setColumnDefs] = useState(getTableDefs(data, sides));

	useEffect(() => {
		setColumnDefs(getTableDefs(data, sides));
	}, [data]);

	return <Modal
		open={isOpen}
		type={Object.keys(data?.[0] || {}).length < 6 ? 'normal' : 'wide'}
		onClose={() => setIsOpen(false)}
		title={'Import data'}
		body={<>
			<p>
				Are you sure you want to import this data?
			</p>
			<div className={'data-preview'}>
				<div className="ag-theme-alpine">
					<AgGridReact
						ref={gridRef}
						domLayout={'autoHeight'}
						rowData={data}
						columnDefs={columnDefs as any}
						animateRows={false}
						rowSelection={'single'}
						enableCellEditingOnBackspace={true}
						// onGridReady={handleReady}
						enterNavigatesVertically={true}
						enterNavigatesVerticallyAfterEdit={true}
					/>
				</div>

			</div>
		</>}
		actions={<>
			<Button type={'secondary'} onClick={() => setIsOpen(false)} icon={<FaArrowLeft/>}>Cancel (Esc)</Button>
			<Button type={'primary'} icon={<FaTrashCan/>} onClick={handleProcess}>Import</Button>
		</>}
	/>
}

export const CardImport: React.FC<TCardListNoDataProps> = ({collapsed}) => {
	const params = useParams();
	const collection = getCollection(params.collectionId);

	const [isOpen, setIsOpen] = useState(false);
	const [importedData, setImportedData] = useState<any>(null);

	const handleImport = useCallback(async () => {
		setImportedData(null);
		const text = await navigator.clipboard.readText();
		const parsedData = parseClipboard(text);

		console.log('data', parsedData);

		if (parsedData.length > 0) {
			setImportedData(parsedData);
			setIsOpen(true);
		} else {
			toast('Sorry, cannot parse the clipboard content. Make sure you have 2 or 6 columns copied.', {type: 'error'})
		}

	}, [importedData]);

	const handleProcess = useCallback(() => {
		console.log('import!')
	}, [importedData]);

	if (!collection) {
		return null;
	}

	if (collapsed && (collection?.cards?.length || 0) === 0) {
		return null
	}

	if (collapsed) {
		return <div className={'action-row'}>
			<Button onClick={handleImport} icon={<FaFileImport/>} type={'ghost'}>Import...</Button>
		</div>;
	}

	return <div className={'cards-import'}>
		<span className={'arrow-up'}></span>
		<h1 className={'center'}>Collection is empty</h1>

		No cards to display, yet. Please, use the button <IoIosAddCircle/> above to create the first one.

		<h2 className={'center'}>Import</h2>

		<div className={'text'}>
			<img src="/import1.png" alt="Screenshot"/>
			<p>
				Also you can import from Google Spreadsheets via Clipboard.
			</p>
			<p>
				To do that, fill <b>two</b> (only texts) or <b>six</b> (header, text, footer) columns in
				spreadsheet, select values and copy to clipboard with
				<kbd>Ctrl/⌘</kbd>+<kbd>C</kbd>.
			</p>
			<p>
				Then click the button below (if the browser asks, allow access to the clipboard):
			</p>
		</div>

		<div>
			<Button onClick={handleImport} icon={<FaFileImport/>}>Import from Clipboard...</Button>
		</div>

		<PreviewDialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			handleProcess={handleProcess}
			sides={collection.sides}
			data={importedData}/>
	</div>;
};
