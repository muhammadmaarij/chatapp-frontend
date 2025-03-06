import styles from "./GroupChatPage.module.scss";
import ChatHeader from "@/app/components/ChatHeader/ChatHeader";
import MessageList from "@/app/components/MessageList/MessageList";
import MessageInput from "@/app/components/MessageInput/MessageInput";
import { useGroupInfo } from "@/hooks/group/useGroupInfo";

export default function GroupChatPage() {
  const { data: groupDetails, isLoading, error } = useGroupInfo();

  if (isLoading) return <p className={styles.loading}>Loading group chat...</p>;
  if (error)
    return <p className={styles.error}>Error loading group details.</p>;
  if (!groupDetails) return <p className={styles.notFound}>Group not found</p>;

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatHeader}>
        <ChatHeader isGroupChat={true} />
      </div>

      <div className={styles.chatContent}>
        <MessageList conversationId={groupDetails.id} />
      </div>

      <div className={styles.messageInputContainer}>
        <MessageInput conversationId={groupDetails.id} />
      </div>
    </div>
  );
}
