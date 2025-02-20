"use client";
import { useState } from "react";
import styles from "./InnerNavbar.module.scss";
import {
  Users,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Hash,
} from "lucide-react"; // Using Lucide Icons
import Image from "next/image";
import { poppins, righteous } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { useConversation, useUsers } from "@/hooks/user/useGetAll";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import CreateGroupModal from "../CreateGroupModal/CreateGroupModal";
import { useMyGroups } from "@/hooks/chat/useMyGroups";
import { baseUrl } from "@/api/constants/baseUrl";

export default function InnerNavbar() {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    groups: true,
    dms: true,
  });
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  // Fetching users & groups
  const { data: users, isLoading } = useUsers();
  const { data: groups, isLoading: isGroupsLoading } = useMyGroups(); // ✅ Fetch Groups API
  const { mutate: startConversation } = useConversation();
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChatSelect = async (user: {
    id: string;
    username: string;
    avatar_url: string | null;
    display_name: string;
  }) => {
    setSelectedChat(user.id);

    startConversation(user.id, {
      onSuccess: (data) => {
        const conversationId = data.conversation.id;
        const queryString = new URLSearchParams({
          id: user.id,
          username: user.username,
          avatar_url: user.avatar_url || "",
          display_name: user.display_name,
        }).toString();

        router.push(`/dashboard/chat/${conversationId}?${queryString}`);
      },
    });
  };

  // ✅ Handle Group Click (Navigate to Group Chat)
  const handleGroupSelect = (group: {
    group_id: string;
    group_name: string;
    group_avatar: string | null;
    member_count: string;
  }) => {
    setSelectedChat(group.group_id);

    const queryString = new URLSearchParams({
      group_id: group.group_id,
      group_name: group.group_name,
      group_avatar: group.group_avatar || "",
      member_count: group.member_count,
    }).toString();

    router.push(`/dashboard/chat/${group.group_id}?${queryString}`);
  };

  return (
    <aside className={styles.innerNavbar}>
      <div>
        <h2 className={`${poppins.className} ${styles.heading}`}>
          QLU Recruiting
        </h2>
        <hr className={styles.line} />
      </div>

      {/* ✅ Groups Section (Dynamic) */}
      <div className={styles.section}>
        <button
          className={styles.sectionHeader}
          onClick={() => toggleSection("groups")}
        >
          <Users size={20} />
          <span className={poppins.className}>Groups</span>
          {expandedSections.groups ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {expandedSections.groups && (
          <div className={styles.subItems}>
            {isGroupsLoading ? (
              <p>Loading groups...</p>
            ) : (
              groups?.map((group, index) => (
                <p
                  key={group.group_id || `group-${index}`} // ✅ Fallback if group_id is missing
                  className={`${styles.subItem} ${poppins.className} ${
                    selectedChat === group.group_id ? styles.selectedChat : ""
                  }`}
                  onClick={() => handleGroupSelect(group)}
                >
                  <Hash size={16} /> {group.group_name}
                </p>
              ))
            )}
          </div>
        )}
      </div>

      <button
        className={styles.createGroupButton}
        onClick={() => setShowCreateGroup(true)}
      >
        Create Group
      </button>

      {/* ✅ Direct Messages Section */}
      <div className={styles.section}>
        <button
          className={styles.sectionHeader}
          onClick={() => toggleSection("dms")}
        >
          <MessageCircle size={20} />
          <span className={poppins.className}>Direct Messages</span>
          {expandedSections.dms ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {expandedSections.dms && (
          <div className={styles.subItems}>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              users?.map((user) => (
                <div
                  key={user.id}
                  className={`${styles.dmItem} ${poppins.className} ${
                    selectedChat === user.id ? styles.selectedChat : ""
                  }`}
                  onClick={() => handleChatSelect(user)}
                >
                  <Image
                    src={
                      user.avatar_url
                        ? `${baseUrl}${user.avatar_url}`
                        : DefaultAvatar
                    }
                    alt={user.username}
                    width={24}
                    height={24}
                    className={styles.dmAvatar}
                  />
                  <span>{user.username}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {showCreateGroup && (
        <div className={styles.modalOverlay}>
          <CreateGroupModal onClose={() => setShowCreateGroup(false)} />
        </div>
      )}
    </aside>
  );
}
