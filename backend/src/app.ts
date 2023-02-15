import "express-async-errors";
import { errorMiddleware } from "@middlewares/error";
import Routes from "@routes";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", Routes);
app.use(errorMiddleware);

export default app;
