import prisma from "@database";
import { Anime as AnimeType } from "@dto/anime";
import { authMiddleware } from "@middlewares/authMiddleware";
import { BadRequestError } from "@utils/apiError";
import { Request, Response, Router } from "express";

const Anime = Router();

Anime.post("/new", authMiddleware, async (req: Request, resp: Response) => {
	const { idAnime, comment } = req.body as AnimeType;

	const user = req.user;

	if (!idAnime || !comment || !user) {
		throw new BadRequestError("Falha ao cadastrar comentário!");
	}

	await prisma.animeComments.create({
		data: {
			idAnime,
			comment,
			userId: user.id,
			createdAt: new Date(),
			username: user.username,
		},
	});

	return resp.status(201).send({
		success: true,
		message: "Comentário cadastrado com sucesso!",
	});
});

Anime.get("/", authMiddleware, async (req: Request, resp: Response) => {
	const { idAnime } = req.query;

	if (typeof idAnime === "string") {
		const comments = await prisma.animeComments.findMany({
			where: { idAnime },
			orderBy: { createdAt: "desc" },
		});

		return resp.status(200).send({
			comments,
		});
	}
});

Anime.delete("/", authMiddleware, async (req: Request, resp: Response) => {
	const { id } = req.body;

	await prisma.animeComments.delete({
		where: { id },
	});

	return resp.status(200).send({
		success: true,
		message: "Comentário deletado com sucesso!",
	});
});

export default Anime;
