import prisma from "@database";
import { UnauthorizedError } from "@utils/apiError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
	id: string;
};

export const authMiddleware = async (
	req: Request,
	resp: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers;

	if (!authorization) {
		throw new UnauthorizedError("Não autorizado!");
	}

	const token = authorization.split(" ")[1];

	const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

	const user = await prisma.user.findUnique({ where: { id } });

	if (!user) {
		throw new UnauthorizedError("Não autorizado!");
	}

	const { password: _, ...loggedUser } = user;

	req.user = loggedUser;

	next();
};
