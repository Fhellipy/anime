import prisma from "@database";
import { User as UserType } from "@dto/user";
import { BadRequestError } from "@utils/apiError";
import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";

const Users = Router();

// Users.get("/", () => {});

Users.post("/register", async (req: Request, resp: Response) => {
	const { username, email, password } = req.body as UserType;

	const userExists = await prisma.user.findUnique({ where: { email } });

	if (userExists) {
		throw new BadRequestError("E-mail já cadastrado por outro usuário!");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			username: username ?? "",
			email,
			password: hashPassword,
		},
	});

	const { password: _, ...user } = newUser;

	return resp.status(201).send({
		success: true,
		message: "Usuário cadastrado com sucesso!",
		user,
	});
});

export default Users;
