import "express-async-errors";
import { errorMiddleware } from "@middlewares/error";
import Routes from "@routes";
import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsConfig } from "@config/corsConfig";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsConfig));
app.use(cookieParser());
app.use("/", Routes);
app.use(errorMiddleware);

export default app;
