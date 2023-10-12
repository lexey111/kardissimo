import {AppPageError} from "../app-page-error.component.tsx";
import {NavLink} from "react-router-dom";
import React from "react";

export type TCardNotFoundProps = {
	collectionId?: string
}

export const CardNotFound: React.FC<TCardNotFoundProps> = ({collectionId}) => {
	return <AppPageError title={'Card Not Found'}
	                     subtitle={'Sorry for that.'}
	                     back={<NavLink to={`/collections/${collectionId}/cards`}>
		                     &larr; Back to cards
	                     </NavLink>}
	/>;
};
