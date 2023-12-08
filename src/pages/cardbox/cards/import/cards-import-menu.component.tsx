import {Menu} from '@headlessui/react'
import React from "react";
import {FaFileImport, FaRegClipboard} from "react-icons/fa";
import {publish} from "../../../../subscribe.ts";
import {PiFileCsvBold} from "react-icons/pi";

export const CardsImportMenu: React.FC = () => {
	return <Menu>
		<Menu.Button className={'pure-button pure-button-ghost button-menu'}><FaFileImport/> Import...</Menu.Button>
		<Menu.Items className={'dropdown-menu'}>
			<Menu.Item>
				<a href="#" onClick={() => publish('cards-import-clipboard', null)}>
					<FaRegClipboard/> Import from clipboard...
				</a>
			</Menu.Item>
			<Menu.Item>
				<a href="#" onClick={() => publish('cards-import-csv', null)}>
					<PiFileCsvBold/> Import from .CSV file...
				</a>
			</Menu.Item>
		</Menu.Items>
	</Menu>;
}
