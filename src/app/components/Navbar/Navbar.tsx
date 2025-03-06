"use client";
import styles from "./Navbar.module.scss";
import { NavLink, DownloadLink } from "@/types/components/types";
import LogoSection from "./components/LogoSection/LogoSection";
import RightSection from "./components/RightSection/RightSection";

export default function Navbar() {
  const navLinks: NavLink[] = [
    { label: "Privacy", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Pulse Web", href: "#" },
  ];

  const downloadLinks: DownloadLink[] = [
    { label: "Windows", href: "#" },
    { label: "Mac", href: "#" },
    { label: "Android", href: "#" },
    { label: "iOS", href: "#" },
  ];

  return (
    <nav className={styles.navbar}>
      <LogoSection />
      <RightSection navLinks={navLinks} downloadLinks={downloadLinks} />
    </nav>
  );
}
