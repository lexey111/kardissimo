import {QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// notifyOnChangeProps: 'all',
			staleTime: Infinity,
			// cacheTime: 1000 * 60 * 5, // 5 minutes
			// refetchOnWindowFocus: true,
			// refetchOnMount: true,
			// refetchOnReconnect: true,
			// retry: false,
		},
	}
});
