import ReactDOM from 'react-dom/client';
import "./styles.scss";
import {QueryClientProvider} from "@tanstack/react-query";
import {GlobalProviders} from "./global-providers.tsx";
import {queryClient} from "./query-client.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<GlobalProviders/>
	</QueryClientProvider>);
