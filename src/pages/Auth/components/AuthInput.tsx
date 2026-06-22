import { authStyles } from "../../../styles/authStyles";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  startIcon: ReactNode;
  endIcon?: ReactNode;
  inputProps?: UseFormRegisterReturn;
}

export default function AuthInput({
  label,
  error,
  startIcon,
  endIcon,
  inputProps,
  id,
  ...rest
}: AuthInputProps) {
  return (
    <div>
      <div className={authStyles.form.inputWrapper}>
        <span className={authStyles.form.startIcon}>{startIcon}</span>

        <input
          id={id}
          className={`${authStyles.form.input} ${endIcon ? "pr-12" : ""}`}
          placeholder=" "
          {...rest}
          {...inputProps}
        />

        <label htmlFor={id} className={authStyles.form.floatingLabel}>
          {label}
        </label>

        {endIcon}
      </div>

      {error && <p className={authStyles.form.error}>{error}</p>}
    </div>
  );
}
