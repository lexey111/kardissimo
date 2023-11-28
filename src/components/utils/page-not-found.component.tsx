import {AppPageError} from "../app-page-error.component.tsx";
import {NavLink} from "react-router-dom";
import React from "react";

export type TPageNotFoundProps = {
	message?: string
	header?: string;
	goCardboxes?: boolean
}

export const PageNotFound: React.FC<TPageNotFoundProps> = ({header, message, goCardboxes = true}) => {
	return <AppPageError
		title={header || 'Page Not Found error'}
		subtitle={message || 'Sorry for that.'}
		back={(goCardboxes ? <NavLink to={'/cardboxes'}>
				&larr; Go to Cardboxes
			</NavLink>
			: void 0)
		}
	/>;
};
