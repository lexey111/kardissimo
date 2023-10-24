import React from "react";
import {NavLink} from "react-router-dom";
import {countCollections} from "../store/data/collections-store.selectors.ts";
import {FaCirclePlay} from "react-icons/fa6";

export const AppMenu: React.FC = () => {
	const count = countCollections();

	return <nav id='app-menu'>
		<ul>
			<li>
				<NavLink to="/home">Home</NavLink>
			</li>
			{count > 0 && <li>
				<NavLink to="/run"><FaCirclePlay/> Run</NavLink>
			</li>}
			<li>
				<NavLink to="/collections">Collections {count > 0 &&
					<span className={'badge badge-white'}>{count}</span>}</NavLink>
			</li>
			<li>
				<NavLink to="/about">About</NavLink>
			</li>
		</ul>
	</nav>;
};
