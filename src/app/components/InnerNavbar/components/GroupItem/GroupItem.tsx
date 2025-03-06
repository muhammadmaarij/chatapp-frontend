import { GroupItemProps } from "@/types/components/types";
import styles from "./GroupItem.module.scss";
import { Hash } from "lucide-react";

export default function GroupItem({
  group,
  isSelected,
  isUnread,
  onSelect,
}: GroupItemProps) {
  const handleClick = () =>
    onSelect(
      group.group_id,
      group.group_name,
      group.group_avatar,
      group.member_count
    );

  return (
    <p
      className={`${styles.subItem} ${isSelected ? styles.selectedChat : ""} ${
        isUnread ? styles.unread : ""
      }`}
      onClick={handleClick}
    >
      <Hash size={16} /> {group.group_name}
    </p>
  );
}
