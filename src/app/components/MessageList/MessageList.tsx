"use client";
import { useEffect, useRef } from "react";
import styles from "./MessageList.module.scss";
import Image from "next/image";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { decryptMessage } from "@/api/utils/decryption";
import { useMessages } from "@/hooks/chat/useMessages";
import { useSocket } from "@/context/socketContext";
import { baseUrl } from "@/api/constants/baseUrl";
import { poppins } from "@/app/fonts";
import { useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";

interface Message {
  id: string;
  sender_id: string;
  display_name: string;
  content: string;
  created_at: string;
  type: string;
  file_paths: string[] | null;
  avatar_url: string | null;
  conversation_id: string;
}

interface MessageListProps {
  conversationId: string;
}

export default function MessageList({ conversationId }: MessageListProps) {
  const { data: initialMessages, isLoading } = useMessages(conversationId);
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!conversationId) return;

    console.log(`🔄 Switching to conversation: ${conversationId}`);
    socket.emit("leave_conversation");
    socket.removeAllListeners("new_message");
    socket.emit("join_conversation", conversationId);

    const handleNewMessage = (msg: Message) => {
      if (msg.conversation_id !== conversationId) return;

      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (oldMessages = []) =>
          [...oldMessages, msg]
            .filter(
              (message, index, self) =>
                self.findIndex((m) => m.id === message.id) === index
            )
            .sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            )
      );

      scrollToBottom();
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      console.log(`🚫 Cleaning up listeners for: ${conversationId}`);
      socket.emit("leave_conversation", conversationId);
      socket.off("new_message", handleNewMessage);
    };
  }, [conversationId]);

  const messages =
    queryClient.getQueryData<Message[]>(["messages", conversationId]) || [];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className={styles.messageList}>
      {isLoading ? (
        <p>Loading messages...</p>
      ) : (
        messages.map((msg) => <MessageItem key={msg.id} message={msg} />)
      )}

      {/* ✅ Invisible div at the bottom to scroll into */}
      <div ref={messagesEndRef} />
    </div>
  );
}

// ✅ Extracted Message Item Component
const MessageItem = ({ message }: { message: Message }) => {
  const decryptedContent =
    message.type === "text" && message.content
      ? decryptMessage(message.content)
      : message.content;

  return (
    <div className={`${poppins.className} ${styles.message}`}>
      <Image
        src={
          message.avatar_url ? `${baseUrl}${message.avatar_url}` : DefaultAvatar
        }
        alt="Sender Avatar"
        width={40}
        height={40}
        className={styles.avatar}
        loader={({ src }) => src}
        unoptimized
      />

      <div className={styles.messageContent}>
        <div className={styles.messageHeader}>
          <strong>{message.display_name}</strong>
          <span className={styles.timestamp}>
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
        </div>

        {message.type === "text" ? (
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(decryptedContent || ""),
            }}
          />
        ) : (
          <MediaAttachments filePaths={message.file_paths} />
        )}
      </div>
    </div>
  );
};

// ✅ Extracted Media Attachments Component
const MediaAttachments = ({ filePaths }: { filePaths: string[] | null }) => {
  if (!filePaths || filePaths.length === 0) return null;

  return (
    <div className={styles.mediaContainer}>
      {filePaths.map((file, index) => (
        <a
          key={index}
          href={`${baseUrl}${file}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${baseUrl}${file}`}
            alt="Attachment"
            className={styles.mediaPreview}
          />
        </a>
      ))}
    </div>
  );
};
