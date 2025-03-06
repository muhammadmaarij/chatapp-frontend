import { forwardRef } from "react";
import { ComponentPropsWithoutRef } from "react";
import styles from "./Overlay.module.scss";

export interface OverlayProps extends ComponentPropsWithoutRef<"div"> {
  onClose: () => void;
}

const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ children, onClose, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.overlay} ${className}`}
        onClick={onClose}
        {...props}
      >
        <div
          className={styles.overlayContent}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }
);

Overlay.displayName = "Overlay";
export default Overlay;
