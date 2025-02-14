"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
        <div className={styles.logo}>
            <Image
            src={Images.logoSvg}
            alt={"logo here"}
            height={70}
            width={110}
            className={styles.logo1}
            />
            <Image
            src={Images.logo2Svg}
            alt={"logo here"}
            height={25}
            width={60}
            className={styles.logo2}
            />
        </div>

<div className={styles.rightDiv}>
<ul className={styles.navLinks}>
          <li><Link href="#">Privacy</Link></li>
          <li><Link href="#">Help Center</Link></li>
          <li><Link href="#">Pulse Web</Link></li>
          <li className={styles.dropdown}>
            <span>Download ▾</span>
            <ul className={styles.dropdownMenu}>
              <li><Link href="#">Windows</Link></li>
              <li><Link href="#">Mac</Link></li>
              <li><Link href="#">Android</Link></li>
              <li><Link href="#">iOS</Link></li>
            </ul>
          </li>
        </ul>

        <div className={styles.tryPulse}>
          <button>Try Pulse</button>
        </div>
</div>
    </nav>
  );
}
