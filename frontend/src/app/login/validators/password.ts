import { RegisterOptions } from "react-hook-form";

export const validatePassword: RegisterOptions = {
  required: {
    value: true,
    message: "Informe a senha do usuário",
  },
  minLength: {
    value: 8,
    message: "A senha deve conter no mínimo 8 caracteres.",
  },
};
