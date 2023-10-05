import React from "react";
import {NavLink} from "react-router-dom";

export const AppMenu: React.FC = () => {
	return <nav id='app-menu'>
		<ul>
			<li>
				<NavLink to="/">Home</NavLink>
			</li>
			<li>
				<NavLink to="/about">About</NavLink>
			</li>
			<li>
				<NavLink to="/scene">App</NavLink>
			</li>
		</ul>
	</nav>;
};
