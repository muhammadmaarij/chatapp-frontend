import styles from "./LogoSection.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";

export default function LogoSection() {
  return (
    <div className={styles.logo}>
      <Image src={Images.navPSvg} alt="App Logo" width={40} height={40} />
    </div>
  );
}
