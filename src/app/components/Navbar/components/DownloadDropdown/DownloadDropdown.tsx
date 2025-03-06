import styles from "./DownloadDropdown.module.scss";
import Link from "next/link";
import { DownloadDropdownProps, DownloadLink } from "@/types/components/types";

export default function DownloadDropdown({
  downloadLinks,
}: DownloadDropdownProps) {
  return (
    <li className={styles.dropdown}>
      <span>Download ▾</span>
      <ul className={styles.dropdownMenu}>
        {downloadLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
