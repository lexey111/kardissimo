import React, {useCallback} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {PageHeader} from "../components/utils/page-header.component.tsx";
import {KardissimoScene} from "../components/presentation/kardissimo-scene.tsx";
import {Button} from "../components/utils/button.component.tsx";
import {useNavigate} from "react-router-dom";
import {IAuthState, useAuthStore} from "../store/auth/auth-store.ts";

const userSelector = (state: IAuthState) => state;

export const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const user = useAuthStore(userSelector);

	const handleLogin = useCallback(() => {
		navigate('/login');
	}, []);

	const loggedIn = user.loginData.id && !user.fetching;

	return <AppPage title={'Kardissimo'} authOnly={false}>
		<div className={'jumbo-logo'}>
			<KardissimoScene/>
		</div>

		<PageHeader
			title={'Home'}
			subtitle={'Welcome here! How do you do?'}
		/>
		<div className={'page-32'}>

			{!loggedIn && <>
				<Button type={'danger'} onClick={handleLogin}>Login</Button>
			</>}

			<p>
				To do that, fill two or six columns in spreadsheet, select values and copy to clipboard with
				<kbd>Ctrl-C</kbd> or <kbd>⌘-C</kbd> (Mac).
			</p>
			<p className={'inform'}>
				Tip: the data is editable. You can also select/deselect entries and change values.
			</p>

			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, adipisci cum dolore exercitationem
				inventore minus quaerat quam quis tempora voluptate. Et nostrum perferendis tempora temporibus? Corporis
				illum magni provident quidem.</p>
		</div>
	</AppPage>;
};
