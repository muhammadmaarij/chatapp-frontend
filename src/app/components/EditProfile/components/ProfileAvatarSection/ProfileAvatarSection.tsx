import { ProfileAvatarSectionProps } from "@/types/components/types";
import styles from "./ProfileAvatarSection.module.scss";
import ProfileAvatar from "../../../ProfileAvatar/ProfileAvatar";

export default function ProfileAvatarSection({
  avatar,
  onUpload,
  onRemove,
}: ProfileAvatarSectionProps) {
  return (
    <div className={styles.rightColumn}>
      <label className={styles.imageLabel}>Profile Photo</label>
      <ProfileAvatar
        src={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
        alt="Profile Avatar"
        size={180}
        variant="square"
      />
      <div className={styles.uploadButtons}>
        <label className={styles.uploadButton}>
          Upload Photo
          <input type="file" accept="image/*" onChange={onUpload} hidden />
        </label>
        <button className={styles.removeButton} onClick={onRemove}>
          Remove Photo
        </button>
      </div>
    </div>
  );
}
