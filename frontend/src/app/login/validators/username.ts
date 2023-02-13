import { RegisterOptions } from "react-hook-form";

export const validateUsername: RegisterOptions = {
  required: {
    value: true,
    message: "O nome de usuário é obrigatório!",
  },
};
