import styles from "./NavbarHeader.module.scss";
import { poppins } from "@/app/fonts";

export default function NavbarHeader() {
  return (
    <div>
      <h2 className={`${poppins.className} ${styles.heading}`}>
        QLU Recruiting
      </h2>
      <hr className={styles.line} />
    </div>
  );
}
