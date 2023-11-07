import React, {useCallback} from "react";
import {NavLink} from "react-router-dom";
import {countCollections} from "../store/data/collections-store.selectors.ts";
import {FaCirclePlay} from "react-icons/fa6";
import {HiRectangleStack} from "react-icons/hi2";
import {AiFillHome} from "react-icons/ai";
import {ICollectionState, useCollectionStore} from "../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";
import {IAuthState, useAuthStore} from "../store/auth/auth-store.ts";
import {Button} from "./utils/button.component.tsx";
import {logout} from "../store/auth/auth-store.actions.ts";
import {UserAvatar} from "./utils/user-avatar.component.tsx";

const readySelector = (state: ICollectionState) => state.collections.filter(c => c.cards && c.cards?.length > 0).length;
const userSelector = (state: IAuthState) => state;

export const AppMenu: React.FC = () => {
	const count = countCollections();
	const readyCollections = useCollectionStore(useShallow(readySelector));
	const user = useAuthStore(userSelector);

	const handleLogout = useCallback(() => {
		void logout();
	}, []);

	const loggedIn = user.loginData.id && !user.fetching;

	return <nav id='app-menu'>
		<div className={'app-menu-content'}>
			<ul>
				<li>
					<NavLink to="/home">
						<AiFillHome/>
						Home
					</NavLink>
				</li>

				{loggedIn && <>
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
				</>}

				{!loggedIn && <li>
					<NavLink to="/login">Login</NavLink>
				</li>}
			</ul>

			{loggedIn && <div className={'user-avatar'} tabIndex={0}>
				<UserAvatar src={user.loginData.avatar} name={user.loginData.name} />

				<div className={'actions'}>
					<p>
						Logged in as <b>{user.loginData.name}</b>
					</p>
					<Button type={'danger'} onClick={handleLogout}>Log out</Button>
				</div>
			</div>}
		</div>
	</nav>;
};
