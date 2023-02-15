import { config } from "dotenv";

config();

export const SERVER_PORT = Number(process.env.SERVER_PORT);
