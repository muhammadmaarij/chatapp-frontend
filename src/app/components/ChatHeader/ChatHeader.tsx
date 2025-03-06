"use client";
import styles from "./ChatHeader.module.scss";
import { ChatHeaderProps } from "@/types/components/types";
import GroupChatHeader from "./components/GroupChatHeader/GroupChatHeader";
import UserChatHeader from "./components/UserChatHeader/UserChatHeader";
import { poppins } from "@/app/fonts";

export default function ChatHeader({ isGroupChat }: ChatHeaderProps) {
  return (
    <div className={`${poppins.className} ${styles.chatHeader}`}>
      {isGroupChat ? <GroupChatHeader /> : <UserChatHeader />}
    </div>
  );
}
