import {AppPageError} from "../app-page-error.component.tsx";
import {NavLink} from "react-router-dom";
import React from "react";

export type TPageNotFoundProps = {
	message?: string
	header?: string;
	goCollections?: boolean
}

export const PageNotFound: React.FC<TPageNotFoundProps> = ({header, message, goCollections = true}) => {
	return <AppPageError title={header || 'Page Not Found error'}
	                     subtitle={message || 'Sorry for that.'}
	                     back={(goCollections ? <NavLink to={'/collections'}>
			                     &larr; Go to Collections
		                     </NavLink>
		                     : void 0)
	                     }
	/>;
};
