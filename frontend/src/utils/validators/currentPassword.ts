import { RegisterOptions } from "react-hook-form";

export const validateCurrentPassword: RegisterOptions = {
  required: {
    value: true,
    message: "Informe a senha atual do usuário",
  },
  minLength: {
    value: 8,
    message: "A senha atual deve conter no mínimo 8 caracteres.",
  },
};
