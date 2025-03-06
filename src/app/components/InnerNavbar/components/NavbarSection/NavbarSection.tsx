import styles from "./NavbarSection.module.scss";
import { ChevronDown, ChevronRight } from "lucide-react";
import { poppins } from "@/app/fonts";
import { NavbarSectionProps } from "@/types/components/types";

export default function NavbarSection({
  title,
  isExpanded,
  toggleSection,
  children,
}: NavbarSectionProps) {
  return (
    <div className={styles.section}>
      <button className={styles.sectionHeader} onClick={toggleSection}>
        <span className={poppins.className}>{title}</span>
        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isExpanded && <div className={styles.subItems}>{children}</div>}
    </div>
  );
}
