import React from "react";
import {NavLink, useParams} from "react-router-dom";

export const AppMenu: React.FC = () => {
	const params = useParams();
	if (params.collectionId) {
		return null; // in collection
	}

	return <nav id='app-menu'>
		<ul>
			<li>
				<NavLink to="/home">Home</NavLink>
			</li>
			<li>
				<NavLink to="/collections">Collections</NavLink>
			</li>
			<li>
				<NavLink to="/about">About</NavLink>
			</li>
			<li>
				<NavLink to="/scene">Scene</NavLink>
			</li>
		</ul>
	</nav>;
};
