import {Menu} from '@headlessui/react'
import React from "react";
import {FaFileImport} from "react-icons/fa";

export type TImportMenuProps = {
	links: Array<any>
};

export const ImportMenu: React.FC<TImportMenuProps> = ({links}) => {
	return <Menu>
		<Menu.Button className={'pure-button pure-button-ghost button-menu'}><FaFileImport/> Import...</Menu.Button>
		<Menu.Items className={'dropdown-menu'}>
			{links.map(l => {
				return <Menu.Item>
					{l}
				</Menu.Item>;
			})}
		</Menu.Items>
	</Menu>;
}
