import { TOKEN_KEY } from "@config/env/api";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	const session = await getToken({ req, secret: TOKEN_KEY });

	if (!session) {
		const url = req.nextUrl.clone();
		url.pathname = "/login";

		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/home", "/configuration"],
};
