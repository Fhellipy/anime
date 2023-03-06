import { RegisterOptions } from "react-hook-form";

export const validateComment: RegisterOptions = {
	required: {
		value: true,
		message: "Informe o comentário desejado!",
	},
};
