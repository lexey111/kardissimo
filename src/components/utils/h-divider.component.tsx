import React from "react";

export type THDividerProps = {
	width?: any
}
export const HDivider: React.FC<THDividerProps> = ({width = '1rem'}) => {
	return <span style={{width: width}}></span>;
}
