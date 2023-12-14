import React, {useCallback, useState} from "react";
import {toast} from "react-toastify";
import {CardsImportDialog, TImportedData} from "./cards-import-dialog.component.tsx";
import {CSVFileUpload} from "./csv-file-upload.component.tsx";
import Papa from 'papaparse';
import {useCardbox} from "../../../../store/cardboxes/hooks/useCardboxHook.tsx";
import {useSubscribe} from "../../../../subscribe.ts";
import {useCards} from "../../../../store/cards/hooks/useCardsHook.tsx";
import {TSCard} from "../../../../store/cards/types-card.ts";
import {useCardUpdate} from "../../../../store/cards/hooks/useCardUpdateHook.tsx";
import {getDefaultSCard} from "../../../../store/cards/cards-utils.ts";
import {useCardsForceRefresh} from "../../../../store/cards/hooks/useCardsRefresh.tsx";
import {useCardDeleteAll} from "../../../../store/cards/hooks/useCardDeleteAllHook.tsx";
import {WaitGlobal} from "../../../../components/utils/wait-global.component.tsx";

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
		.map((data: any, idx: number) => ({_num: idx + 1, ...data}))
}

function isCardExists(cards?: Array<TSCard>, text?: string) {
	if (!cards || !text) {
		return false;
	}
	const searchValue = (text || '').toLocaleUpperCase();
	return cards.find(card => card.side1text.toLocaleUpperCase() === searchValue);
}

export type TCardImportProps = {
	cardboxId: number
}

export const CardsImport: React.FC<TCardImportProps> = ({cardboxId}) => {

	const {data: cardbox, error: cardboxError, isLoading: isCardboxLoading} = useCardbox(cardboxId);
	const {data: cards, isLoading: isCardsLoading} = useCards(cardboxId);

	const cardMutation = useCardUpdate(cardboxId, false);
	const cardsRemoveAllMutation = useCardDeleteAll(cardboxId);
	const forceCardsRefresh = useCardsForceRefresh(cardboxId);

	const [isOpen, setIsOpen] = useState(false);
	const [importedData, setImportedData] = useState<any>(null);

	const [importString, setImportString] = useState('');

	const handleImport = useCallback((text: string) => {
		setImportedData(null);
		let parsedData: any = null;
		try {
			parsedData = parseRawStrings(text);
		} catch {
			toast('Sorry, cannot parse content.', {type: 'error'})
			return; // !
		}

		if (!parsedData || parsedData?.length > 0) {
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

	useSubscribe('cards-import-clipboard', handleClipboardImport);

	const handleProcess = useCallback(async (data?: Array<TImportedData>, params?: any) => {
		setIsOpen(false);
		if (!data || data.length === 0) {
			toast('Sorry, nothing to import.', {type: 'error'})
			return;
		}

		if (!cardbox) {
			toast('Sorry, Card box not found.', {type: 'error'})
			return;
		}

		setImportString('Importing data...');

		let maxIndex = cards!.reduce((prev, current) => Math.max(prev, current.cards_order), 0);

		if (params.mode === 'replace') {
			await cardsRemoveAllMutation.mutateAsync();
			maxIndex = 0;
		}

		let counter = 0;
		await Promise.all(data.map(item => {
			if (params.mode === 'merge') {
				if (isCardExists(cards, item.text0)) {
					return Promise.resolve();
				}
			}

			counter++;
			maxIndex++;
			setImportString(`Importing data (${counter} / ${data.length})...`);

			return cardMutation.mutateAsync({
				...getDefaultSCard(cardboxId),
				side1text: item.text0 || '',
				side1header: item.header0 || '',
				side1footer: item.footer0 || '',
				side2text: item.text1 || '',
				side2header: item.header1 || '',
				side2footer: item.footer1 || '',
				cards_order: maxIndex
			});
		}));

		setTimeout(() => {
			forceCardsRefresh();
			setImportString('');
		}, 100);

		toast('Done. Imported card(s): ' + counter, {type: 'info'});
	}, [cardbox, cards, setImportString]);

	if (isCardboxLoading || isCardsLoading) {
		return null;
	}

	if (cardboxError || !cardbox || !cards) {
		return null;
	}
	return <>
		{importString && <WaitGlobal text={importString}/>}
		<CardsImportDialog
			isOpen={isOpen}
			hasRecords={cardbox.cards_count > 0}
			setIsOpen={setIsOpen}
			handleProcess={handleProcess}
			sides={[cardbox.side1title, cardbox.side2title]}
			data={importedData}/>
		<CSVFileUpload handleFile={handleLoadCSV} showButton={false}/>
	</>;
};
