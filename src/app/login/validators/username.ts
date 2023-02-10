import { RegisterOptions } from "react-hook-form";

export const validateUsername: RegisterOptions = {
  required: {
    value: true,
    message: "Informe o usuário",
  },
};
