import { forwardRef } from "react";
import { ComponentPropsWithoutRef } from "react";
import styles from "./InputField.module.scss";

export interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  error?: string;
  showStrength?: boolean;
  passwordStrength?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { type, className = "", error, showStrength, passwordStrength, ...props },
    ref
  ) => {
    return (
      <div className={styles.inputContainer}>
        <input
          ref={ref}
          type={type}
          className={`${styles.inputField} ${className}`}
          {...props}
        />
        {error && <p className={styles.error}>{error}</p>}
        {showStrength && passwordStrength && type === "password" && (
          <p
            className={`${styles.passwordStrength} ${
              styles[passwordStrength.toLowerCase()]
            }`}
          >
            Password strength: <strong>{passwordStrength}</strong>
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
