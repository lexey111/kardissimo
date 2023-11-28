import {Menu} from '@headlessui/react'
import React from "react";
import {FaFileImport} from "react-icons/fa";

export type TImportMenuProps = {
	children: any
};

export const ImportMenu: React.FC<TImportMenuProps> = ({children}) => {
	return <Menu>
		<Menu.Button className={'pure-button pure-button-ghost button-menu'}><FaFileImport/> Import...</Menu.Button>
		<Menu.Items className={'dropdown-menu'}>
			{children}
		</Menu.Items>
	</Menu>;
}
