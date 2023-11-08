import React, {useCallback} from "react";
import {NavLink, useNavigate} from "react-router-dom";
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
import {CgSpinner} from "react-icons/cg";

const readySelector = (state: ICollectionState) => state.collections.filter(c => c.cards && c.cards?.length > 0).length;
const userSelector = (state: IAuthState) => state;

export const AppMenu: React.FC = () => {
	const navigate = useNavigate();
	const count = countCollections();
	const readyCollections = useCollectionStore(useShallow(readySelector));
	const user = useAuthStore(userSelector);

	const handleLogout = useCallback(() => {
		void logout();
	}, []);

	const handleLogin = useCallback(() => {
		navigate('/login');
	}, []);

	const loggedIn = user.loginData.id && !user.fetching;
	if (user.fetching) {
		return <nav id='app-menu'>
			<div className={'app-menu-content'}>
				<div className={'spin'}><CgSpinner/></div>
			</div>
		</nav>;
	}

	return <nav id='app-menu'>
		<div className={'app-menu-content'}>
			<ul>
				<li className={'icon-only'}>
					<NavLink to="/home">
						<AiFillHome/>
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

				{!loggedIn && <li className={'login'}>
					Please <Button type={'danger'} onClick={handleLogin}>Login</Button> here.
				</li>}
			</ul>

			{loggedIn && <div className={'user-avatar'} tabIndex={0}>
				<UserAvatar src={user.loginData.avatar} name={user.loginData.name}/>

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
