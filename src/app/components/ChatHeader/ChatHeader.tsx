"use client";
import styles from "./ChatHeader.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { poppins } from "@/app/fonts";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { Hash } from "lucide-react"; 
import { baseUrl } from "@/api/constants/baseUrl";
import GroupHeader from "../GroupHeader/GroupHeader";
import { useSocket } from "@/context/socketContext";

interface ChatHeaderProps {
  chatDetails: {
    id: string;
    display_name?: string;
    username?: string;
    avatar_url?: string;
    name?: string;
    type: "user" | "group";
  };
  isGroupChat: boolean;
}

export default function ChatHeader({ chatDetails, isGroupChat }: ChatHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { onlineUsers } = useSocket();
  const [isUserOnline, setIsUserOnline] = useState(false);

  useEffect(() => {
    setIsUserOnline(onlineUsers.has(chatDetails.id));
    console.log(`📡 Online Status of ${chatDetails.display_name}:`, onlineUsers.has(chatDetails.id));
  }, [onlineUsers, chatDetails.id]);

  return (
    <div className={`${poppins.className} ${styles.chatHeader}`}>
      {isGroupChat && <GroupHeader conversationId={chatDetails.id} />}

      {isGroupChat ? (
        <GroupChatHeader chatDetails={chatDetails} />
      ) : (
        <UserChatHeader
          chatDetails={chatDetails}
          isUserOnline={isUserOnline}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
        />
      )}
    </div>
  );
}

const UserChatHeader = ({
  chatDetails,
  isUserOnline,
  isProfileOpen,
  setIsProfileOpen,
}: {
  chatDetails: ChatHeaderProps["chatDetails"];
  isUserOnline: boolean;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
}) => (
  <div className={styles.userHeader}>
    <Image
      src={chatDetails.avatar_url ? `${baseUrl}${chatDetails.avatar_url}` : DefaultAvatar}
      alt="User Avatar"
      width={50}
      height={50}
      className={styles.avatar}
    />

    <div className={styles.userInfo}>
      <h3>
        {chatDetails.display_name}{" "}
        {isUserOnline && <span className={styles.onlineDot} />} {/* ✅ Online Dot */}
      </h3>
      <p className={styles.subtext}>
        This conversation is between <strong>@{chatDetails.username}</strong> and you.
      </p>
    </div>

    {/* <button className={styles.viewProfile} onClick={() => setIsProfileOpen(true)}>
      View Profile
    </button> */}

    {isProfileOpen && <ProfileModal onClose={() => setIsProfileOpen(false)} />}
  </div>
);

const GroupChatHeader = ({ chatDetails }: { chatDetails: ChatHeaderProps["chatDetails"] }) => (
  <div className={styles.groupHeader}>
    <div className={styles.groupInfo}>
      <div className={styles.groupTitle}>
        <Hash size={30} className={styles.hashIcon} /> {/* Group Icon */}
        <h2>{chatDetails.name}</h2>
      </div>

      <p className={styles.subtext}>
        @Maarij created this group on Feb 20th. This is the very beginning
        of the <strong>@{chatDetails.name}</strong> conversation.
      </p>
    </div>
  </div>
);
