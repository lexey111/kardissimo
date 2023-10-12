import {AppPageError} from "../app-page-error.component.tsx";
import {NavLink} from "react-router-dom";
import React from "react";

export const CollectionNotFound: React.FC = () => {
	return <AppPageError title={'Collection Not Found'}
	                     subtitle={'Sorry for that.'}
	                     back={<NavLink to={'/collections'}>
		                     &larr; Back to collections
	                     </NavLink>}
	/>;
};
