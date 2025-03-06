"use client";
import styles from "./ChatPage.module.scss";
import ChatHeader from "@/app/components/ChatHeader/ChatHeader";
import MessageList from "@/app/components/MessageList/MessageList";
import MessageInput from "@/app/components/MessageInput/MessageInput";
import { useChatDetails } from "@/hooks/chat/useChatDetails";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const { chatId } = useParams() as { chatId?: string };
  const conversationId = chatId ?? "";

  const { data: chatDetails, isLoading } = useChatDetails();

  if (!chatDetails) {
    return <div className={styles.loading}>Loading chat...</div>;
  }

  return (
    <div className={styles.chatPage}>
      <div className={styles.chatHeader}>
        <ChatHeader isGroupChat={false} />
      </div>

      <div className={styles.chatContent}>
        <MessageList key={chatDetails.id} conversationId={conversationId} />
      </div>

      <div className={styles.messageInputContainer}>
        <MessageInput conversationId={conversationId} />
      </div>
    </div>
  );
}
