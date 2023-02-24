import { config } from "dotenv";

config();

export const SERVER_PORT = Number(process.env.SERVER_PORT);
export const CORS_ORIGINS = "http://localhost:3000;http://10.0.2.15:3000";
