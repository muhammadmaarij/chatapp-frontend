"use client";
import styles from "./ChatHeader.module.scss";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { poppins } from "@/app/fonts";
import { Images } from "@/constants/images";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { Hash } from "lucide-react"; // ✅ For Group Icon
import { baseUrl } from "@/api/constants/baseUrl";
import GroupHeader from "../GroupHeader/GroupHeader";

interface ChatHeaderProps {
  chatDetails: {
    id: string;
    display_name?: string; // User
    username?: string; // User
    avatar_url?: string;
    name?: string; // Group
    type: "user" | "group";
  };
  isGroupChat: boolean;
}

export default function ChatHeader({
  chatDetails,
  isGroupChat,
}: ChatHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  console.log(chatDetails, "chatt");
  return (
    <div className={`${poppins.className} ${styles.chatHeader}`}>
      {isGroupChat && <GroupHeader conversationId={chatDetails.id} /> }

      {isGroupChat ? (
        
        <div className={styles.groupHeader}>
          <div className={styles.groupInfo}>
            <div className={styles.groupTitle}>
              <Hash size={30} className={styles.hashIcon} /> {/* Group Icon */}
              <h2>{chatDetails.name}</h2>
            </div>

            <p className={styles.subtext}>
              @Fahad Jalal created this group on January 3rd. This is the very
              beginning of the
              <strong> @{chatDetails.name}</strong> This is the very beginning
              of the {chatDetails.name}.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.userHeader}>
          <Image
            src={
              chatDetails.avatar_url
                ? `${baseUrl}${chatDetails.avatar_url}`
                : DefaultAvatar
            }
            alt="User Avatar"
            width={50}
            height={50}
            className={styles.avatar}
          />

          <div className={styles.userInfo}>
            <h3>
              {chatDetails.display_name} <span className={styles.onlineDot} />
            </h3>
            <p className={styles.subtext}>
              This conversation is between{" "}
              <strong>@{chatDetails.username}</strong> and you. Checkout their
              profile to know more about them.
            </p>
          </div>

          <button
            className={styles.viewProfile}
            onClick={() => setIsProfileOpen(true)}
          >
            View Profile
          </button>

          {/* Profile Modal */}
          {isProfileOpen && (
            <ProfileModal
              user={chatDetails}
              onClose={() => setIsProfileOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
