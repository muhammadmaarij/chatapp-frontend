import styles from "./RightImage.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";

export default function RightImage() {
  return (
    <div className={styles.rightImage}>
      <Image
        src={Images.landingSvg}
        alt="Welcome Banner Illustration"
        width={650}
        height={450}
        className={styles.bannerImage}
      />
    </div>
  );
}
