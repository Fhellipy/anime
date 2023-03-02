import prisma from "@database";
import { Password, User as UserType } from "@dto/user";
import { authMiddleware } from "@middlewares/authMiddleware";
import { BadRequestError } from "@utils/apiError";
import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";

const Users = Router();

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

Users.post(
	"/redefine-password",
	authMiddleware,
	async (req: Request, resp: Response) => {
		const { current_password, password } = req.body as Password;

		const id = req.user.id;
		const user = await prisma.user.findUnique({ where: { id } });

		if (!user) {
			throw new BadRequestError("Senha atual inválida!");
		}

		const verifyPassword = await bcrypt.compare(
			current_password,
			user.password
		);

		if (!verifyPassword) {
			throw new BadRequestError("Senha atual inválida!");
		}

		const hashPassword = await bcrypt.hash(password, 10);

		await prisma.user.update({
			where: { id: id },
			data: {
				password: hashPassword,
			},
		});

		return resp.status(201).send({
			success: true,
			message: "Senha atualizada com sucesso!",
		});
	}
);

export default Users;
