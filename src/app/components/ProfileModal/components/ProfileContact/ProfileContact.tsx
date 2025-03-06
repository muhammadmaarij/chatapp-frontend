import { ProfileContactProps } from "@/types/components/types";
import styles from "./ProfileContact.module.scss";

export default function ProfileContact({
  email,
  onEditContact,
}: ProfileContactProps) {
  return (
    <div className={styles.editSection}>
      <div className={styles.field}>
        <label>Email Address</label>
        <p>{email}</p>
      </div>
      <button className={styles.editButton} onClick={onEditContact}>
        Edit
      </button>
    </div>
  );
}
