import styles from "./NavSection.module.scss";
import { NavItem, NavSectionProps } from "@/types/components/types";

export default function NavSection({ navItems }: NavSectionProps) {
  return (
    <nav className={styles.navLinks}>
      {navItems.map((item, index) => (
        <button key={index} className={styles.navItem}>
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
