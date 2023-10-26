import React from "react";
import {NavLink} from "react-router-dom";
import {countCollections} from "../store/data/collections-store.selectors.ts";
import {FaCirclePlay} from "react-icons/fa6";
import {HiRectangleStack} from "react-icons/hi2";
import {AiFillHome} from "react-icons/ai";
import {ICollectionState, useCollectionStore} from "../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";

const readySelector = (state: ICollectionState) => state.collections.filter(c => c.cards && c.cards?.length > 0).length;

export const AppMenu: React.FC = () => {
	const count = countCollections();
	const readyCollections = useCollectionStore(useShallow(readySelector));

	return <nav id='app-menu'>
		<ul>
			<li>
				<NavLink to="/home">
					<AiFillHome/>
					Home
				</NavLink>
			</li>
			{readyCollections > 0 && <li>
				<NavLink to="/run"><FaCirclePlay/> Run</NavLink>
			</li>}
			<li>
				<NavLink to="/collections"><HiRectangleStack/>
					Collections {count > 0 &&
						<span className={'badge badge-white'}>{count}</span>}</NavLink>
			</li>
			<li>
				<NavLink to="/about">About</NavLink>
			</li>
		</ul>
	</nav>;
};
