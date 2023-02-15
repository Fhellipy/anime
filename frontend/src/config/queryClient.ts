import { fetchApi } from '@lib/api';
import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			queryFn: async ({ queryKey: [url, params] }) => {
				if (typeof url === 'string') {
					let stringParams = '';
					if (params as Record<string, unknown>) {
						stringParams =
							'?' +
							Object.entries(params as Record<string, unknown>)
								.map(([index, value]) => {
									return `${index}=${value}`;
								})
								.reduce((a, b) => {
									return `${a}&${b}`;
								});
					}
					const response = await fetchApi(
						`/${url.toLowerCase()}${stringParams}`
					);
					return response.json();
				}
				throw new Error('Invalid QueryKey');
			},
		},
	},
});

export { queryClient };
