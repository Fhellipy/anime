export const POST = async (request: Request) => {
	const response = JSON.stringify({
		message: "ok",
	});

	const json = await request.json();

	if (!(typeof json.token === "string")) {
		return new Response(
			JSON.stringify({
				error: "Não autorizado!",
			}),
			{ status: 401 }
		);
	}

	const authCookie = `token=${json.token};Path=/;Max-Age=${
		3600 * 1000 * 8
	}`;

	return new Response(response, {
		headers: {
			"Set-Cookie": authCookie,
		},
	});
};
