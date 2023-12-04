import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Outlet} from "react-router-dom";
import {useExclusiveHook} from "../hooks/useExclusive.hook.tsx";
import {CardboxHeader} from "./cardbox/cardbox-header.component.tsx";

export const CardboxPages: React.FC = () => {
	useExclusiveHook();

	// mostly - guard
	return <>
		<CardboxHeader/>
		<AppPage title={'Card Box'}>
			<Outlet/>
		</AppPage>
	</>;
};
