"use client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Profile = {
	id: string;
	username: string;
	email: string;
};

function isProfile(data: unknown): data is Profile {
	if (typeof data !== "object") return false;
	if (data === null) return false;
	if (!data.hasOwnProperty("id")) return false;
	return true;
}

export async function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value;

	if (!token) {
		const url = req.nextUrl.clone();
		url.pathname = "/login";

		return NextResponse.redirect(url);
	}

	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_API_URL + "/auth/profile",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const json = await response.json();

		if (!isProfile(json)) throw new Error("Invalid profile");
	} catch (error) {
		console.log(error);
		const url = req.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/home", "/configuration", "/anime/:path*"],
};
