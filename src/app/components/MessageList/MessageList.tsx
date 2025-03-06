"use client";
import { useEffect, useRef } from "react";
import styles from "./MessageList.module.scss";
import { useMessages } from "@/hooks/chat/useMessages";
import { useChatSocket } from "@/hooks/chat/useChatSocket";
import { Message, MessageListProps } from "@/types/components/types";
import MessageItem from "./components/MessageItem/MessageItem";
import { poppins } from "@/app/fonts";

export default function MessageList({ conversationId }: MessageListProps) {
  const { data: messages, isLoading } = useMessages(conversationId);
  useChatSocket(conversationId);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className={`${poppins.className} ${styles.messageList}`}>
      {isLoading ? (
        <p>Loading messages...</p>
      ) : (
        messages.map((msg: Message) => (
          <MessageItem key={msg.id} message={msg} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
