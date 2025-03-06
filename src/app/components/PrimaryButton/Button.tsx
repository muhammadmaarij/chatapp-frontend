import { forwardRef } from "react";
import { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { isLoading, variant = "primary", className = "", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={`${styles.button} ${styles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
