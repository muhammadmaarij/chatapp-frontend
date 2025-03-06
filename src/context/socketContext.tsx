"use client";
import socket from "@/api/utils/socket";
import { SocketContextType } from "@/types/components/types";
import { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log(" Connected to socket");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.warn("Disconnected from socket");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
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
