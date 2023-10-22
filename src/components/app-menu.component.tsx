import React from "react";
import {NavLink, useParams} from "react-router-dom";
import {countCollections} from "../store/data/collections-store.selectors.ts";

export const AppMenu: React.FC = () => {
	const params = useParams();
	const count = countCollections();

	if (params.collectionId) {
		return null; // in collection, exclusive mode
	}

	return <nav id='app-menu'>
		<ul>
			<li>
				<NavLink to="/home">Home</NavLink>
			</li>
			<li>
				<NavLink to="/collections">Collections {count > 0 &&
					<span className={'badge badge-white'}>{count}</span>}</NavLink>
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
