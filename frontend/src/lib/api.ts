import { API_URL, TOKEN_KEY } from '@config/env/api';
import "cross-fetch/polyfill";
class ApiError extends Error {
	code: number;
	constructor(
		code: number,
		message?: string | undefined,
		options?: ErrorOptions | undefined
	) {
		super(message, options);
		this.code = code;
	}
}

async function fetchApi(
	input: string,
	init?: RequestInit | undefined
): Promise<Response> {
	const token = localStorage.getItem(TOKEN_KEY);

	const response = await fetch(API_URL + input, {
		...init,
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			...init?.headers,
		},
	});

	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		const { message } = (await response.json()) as { message: string };

		throw new ApiError(response.status, `${message}`);
	}
}

export { fetchApi, ApiError };
