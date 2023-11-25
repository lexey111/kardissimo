import React, {useCallback, useState} from "react";
import {Button} from "../../../../components/utils/button.component.tsx";
import {toast} from "react-toastify";
import {getCollection} from "../../../../store/data/collections-store.selectors.ts";
import {useParams} from "react-router-dom";
import {FaFileImport} from "react-icons/fa";
import {IoIosAddCircle} from "react-icons/io";
import {ImportPreviewDialog, TImportedData} from "./card-import-dialog.component.tsx";
import {createCard} from "../../../../store/data/collections-store.actions.ts";
import {customAlphabet, urlAlphabet} from "nanoid";
import {CSVFileUpload} from "./csv-upload.component.tsx";
import {ImportMenu} from "./card-import-menu.component.tsx";
import Papa from 'papaparse';

const nanoid = customAlphabet(urlAlphabet, 16);

export type TCardListNoDataProps = {
	collapsed?: boolean
};

function trimText64(str: string): string {
	const result = str.trim();
	return result.substring(0, 63);
}

function parseRawStrings(str: string) {
	const parsedRows = Papa.parse(str).data;
	let maxDataLength = 0;

	parsedRows.forEach((d: Array<any>) => {
		const meaningfull = d.filter(Boolean).length;
		if (maxDataLength < meaningfull) {
			maxDataLength = meaningfull
		}
	});

	return parsedRows?.map((values: any) => {
		if (!values || !Array.isArray(values)) {
			return undefined;
		}

		if (values.length < 2) {
			return undefined;
		}

		if (maxDataLength < 6) {
			if (!values[0] && !values[1]) {
				return undefined;
			}
			return {text0: trimText64(values[0]), text1: trimText64(values[1])};
		}

		if (values[0].trim() === '' && values[1].trim() === '' && values[2].trim() === '' && values[3].trim() === '' && values[4].trim() === '' && values[5].trim() === '') {
			return undefined;
		}

		return {
			header0: trimText64(values[0]),
			text0: trimText64(values[1]),
			footer0: trimText64(values[2]),
			header1: trimText64(values[3]),
			text1: trimText64(values[4]),
			footer1: trimText64(values[5]),
		};
	})
		.filter(Boolean)
		.map((data: any, idx: number) => ({_num: idx + 1, _checked: true, ...data}))
}

export const CardImport: React.FC<TCardListNoDataProps> = ({collapsed}) => {
	const params = useParams();
	const collection = getCollection(params.collectionId);

	const [isOpen, setIsOpen] = useState(false);
	const [importedData, setImportedData] = useState<any>(null);

	const handleImport = useCallback((text: string) => {
		setImportedData(null);
		const parsedData = parseRawStrings(text);

		if (parsedData.length > 0) {
			setImportedData(parsedData);
			setIsOpen(true);
		} else {
			toast('Sorry, cannot parse the clipboard content. Make sure you have 2 or 6 columns copied.', {type: 'error'})
		}

	}, [importedData]);

	const handleClipboardImport = useCallback(async () => {
		const text = await navigator.clipboard.readText();
		handleImport(text);
	}, [importedData]);

	const handleLoadCSV = useCallback((text: string) => {
		handleImport(text);

	}, []);

	const handleProcess = useCallback((data?: Array<TImportedData>, params?: any) => {
		setIsOpen(false);
		if (!data || data.length === 0) {
			toast('Sorry, nothing to import.', {type: 'error'})
			return;
		}
		if (!collection) {
			toast('Sorry, collection not found.', {type: 'error'})
			return;
		}

		if (params.mode === 'replace') {
			console.log('cleanup!');
		}
		console.log(data)
		let counter = 0;
		data.forEach(item => {
			if (params.mode === 'merge') {
				console.log('merge');
			}
			counter++;
			createCard(collection!.id, {
				id: nanoid(),
				sides: [
					{text: item.text0, header: item.header0, footer: item.footer0},
					{text: item.text1, header: item.header1, footer: item.footer1},
				]
			});
		});
		toast('Done. Cards imported: ' + counter, {type: 'info'})
	}, [collection]);

	if (!collection) {
		return null;
	}

	if (collapsed && (collection?.cards?.length || 0) === 0) {
		return null
	}

	if (collapsed) {
		return <div className={'action-row'}>
			<ImportMenu links={[
				<Button onClick={handleClipboardImport} icon={<FaFileImport/>} type={'ghost'}>Import from
					clipboard...</Button>,
				<CSVFileUpload handleFile={handleLoadCSV}/>
			]}/>

			<ImportPreviewDialog
				isOpen={isOpen}
				hasRecords={(collection.cards?.length || 0) > 0}
				setIsOpen={setIsOpen}
				handleProcess={handleProcess}
				sides={collection.sides}
				data={importedData}/>
		</div>;
	}

	return <div className={'cards-import'}>
		<span className={'arrow-up'}></span>
		<h1 className={'center'}>Collection is empty</h1>

		No cards to display, yet. Please, use the button <IoIosAddCircle/> above to create the first one.

		<h2 className={'right'}>Importing data from Clipboard</h2>

		<div className={'text'}>
			<img src="/import1.png" alt="Screenshot" className={'image-left'}/>
			<p>
				Also you can import from Google Sheets via Clipboard.
			</p>
			<p>
				To do that, fill <b>two</b> (only texts) or <b>six</b> (header, text, footer) columns in
				spreadsheet, select values and copy to clipboard with
				<kbd>Ctrl/⌘</kbd>+<kbd>C</kbd>.
			</p>
			<p>
				Then click the button below (if the browser asks, allow access to the clipboard):
			</p>
			<div className={'import-actions'}>
				<Button onClick={handleClipboardImport} icon={<FaFileImport/>}>Import from Clipboard...</Button>
			</div>
			<h2>Comma-separated values (CSV)</h2>
			<img src="/import2.png" alt="Screenshot" className={'image-right'}/>
			<p>
				However, you can store your data in a <kbd>.CSV</kbd> file and import them.
			</p>
			<p>
				To do that use any spreadsheet application, like Google Sheets or Microsoft Excel, to fill your data.
				Please use the same two- or six-columns structure as for Clipboard import.
			</p>
			<p>
				Then download or export the sheet in .CSV format.
			</p>
			<CSVFileUpload handleFile={handleLoadCSV}/>
		</div>


		<ImportPreviewDialog
			isOpen={isOpen}
			hasRecords={(collection.cards?.length || 0) > 0}
			setIsOpen={setIsOpen}
			handleProcess={handleProcess}
			sides={collection.sides}
			data={importedData}/>
	</div>;
};
