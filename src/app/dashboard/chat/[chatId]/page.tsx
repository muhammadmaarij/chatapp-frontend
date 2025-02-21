"use client";
import { useParams, useSearchParams } from "next/navigation"; // ✅ Get chatId from URL
import styles from "./ChatPage.module.scss";

import ChatHeader from "@/app/components/ChatHeader/ChatHeader";
import MessageList from "@/app/components/MessageList/MessageList";
import MessageInput from "@/app/components/MessageInput/MessageInput";
import { SocketProvider } from "@/context/socketContext";

export default function ChatPage() {
  const { chatId } = useParams(); 

  console.log(chatId, "chatID");
  const searchParams = useSearchParams();

  const isGroupChat = searchParams.get("group_id") !== null;

  const chatDetails = isGroupChat
    ? {
        id: searchParams.get("group_id") || "unknown",
        name: searchParams.get("group_name") || "Unknown Group",
        avatar_url: searchParams.get("group_avatar") || "/default-group-avatar.jpg",
        type: "group",
      }
    : {
        id: searchParams.get("id") || "unknown",
        username: searchParams.get("username") || "Unknown User",
        avatar_url: searchParams.get("avatar_url"),
        display_name: searchParams.get("display_name") || "Unknown",
        type: "user",
      };

  return (
    // <SocketProvider>
      <div className={styles.chatPage}>
        <div className={styles.chatHeader}>
          <ChatHeader chatDetails={chatDetails} isGroupChat={isGroupChat} />
        </div>

        <div className={styles.chatContent}>
          <MessageList key={chatId} conversationId={chatId} isGroupChat={isGroupChat} />
        </div>

        <div className={styles.messageInputContainer}>
          <MessageInput conversationId={chatId} isGroupChat={isGroupChat} />
        </div>
      </div>
    // </SocketProvider>
  );
}
