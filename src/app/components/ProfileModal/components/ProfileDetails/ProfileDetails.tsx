import { ProfileDetailsProps } from "@/types/components/types";
import styles from "./ProfileDetail.module.scss";

export default function ProfileDetails({
  name,
  username,
  status,
  onEditProfile,
}: ProfileDetailsProps) {
  return (
    <div>
      <div className={styles.editRow}>
        <div className={styles.info}>
          <h3>{name || "Unknown"}</h3>
          <p className={styles.username}>@{username}</p>
        </div>
        <button className={styles.editButton} onClick={onEditProfile}>
          Edit
        </button>
      </div>
      <div className={styles.field}>
        <p>{status || "No status set"}</p>
      </div>
    </div>
  );
}
