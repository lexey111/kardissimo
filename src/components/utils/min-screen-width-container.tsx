import React from "react";
import {useScreenSize} from "../../hooks/useScreenSize.hook.tsx";

export type TMinScreenWidthContainerProps = {
	minScreenWidth?: number
	children?: any
}

export const MinScreenWidthContainer: React.FC<TMinScreenWidthContainerProps> = ({minScreenWidth = 1000, children}) => {
	const {show} = useScreenSize(minScreenWidth);

	if (!show) {
		return null;
	}

	return children;
}
