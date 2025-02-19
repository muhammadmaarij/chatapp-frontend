"use client";
import { useParams } from "next/navigation"; // ✅ Get chatId from URL
import styles from "./ChatPage.module.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageList from "../MessageList/MessageList";
import MessageInput from "../MessageInput/MessageInput";


export default function ChatPage() {
  const { chatId } = useParams(); // ✅ Get chatId from URL
  console.log(chatId)

  return (
    <div className={styles.chatPage}>
      {/* Chat Header */}
      <ChatHeader chatId={chatId} />

      {/* Message List */}
      <MessageList chatId={chatId} />

      {/* Message Input */}
      <MessageInput chatId={chatId} />
    </div>
  );
}
