import styles from "./RightSection.module.scss";
import { RightSectionProps } from "@/types/components/types";
import NavLinks from "../NavLinks/NavLinks";
import TryPulseButton from "../TryPulseButton/TryPulseButton";

export default function RightSection({
  navLinks,
  downloadLinks,
}: RightSectionProps) {
  return (
    <div className={styles.rightDiv}>
      <NavLinks navLinks={navLinks} downloadLinks={downloadLinks} />
      <TryPulseButton />
    </div>
  );
}
