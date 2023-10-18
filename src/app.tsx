import React from "react";
import {useRoutes} from "react-router";
import {useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import {AppRoutes} from "./routes.tsx";

export const App: React.FC = () => {
	const element = useRoutes(AppRoutes);

	const location = useLocation();
	if (!element) return null;

	return (
		<AnimatePresence mode='wait' initial={false}>
			{React.cloneElement(element, {key: location.pathname})}
		</AnimatePresence>
	);
};
