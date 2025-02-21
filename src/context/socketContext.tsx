"use client";
import socket from "@/api/utils/socket";
import { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "@/api/constants/baseUrl";
import axiosInstance from "@/api/axiosInstance";

interface SocketContextType {
  socket: typeof socket;
  isConnected: boolean;
  onlineUsers: Set<string>;
  unreadChats: Set<string>;
  markChatAsRead: (conversationId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set<string>());
  const [unreadChats, setUnreadChats] = useState(new Set<string>()); // ✅ Store unread chats

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await axiosInstance.get(`${baseUrl}/api/online-users`);
        setOnlineUsers(new Set(response.data.onlineUsers));
      } catch (error) {
        console.error("🚨 Error fetching online users:", error);
      }
    };

    fetchOnlineUsers();

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("✅ Connected to socket");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.warn("❌ Disconnected from socket");
    });

    // ✅ Track unread messages
    socket.on("new_message_alert", (msg) => {
      console.log("📩 New message alert received:", msg);

      if (msg?.conversation_id) {
        setUnreadChats((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.add(msg.conversation_id); // ✅ Store conversation ID
          return updatedSet;
        });
      }
    });

    socket.on("user_online", ({ userId }) => {
      setOnlineUsers((prev) => new Set([...prev, userId]));
    });

    socket.on("user_offline", ({ userId }) => {
      setOnlineUsers((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(userId);
        return updatedSet;
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("new_message_alert");
      socket.off("user_online");
      socket.off("user_offline");
    };
  }, []);

  // ✅ Log unreadChats whenever it changes
  useEffect(() => {
    console.log("🔥 Updated Unread Chats:", unreadChats);
  }, [unreadChats]);

  const markChatAsRead = (conversationId: string) => {
    setUnreadChats((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.delete(conversationId);
      return updatedSet;
    });
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers, unreadChats, markChatAsRead }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
