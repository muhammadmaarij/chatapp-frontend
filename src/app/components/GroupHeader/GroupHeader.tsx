"use client";
import styles from "./GroupHeader.module.scss";
import Image from "next/image";
import { Hash } from "lucide-react"; // ✅ Group icon
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { useGroupInfo } from "@/hooks/chat/useGroupInfo";
import { baseUrl } from "@/api/constants/baseUrl"; // ✅ Backend URL

interface GroupHeaderProps {
  conversationId: string;
}

export default function GroupHeader({ conversationId }: GroupHeaderProps) {
  const { data, isLoading } = useGroupInfo(conversationId);

  if (isLoading) return <p className={styles.loading}>Loading group info...</p>;
  if (!data) return <p className={styles.error}>Failed to load group</p>;

  const { group, members } = data;
  const visibleMembers = members.slice(0, 3);
  const extraMembersCount = members.length - 3;

  return (
    <div className={styles.groupHeader}>
      {/* Group Name with Icon */}
      <div className={styles.groupTitle}>
        <Hash size={20} className={styles.hashIcon} />
        <h2>{group.group_name}</h2>
      </div>

      {/* Members List */}
      <div className={styles.membersList}>
        {visibleMembers.map((member) => (
          <Image
            key={member.id}
            src={member.avatar_url ? `${baseUrl}${member.avatar_url}` : DefaultAvatar}
            alt="Member Avatar"
            width={32}
            height={32}
            className={styles.memberAvatar}
          />
        ))}

        {/* Extra Members Count */}
        {extraMembersCount > 0 && (
          <div className={styles.extraMembers}>+{extraMembersCount}</div>
        )}
      </div>
    </div>
  );
}
