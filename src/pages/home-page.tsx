import React, {useCallback, useEffect} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {PageHeader} from "../components/utils/page-header.component.tsx";
import {KardissimoScene} from "../components/presentation/kardissimo-scene.tsx";
import {Button} from "../components/utils/button.component.tsx";
import {useNavigate} from "react-router-dom";
import {useSettingsQuery} from "../store/settings/hooks/useSettingsHook.tsx";
import {assignGlobalStyles} from "../store/settings/settings-utils.ts";
import {defaultAppState} from "../store/settings/settings-types.ts";
import {useAuthQuery} from "../store/auth/hooks/useAuthHook.ts";

export const HomePage: React.FC = () => {
	const navigate = useNavigate();

	const handleLogin = useCallback(() => {
		navigate('/login');
	}, []);

	const {isLoading: userLoading, data: userData} = useAuthQuery();
	const {isLoading: settingsLoading, error: settingsError, data: settingsData} = useSettingsQuery();

	const loggedIn = !userLoading && !!userData?.id;

	useEffect(() => {
		if (!settingsData || !loggedIn) {
			return;
		}
		console.log('-------------------', settingsData)
		assignGlobalStyles(settingsData?.currentAppearance || defaultAppState.currentAppearance);
	}, [settingsData]);

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
			<p>User</p>
			<pre>{userLoading ? 'user loading' : 'user ready'}</pre>
			<pre>{JSON.stringify(userData, null, 2)}</pre>

			<h2>Settings</h2>
			<p>Data</p>
			<pre>{JSON.stringify(settingsData, null, 2)}</pre>
			<p>isFetching</p>
			<pre>{settingsLoading ? 'settings loading' : 'settings ready'}</pre>
			<p>Error</p>
			<pre>{JSON.stringify(settingsError, null, 2)}</pre>

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
