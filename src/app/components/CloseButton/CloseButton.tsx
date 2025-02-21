import styles from "./CloseButton.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";

interface CloseButtonProps {
  onClick: () => void;
  size?: number; 
}

export default function CloseButton({ onClick, size = 30 }: CloseButtonProps) {
  return (
    <button  className={styles.closeButton} onClick={onClick}>
      <Image src={Images.crossSvgDark} alt="Close" height={size} width={size} />
    </button>
  );
}
