import React, {useCallback} from "react";
import {CardsImport} from "./import/cards-import.component.tsx";
import {BigAddButton} from "../../../components/utils/big-add-button.component.tsx";
import {FaRegClipboard} from "react-icons/fa";
import {PiFileCsvBold} from "react-icons/pi";
import {CardsImportHelp} from "./import/cards-import-help.component.tsx";
import {publish} from "../../../subscribe.ts";

export type TCardListNoDataProps = {
	cardboxId: number
	onCreate: () => void
}

export const CardsNoData: React.FC<TCardListNoDataProps> = ({onCreate, cardboxId}) => {
	const [dragActive, setDragActive] = React.useState(false);

	const handleDrag = useCallback((e: any) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	}, [setDragActive]);

	const handleDrop = useCallback((e: any) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			publish('cards-import-drop', e.dataTransfer.files[0]);
		}
	}, []);

	return <div className={'page-32'}>
		<div className={'three-column-import'}>
			<div>
				<h3>Create first card</h3>
				<div className={'add-button-container'}>
					<BigAddButton
						onClick={onCreate}/>
				</div>
				<h4>Just click this button</h4>
			</div>
			<div>
				<h3>Import from clipboard</h3>
				<div className={'add-button-container'}>
					<BigAddButton
						onClick={() => publish('cards-import-clipboard', null)}
						icon={<FaRegClipboard/>}/>
				</div>
				<h4>Read below how it works</h4>
			</div>
			<div
				onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
				className={dragActive ? 'drag-active' : ''}>
				<h3>Import from .CSV</h3>
				<div className={'add-button-container'}>
					<BigAddButton
						onClick={() => publish('cards-import-csv', null)}
						icon={<PiFileCsvBold/>}/>
				</div>
				<h4>Click or drag-n-drop a .CSV file</h4>
			</div>
		</div>

		<CardsImportHelp/>

		<CardsImport cardboxId={cardboxId}/>
	</div>;
};
