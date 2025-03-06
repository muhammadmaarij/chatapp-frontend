import styles from "./NavLinks.module.scss";
import Link from "next/link";
import { NavLink, DownloadLink } from "@/types/components/types";
import DownloadDropdown from "../DownloadDropdown/DownloadDropdown";

interface NavLinksProps {
  navLinks: NavLink[];
  downloadLinks: DownloadLink[];
}

export default function NavLinks({ navLinks, downloadLinks }: NavLinksProps) {
  return (
    <ul className={styles.navLinks}>
      {navLinks.map((link, index) => (
        <li key={index}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
      <DownloadDropdown downloadLinks={downloadLinks} />
    </ul>
  );
}
