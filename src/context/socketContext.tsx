"use client";
import socket from "@/api/utils/socket";
import { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "@/api/constants/baseUrl"; // ✅ Use correct API base URL
import axiosInstance from "@/api/axiosInstance";

interface SocketContextType {
  socket: typeof socket;
  isConnected: boolean;
  onlineUsers: Set<string>; // ✅ Store online user IDs
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set<string>()); // ✅ Track online users

  // ✅ Fetch online users when the page loads
  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await axiosInstance.get(`${baseUrl}/api/online-users`);

        console.log(response.data);
        const users = new Set(response.data.onlineUsers);
        setOnlineUsers(users);
        console.log("✅ Fetched Online Users:", users);
      } catch (error) {
        console.error("🚨 Error fetching online users:", error);
      }
    };

    fetchOnlineUsers(); // Fetch on mount

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("✅ Connected to socket");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.warn("❌ Disconnected from socket");
    });

    // ✅ Listen for real-time user online status
    socket.on("user_online", ({ userId }) => {
      console.log("🟢 User Online:", userId);
      setOnlineUsers((prev) => new Set([...prev, userId]));
    });

    socket.on("user_offline", ({ userId }) => {
      console.log("🔴 User Offline:", userId);
      setOnlineUsers((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(userId);
        return updatedSet;
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("user_online");
      socket.off("user_offline");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
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
