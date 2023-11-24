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

const nanoid = customAlphabet(urlAlphabet, 16);

export type TCardListNoDataProps = {
	collapsed?: boolean
};

function parseClipboard(str: string) {
	const parsedRows = str.split('\n');

	return parsedRows.map(rowStr => {
		let values = rowStr.split('\t').filter(Boolean);

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
	})
		.filter(Boolean)
		.map((data, idx) => ({_num: idx + 1, _checked: true, ...data}))
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

		if (parsedData.length > 0) {
			setImportedData(parsedData);
			setIsOpen(true);
		} else {
			toast('Sorry, cannot parse the clipboard content. Make sure you have 2 or 6 columns copied.', {type: 'error'})
		}

	}, [importedData]);

	const handleProcess = useCallback((data?: Array<TImportedData>) => {
		setIsOpen(false);
		if (!data || data.length === 0) {
			toast('Sorry, nothing to import.', {type: 'error'})
			return;
		}
		data.forEach(item => {
			createCard(params.collectionId, {
				id: nanoid(),
				sides: [
					{text: item.text0, header: item.header0, footer: item.footer0},
					{text: item.text1, header: item.header1, footer: item.footer1},
				]
			});
		});
		toast('Done. Cards imported: ' + data.length, {type: 'info'})
	}, []);

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

		<ImportPreviewDialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			handleProcess={handleProcess}
			sides={collection.sides}
			data={importedData}/>
	</div>;
};
