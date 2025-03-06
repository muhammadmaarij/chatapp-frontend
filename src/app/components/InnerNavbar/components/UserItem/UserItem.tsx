import { UserItemProps } from "@/types/components/types";
import ProfileAvatar from "../../../ProfileAvatar/ProfileAvatar";
import styles from "./UserItem.module.scss";

export default function UserItem({
  user,
  isSelected,
  isUnread,
  onSelect,
}: UserItemProps) {
  const handleClick = () =>
    onSelect(user.id, user.username, user.avatar_url, user.display_name);

  return (
    <div
      className={`${styles.dmItem} ${isSelected ? styles.selectedChat : ""} ${
        isUnread ? styles.unread : ""
      }`}
      onClick={handleClick}
    >
      <ProfileAvatar src={user.avatar_url} alt={user.username} size={24} />
      <span>{user.username}</span>
    </div>
  );
}
