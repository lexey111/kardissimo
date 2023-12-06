import React from "react";
import {CardImport} from "./card-import.component.tsx";
import {BigAddButton} from "../../../../components/utils/big-add-button.component.tsx";
import {FaRegClipboard} from "react-icons/fa";
import {PiFileCsvBold} from "react-icons/pi";
import {CardImportHelp} from "./card-import-help.component.tsx";
import {publish} from "../../../../subscribe.ts";

export type TCardListNoDataProps = {
	onCreate: () => void
}

export const CardsNoData: React.FC<TCardListNoDataProps> = ({onCreate}) => {
	return <div className={'margin-center empty-list'}>
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
			<div>
				<h3>Import from .CSV</h3>
				<div className={'add-button-container'}>
					<BigAddButton
						onClick={() => publish('cards-import-csv', null)}
						icon={<PiFileCsvBold/>}/>
				</div>
				<h4>Read below how it works</h4>
			</div>
		</div>

		<CardImportHelp/>
		<CardImport/>
	</div>;
};
