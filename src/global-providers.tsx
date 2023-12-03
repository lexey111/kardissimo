import React, {useLayoutEffect, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppRoutes} from "./routes.tsx";
import {Appearances} from "./resources/appearance.ts";
import {assignGlobalStyles} from "./store/settings/settings-utils.ts";
import {queryClient} from "./store/query-client.ts";
import {useAuthQuery} from "./store/auth/hooks/useAuthHook.ts";
import {WaitGlobal} from "./components/utils/wait-global.component.tsx";

const router = createBrowserRouter(AppRoutes);

let lastTheme = localStorage.getItem('lastUsedTheme');
if (!lastTheme || !Appearances.find(ap => ap.id === lastTheme)) {
	lastTheme = 'default';
}
assignGlobalStyles(lastTheme);

const invalidateAuthRequests = async (cb: any) => {
	await queryClient.invalidateQueries({queryKey: ['auth']});
	await queryClient.invalidateQueries({queryKey: ['settings']});
	await queryClient.refetchQueries({queryKey: ['auth']});

	cb();
}

export const GlobalProviders: React.FC = () => {
	const [ready, setReady] = useState(false);

	const {isLoading: userLoading} = useAuthQuery();

	useLayoutEffect(() => {
		void invalidateAuthRequests(() => {
			setReady(true);
		});
	}, [setReady]);

	if (!ready || userLoading) {
		return <WaitGlobal/>;
	}

	return <RouterProvider router={router}/>
}
