import ReactDOM from 'react-dom/client';
import "./styles.scss";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AppRoutes} from "./routes.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			notifyOnChangeProps: 'all',
		},
	}
});

(window as any)['__queryClient'] = queryClient;

const router = createBrowserRouter(AppRoutes);
ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router}/>
	</QueryClientProvider>);
