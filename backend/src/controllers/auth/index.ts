import prisma from "@database";
import { User } from "@dto/user";
import { authMiddleware } from "@middlewares/authMiddleware";
import { BadRequestError } from "@utils/apiError";
import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";

const Auth = Router();

Auth.post("/signin", async (req: Request, resp: Response) => {
	const { email, password } = req.body as User;

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		throw new BadRequestError("E-mail ou senha inválidos!");
	}

	const verifyPassword = await bcrypt.compare(password, user.password);

	if (!verifyPassword) {
		throw new BadRequestError("E-mail ou senha inválidos!");
	}

	const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
		expiresIn: "8h",
	});

	const { password: _, ...userLogin } = user;

	return resp.json({
		user: userLogin,
		token: token,
	});
});

Auth.get("/profile", authMiddleware, (req: Request, resp: Response) => {
	return resp.json(req.user);
});

export default Auth;
