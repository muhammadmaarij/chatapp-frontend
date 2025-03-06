"use client";
import styles from "./UserChatHeader.module.scss";
import ProfileAvatar from "../../../ProfileAvatar/ProfileAvatar";
import ProfileModal from "../../../ProfileModal/ProfileModal";
import { useEffect, useState } from "react";
import { useChatDetails } from "@/hooks/chat/useChatDetails";
import { useOnlineUsers } from "@/hooks/chat/useOnlineUsers";

export default function UserChatHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: chatDetails, isLoading, error } = useChatDetails();
  const onlineUsers = useOnlineUsers();
  const [isUserOnline, setIsUserOnline] = useState(false);

  useEffect(() => {
    if (chatDetails) {
      setIsUserOnline(onlineUsers?.has(chatDetails.id) ?? false);
    }
  }, [onlineUsers, chatDetails]);

  if (isLoading) {
    return <div className={styles.loading}>Loading chat...</div>;
  }

  if (!chatDetails) {
    return <div className={styles.error}>Chat details not found</div>;
  }

  return (
    <div className={styles.userHeader}>
      <ProfileAvatar
        src={chatDetails.avatar_url}
        alt={chatDetails.username || "User"}
        size={150}
      />

      <div className={styles.userInfo}>
        <h3>
          {chatDetails.display_name}{" "}
          {isUserOnline && <span className={styles.onlineDot} />}{" "}
        </h3>
        <p className={styles.subtext}>
          This conversation is between <strong>@{chatDetails.username}</strong>{" "}
          and you.
        </p>
      </div>

      {/* <button className={styles.viewProfile} onClick={() => setIsProfileOpen(true)}>
      View Profile
    </button> */}

      {isProfileOpen && (
        <ProfileModal onClose={() => setIsProfileOpen(false)} />
      )}
    </div>
  );
}
