import { useState, useEffect } from "react";
import socket from "@/api/utils/socket";

export const useUnreadChats = () => {
  const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleNewMessageAlert = (msg: { conversation_id?: string }) => {
      if (!msg.conversation_id) return;

      setUnreadChats((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.add(msg.conversation_id as string);
        return updatedSet;
      });
    };

    socket.on("new_message_alert", handleNewMessageAlert);

    return () => {
      socket.off("new_message_alert", handleNewMessageAlert);
    };
  }, []);

  const markChatAsRead = (conversationId: string | undefined) => {
    if (!conversationId) return;

    setUnreadChats((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.delete(conversationId);
      return updatedSet;
    });
  };

  return { unreadChats, markChatAsRead };
};
