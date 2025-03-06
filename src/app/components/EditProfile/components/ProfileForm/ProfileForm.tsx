import { ProfileFormProps } from "@/types/components/types";
import styles from "./ProfileForm.module.scss";

export default function ProfileForm({
  name,
  username,
  status,
  onNameChange,
  onUsernameChange,
  onStatusChange,
}: ProfileFormProps) {
  return (
    <div className={styles.leftColumn}>
      <div className={styles.inputGroup}>
        <label>Display Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Status</label>
        <textarea
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={styles.textarea}
        />
      </div>
    </div>
  );
}
