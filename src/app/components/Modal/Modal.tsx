import { forwardRef } from "react";
import { ComponentPropsWithoutRef } from "react";
import styles from "./Modal.module.scss";
import CloseButton from "../CloseButton/CloseButton";
import { poppins } from "@/app/fonts";

export interface ModalProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  onClose: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ title, children, onClose, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${poppins.className} ${styles.modalOverlay} ${className}`}
        onClick={onClose}
        {...props}
      >
        <div
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h3>{title}</h3>
            <CloseButton onClick={onClose} />
          </div>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";
export default Modal;
