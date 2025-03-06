import Image from "next/image";
import styles from "./DashboardHome.module.scss";
import { Images } from "@/constants/images"; // Ensure `homePageSvg` is inside Images
import { poppins } from "../fonts";

export default function DashboardHome() {
  return (
    <div className={`${poppins.className} ${styles.container}`}>
      <div className={styles.imageWrapper}>
        <Image
          src={Images.homePageSvg}
          alt="Pulse Dashboard"
          width={550}
          height={550}
          className={styles.image}
        />
      </div>

      <div className={styles.textContent}>
        <h2 className={styles.heading}>Pulse</h2>
        <p className={styles.subtext}>Connect, Communicate, Create</p>
        <p className={styles.description}>
          Your journey with Pulse begins here!
        </p>
      </div>
    </div>
  );
}
