import { ProfileHeaderProps } from "@/types/components/types";
import CloseButton from "../../../CloseButton/CloseButton";
import styles from "./ProfileHeader.module.scss";
export default function ProfileHeader({ onClose }: ProfileHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.heading}>Profile</h2>
      <CloseButton onClick={onClose} />
    </div>
  );
}
