import { InputHTMLAttributes, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import css from "./styles.module.css";

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	validator?: UseFormRegisterReturn;
	error?: string;
	confirmPass?: boolean;
	currentPass?: boolean;
}

function InputForm(props: InputFormProps) {
	const { label, error, validator, confirmPass, currentPass, ...rest } = props;
	const [inputType, setInputType] = useState<string>();
	const [password, setPassword] = useState<HTMLInputElement | null>(null);

	const [isPassword, setIsPassword] = useState(false);

	useEffect(() => {
		if (typeof document !== "undefined") {
			const input = document.getElementsByTagName("input");

			const nameInput = currentPass
				? "current_password"
				: confirmPass
				? "confirm_password"
				: "password";

			const pass = input.namedItem(nameInput);

			setPassword(pass);
		}
	}, []);

	const showPass = (input: HTMLInputElement) => {
		if (input) {
			if (input.type == "password") {
				input.type = "text";
			} else {
				input.type = "password";
			}

			input.focus();
		}
	};

	useEffect(() => {
		setInputType(rest.type);
	}, [rest.type]);

	return (
		<div className={css.content}>
			<span className={css.wrapper}>
				<label>{label}: </label>

				<span className={css.input}>
					<input {...validator} {...rest} autoComplete="on" />

					{inputType === "password" ? (
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
