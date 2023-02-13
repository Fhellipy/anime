import {
  InputHTMLAttributes,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import css from "./styles.module.css";

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validator?: UseFormRegisterReturn;
  error?: string;
  confirmPass?: boolean;
}

function InputForm(props: InputFormProps) {
  const { label, error, validator, confirmPass, ...rest } = props;

  const [isPassword, setIsPassword] = useState(false);

  const input = document.getElementsByTagName("input");
  const nameInput = confirmPass ? "confirm_password" : "password";
  const password = input.namedItem(nameInput);

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
      <span className={css.wrapper}>
        <label>{label}: </label>

        <span className={css.input}>
          <input id="input" {...validator} {...rest} autoComplete="on" />

          {rest.type === "password" ? (
            <>
              {isPassword ? (
                <AiOutlineEyeInvisible
                  cursor="pointer"
                  onClick={() => {
                    if (password) {
                      showPass(password);
                      setIsPassword(false);
                    }
                  }}
                />
              ) : (
                <AiOutlineEye
                  cursor="pointer"
                  onClick={() => {
                    if (password) {
                      showPass(password);
                      setIsPassword(true);
                    }
                  }}
                />
              )}
            </>
          ) : (
            ""
          )}
        </span>
      </span>

      <p role="alert">{error}</p>
    </div>
  );
}

export { InputForm };
