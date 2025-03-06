import styles from "./LogoSection.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";

export default function LogoSection() {
  return (
    <div className={styles.logo}>
      <Image
        src={Images.logoSvg}
        alt="Main Logo"
        height={70}
        width={110}
        className={styles.logo1}
      />
      <Image
        src={Images.logo2Svg}
        alt="Secondary Logo"
        height={25}
        width={60}
        className={styles.logo2}
      />
    </div>
  );
}
