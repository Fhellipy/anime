import { RegisterOptions } from "react-hook-form";

export const validateEmail: RegisterOptions = {
  required: {
    value: true,
    message: "O email do usuário é obrigatório!",
  },
};
