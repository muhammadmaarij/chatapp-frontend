"use client";
import { useMessages } from "@/hooks/chat/useMessages";
import styles from "./MessageList.module.scss";
import Image from "next/image";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { decryptMessage } from "@/api/utils/decryption";
import { useEffect, useRef } from "react";
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

  // ✅ Ref for last message
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!conversationId) return;

    console.log(`🔄 Switching to conversation: ${conversationId}`);

    // ✅ Leave previous chat
    socket.emit("leave_conversation");
    socket.removeAllListeners("new_message");

    // ✅ Join the new conversation
    socket.emit("join_conversation", conversationId);

    const handleNewMessage = (msg: Message) => {
      if (msg.conversation_id !== conversationId) {
        console.warn(`🚨 Ignoring message for old chat: ${msg.conversation_id}`);
        return;
      }

      queryClient.setQueryData<Message[]>(["messages", conversationId], (oldMessages = []) => {
        const updatedMessages = [...oldMessages, msg]
          .filter((message, index, self) => self.findIndex((m) => m.id === message.id) === index)
          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

        return updatedMessages;
      });

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    socket.on("new_message", handleNewMessage);

    return () => {
      console.log(`🚫 Cleaning up listeners for: ${conversationId}`);
      socket.emit("leave_conversation", conversationId);
      socket.off("new_message", handleNewMessage);
    };
  }, [conversationId]);

  // ✅ Get messages from React Query cache
  const messages =
    queryClient.getQueryData<Message[]>(["messages", conversationId]) || [];

  // ✅ Scroll to bottom when component mounts or messages update
  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className={styles.messageList}>
      {isLoading ? (
        <p>Loading messages...</p>
      ) : (
        messages.map((msg) => {
          const decryptedContent =
            msg.type === "text" && msg?.content
              ? decryptMessage(msg?.content)
              : msg?.content;

          return (
            <div
              key={msg.id}
              className={`${poppins.className} ${styles.message}`}
            >
              <Image
                src={msg.avatar_url ? `${baseUrl}${msg.avatar_url}` : DefaultAvatar}
                alt="Sender Avatar"
                width={40}
                height={40}
                className={styles.avatar}
                loader={({ src }) => src}
                unoptimized
              />

              <div className={styles.messageContent}>
                <div className={styles.messageHeader}>
                  <strong>{msg.display_name}</strong>
                  <span className={styles.timestamp}>
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </span>
                </div>

                {msg.type === "text" ? (
                  <p
                    className={styles.text}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(decryptedContent || ""),
                    }}
                  />
                ) : (
                  <div className={styles.mediaContainer}>
                    {msg.file_paths?.map((file, index) => (
                      <a
                        key={`${msg.id}-${index}`} // Ensure unique keys
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
                )}
              </div>
            </div>
          );
        })
      )}

      {/* ✅ Invisible div at the bottom to scroll into */}
      <div ref={messagesEndRef} />
    </div>
  );
}
