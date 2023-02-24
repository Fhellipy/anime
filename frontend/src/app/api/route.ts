export const POST = async (request: Request) => {
	const response = JSON.stringify({
		message: "ok",
	});

	return new Response(response, {
		headers: {
			"Set-Cookie": `isLoggedIn=true;Path=/;Max-Age=${60 * 60 * 1000 * 8}`,
		},
	});
};
