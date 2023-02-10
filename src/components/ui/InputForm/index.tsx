import { InputHTMLAttributes, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import css from "./styles.module.css";

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validator?: UseFormRegisterReturn;
  error?: string;
}

function InputForm(props: InputFormProps) {
  const { label, error, validator, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isPassword, setIsPassword] = useState(false);

  const showPass = (input: HTMLInputElement) => {
    if (input) {
      if (input.type == "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    }
  };

  return (
    <div className={css.content}>
      <span className={css.input}>
        <label>{label}: </label>

        <input ref={inputRef} {...validator} {...rest} autoComplete="on" />

        {rest.type === "password" ? (
          <span>
            {isPassword ? (
              <AiOutlineEyeInvisible
                cursor="pointer"
                onClick={() => {
                  if (inputRef.current) {
                    showPass(inputRef.current);
                    setIsPassword(false);
                  }
                }}
              />
            ) : (
              <AiOutlineEye
                cursor="pointer"
                onClick={() => {
                  if (inputRef.current) {
                    showPass(inputRef.current);
                    setIsPassword(true);
                  }
                }}
              />
            )}
          </span>
        ) : (
          ""
        )}
      </span>

      <p role="alert">{error}</p>
    </div>
  );
}

export { InputForm };
