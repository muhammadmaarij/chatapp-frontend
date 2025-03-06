import { forwardRef } from "react";
import { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import styles from "./CloseButton.module.scss";
import { Images } from "@/constants/images";

export interface CloseButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: number;
  variant?: "default" | "absolute";
}

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ size = 30, variant = "default", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.closeButton} ${
          variant === "absolute" ? styles.absolute : ""
        } ${className}`}
        {...props}
      >
        <Image
          src={Images.crossSvgDark}
          alt="Close"
          height={size}
          width={size}
        />
      </button>
    );
  }
);

CloseButton.displayName = "CloseButton";
export default CloseButton;
