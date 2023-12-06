import React, {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {ImportPreviewDialog, TImportedData} from "./card-import-dialog.component.tsx";
import {
	createCard,
	isCardExists,
	removeAllCards,
	updateCardboxStat
} from "../../../../store/data/cardboxes-store.actions.ts";
import {customAlphabet, urlAlphabet} from "nanoid";
import {CSVFileUpload} from "./csv-upload.component.tsx";
import Papa from 'papaparse';
import {useCardbox} from "../../../../store/cardboxes/hooks/useCardboxHook.tsx";
import {WaitInline} from "../../../../components/utils/wait-inline.component.tsx";
import {subscribe, unsubscribe} from "../../../../subscribe.ts";

const nanoid = customAlphabet(urlAlphabet, 16);

function trimText64(str: string): string {
	const result = str.trim();
	return result.substring(0, 63);
}

function parseRawStrings(str: string) {
	const parsedRows = Papa.parse(str).data;
	let maxDataLength = 0;

	parsedRows.forEach((d: any) => {
		const meaningful = d.filter(Boolean).length;
		if (maxDataLength < meaningful) {
			maxDataLength = meaningful
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

export const CardImport: React.FC = () => {
	const params = useParams();
	const cardboxId = isNaN(parseInt(params.cardboxId || '', 10)) ? -1 : parseInt(params.cardboxId || '', 10);

	const {data: cardbox, error: cardboxError, isLoading: isCardboxLoading} = useCardbox(cardboxId);

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

	useEffect(() => {
		subscribe('cards-import-clipboard', handleClipboardImport);

		return () => {
			unsubscribe('cards-import-clipboard', handleClipboardImport);
		}
	}, [handleClipboardImport, handleLoadCSV]);


	const handleProcess = useCallback((data?: Array<TImportedData>, params?: any) => {
		setIsOpen(false);
		if (!data || data.length === 0) {
			toast('Sorry, nothing to import.', {type: 'error'})
			return;
		}
		if (!cardbox) {
			toast('Sorry, cardbox not found.', {type: 'error'})
			return;
		}

		if (params.mode === 'replace') {
			removeAllCards(cardboxId);
		}

		let counter = 0;
		data.forEach(item => {
			if (params.mode === 'merge') {
				if (isCardExists(cardboxId, item.text0)) {
					return;
				}
			}

			counter++;

			createCard(cardboxId, {
				id: nanoid(),
				sides: [
					{text: item.text0, header: item.header0, footer: item.footer0},
					{text: item.text1, header: item.header1, footer: item.footer1},
				]
			});
		});

		updateCardboxStat(cardboxId);
		toast('Done. Cards imported: ' + counter, {type: 'info'});
	}, [cardbox]);

	if (isCardboxLoading) {
		return <WaitInline text={'Loading data...'}/>;
	}

	if (cardboxError || !cardbox) {
		return null;
	}

	return <>
		<ImportPreviewDialog
			isOpen={isOpen}
			hasRecords={cardbox.cards_count > 0}
			setIsOpen={setIsOpen}
			handleProcess={handleProcess}
			sides={[cardbox.side1title, cardbox.side2title]}
			data={importedData}/>
		<CSVFileUpload handleFile={handleLoadCSV} showButton={false}/>
	</>;
};
