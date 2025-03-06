import styles from "./ProfileSection.module.scss";
import Image from "next/image";
import { baseUrl } from "@/api/constants/baseUrl";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { UserProfile, ProfileSectionProps } from "@/types/components/types";

export default function ProfileSection({
  isLoading,
  user,
  setIsProfileOpen,
}: ProfileSectionProps) {
  return (
    <div className={styles.profile} onClick={() => setIsProfileOpen(true)}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Image
            src={
              user?.avatar_url ? `${baseUrl}${user.avatar_url}` : DefaultAvatar
            }
            alt={user?.display_name || "User"}
            width={40}
            height={40}
            className={styles.profilePic}
          />
          <span className={styles.onlineIndicator}></span>
        </>
      )}
    </div>
  );
}
