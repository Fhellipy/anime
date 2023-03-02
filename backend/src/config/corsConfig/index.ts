import { CorsOptions } from "cors";

const corsConfig: CorsOptions = {
	origin: "*",
	methods: ["GET", "POST", "PATCH", "DELETE"],
};

export { corsConfig };
