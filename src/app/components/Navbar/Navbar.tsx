"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { Images } from "@/constants/images";

export default function Navbar() {
  const navLinks = [
    { label: "Privacy", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Pulse Web", href: "#" },
  ];

  const downloadLinks = [
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

const LogoSection = () => (
  <div className={styles.logo}>
    <Image src={Images.logoSvg} alt="Main Logo" height={70} width={110} className={styles.logo1} />
    <Image src={Images.logo2Svg} alt="Secondary Logo" height={25} width={60} className={styles.logo2} />
  </div>
);

const RightSection = ({ navLinks, downloadLinks }: { navLinks: { label: string; href: string }[]; downloadLinks: { label: string; href: string }[] }) => (
  <div className={styles.rightDiv}>
    <NavLinks navLinks={navLinks} downloadLinks={downloadLinks} />
    <TryPulseButton />
  </div>
);

const NavLinks = ({ navLinks, downloadLinks }: { navLinks: { label: string; href: string }[]; downloadLinks: { label: string; href: string }[] }) => (
  <ul className={styles.navLinks}>
    {navLinks.map((link, index) => (
      <li key={index}>
        <Link href={link.href}>{link.label}</Link>
      </li>
    ))}
    <DownloadDropdown downloadLinks={downloadLinks} />
  </ul>
);

const DownloadDropdown = ({ downloadLinks }: { downloadLinks: { label: string; href: string }[] }) => (
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

const TryPulseButton = () => (
  <div className={styles.tryPulse}>
    <button>Try Pulse</button>
  </div>
);
