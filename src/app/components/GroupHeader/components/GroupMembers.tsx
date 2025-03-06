import styles from "./GroupMembers.module.scss";
import ProfileAvatar from "../../ProfileAvatar/ProfileAvatar";
import { GroupMembersProps } from "@/types/components/types";

export default function GroupMembers({ members }: GroupMembersProps) {
  const visibleMembers = members.slice(0, 3);
  const extraMembersCount = members.length - 3;

  return (
    <div className={styles.membersList}>
      {visibleMembers.map((member) => (
        <ProfileAvatar
          key={member.id}
          src={member.avatar_url}
          alt={member.username}
          size={32}
          variant="rounded"
        />
      ))}

      {extraMembersCount > 0 && (
        <div className={styles.extraMembers}>+{extraMembersCount}</div>
      )}
    </div>
  );
}
