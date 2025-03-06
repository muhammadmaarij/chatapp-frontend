import styles from "./GroupChatHeader.module.scss";
import { Hash } from "lucide-react";
import GroupHeader from "../../../GroupHeader/GroupHeader";
import { useGroupInfo } from "@/hooks/group/useGroupInfo";

export default function GroupChatHeader() {
  const { data: chatDetails, isLoading, error } = useGroupInfo();

  if (isLoading || error || !chatDetails)
    return <p className={styles.loading}>Loading group info...</p>;

  return (
    <div className={styles.groupHeader}>
      <GroupHeader conversationId={chatDetails.id} />
      <div className={styles.groupInfo}>
        <div className={styles.groupTitle}>
          <Hash size={30} className={styles.hashIcon} /> {/* Group Icon */}
          <h2>{chatDetails.name}</h2>
        </div>

        <p className={styles.subtext}>
          @Maarij created this group on Feb 20th. This is the very beginning of
          the <strong>@{chatDetails.name}</strong> conversation.
        </p>
      </div>
    </div>
  );
}
