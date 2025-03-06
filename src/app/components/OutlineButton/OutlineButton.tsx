import { forwardRef } from "react";
import { ComponentPropsWithoutRef } from "react";
import styles from "./OutlineButton.module.scss";

export interface OutlineButtonProps
  extends ComponentPropsWithoutRef<"button"> {}

const OutlineButton = forwardRef<HTMLButtonElement, OutlineButtonProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.outlineButton} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

OutlineButton.displayName = "OutlineButton";
export default OutlineButton;
