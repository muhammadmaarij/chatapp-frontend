"use client";
import styles from "./GroupHeader.module.scss";
import { Hash } from "lucide-react";
import { useGroupInfo } from "@/hooks/group/useGroupInfo";
import { GroupHeaderProps } from "@/types/components/types";
import GroupMembers from "./components/GroupMembers";

export default function GroupHeader({ conversationId }: GroupHeaderProps) {
  const { data, isLoading } = useGroupInfo();

  if (isLoading) return <p className={styles.loading}>Loading group info...</p>;
  if (!data) return <p className={styles.error}>Failed to load group</p>;

  return (
    <div className={styles.groupHeader}>
      <div className={styles.groupTitle}>
        <Hash size={20} className={styles.hashIcon} />
        <h2>{data.name}</h2>
      </div>

      <GroupMembers members={data.members} />
    </div>
  );
}
