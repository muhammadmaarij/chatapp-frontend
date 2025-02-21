"use client";
import { useState } from "react";
import styles from "./InnerNavbar.module.scss";
import {
  Users,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Hash,
} from "lucide-react";
import Image from "next/image";
import { poppins } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { useConversation, useUsers } from "@/hooks/user/useGetAll";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import CreateGroupModal from "../CreateGroupModal/CreateGroupModal";
import { useMyGroups } from "@/hooks/chat/useMyGroups";
import { baseUrl } from "@/api/constants/baseUrl";
import { useSocket } from "@/context/socketContext";

export default function InnerNavbar() {
  const router = useRouter();
  const { unreadChats, markChatAsRead } = useSocket();
  const [expandedSections, setExpandedSections] = useState({
    groups: true,
    dms: true,
  });
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // Fetch users & groups
  const { data: users, isLoading } = useUsers();
  const { data: groups, isLoading: isGroupsLoading } = useMyGroups();
  const { mutate: startConversation } = useConversation();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  console.log(unreadChats,"yayayay");

  const openCreateGroupModal = () => setShowCreateGroup(true);
  const closeCreateGroupModal = () => setShowCreateGroup(false);

  const selectUserChat = (userId: string, username: string, avatarUrl: string | null, displayName: string) => {
    setSelectedChat(userId);
    startConversation(userId, {
      onSuccess: (data) => {
        markChatAsRead(userId); // ✅ Mark chat as read
        router.push(
          `/dashboard/chat/${data.conversation.id}?id=${userId}&username=${username}&avatar_url=${
            avatarUrl || ""
          }&display_name=${displayName}`
        );
      },
    });
  };

  const selectGroupChat = (groupId: string, groupName: string, groupAvatar: string | null, memberCount: string) => {
    setSelectedChat(groupId);
    markChatAsRead(groupId); // ✅ Mark group chat as read
    router.push(
      `/dashboard/chat/${groupId}?group_id=${groupId}&group_name=${groupName}&group_avatar=${
        groupAvatar || ""
      }&member_count=${memberCount}`
    );
  };

  return (
    <aside className={styles.innerNavbar}>
      <NavbarHeader />
      <NavbarSection
        title="Groups"
        icon={<Users size={20} />}
        isExpanded={expandedSections.groups}
        toggleSection={() => toggleSection("groups")}
      >
        {isGroupsLoading ? (
          <p>Loading groups...</p>
        ) : (
          groups?.map((group, index) => (
            <GroupItem
              key={group.group_id || `group-${index}`}
              group={group}
              isSelected={selectedChat === group.group_id}
              isUnread={unreadChats.has(group.group_id)}
              onSelect={selectGroupChat}
            />
          ))
        )}
      </NavbarSection>

      <button className={styles.createGroupButton} onClick={openCreateGroupModal}>
        Create Group
      </button>

      <NavbarSection
        title="Direct Messages"
        icon={<MessageCircle size={20} />}
        isExpanded={expandedSections.dms}
        toggleSection={() => toggleSection("dms")}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          users?.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              isSelected={selectedChat === user.id}
              isUnread={unreadChats.has(user.id)}
              onSelect={selectUserChat}
            />
          ))
        )}
      </NavbarSection>

      {showCreateGroup && <CreateGroupModal onClose={closeCreateGroupModal} />}
    </aside>
  );
}

// ✅ Navbar Header
function NavbarHeader() {
  return (
    <div>
      <h2 className={`${poppins.className} ${styles.heading}`}>
        QLU Recruiting
      </h2>
      <hr className={styles.line} />
    </div>
  );
}

// ✅ Navbar Section
interface NavbarSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  toggleSection: () => void;
  children: React.ReactNode;
}

function NavbarSection({
  title,
  icon,
  isExpanded,
  toggleSection,
  children,
}: NavbarSectionProps) {
  return (
    <div className={styles.section}>
      <button className={styles.sectionHeader} onClick={toggleSection}>
        {icon}
        <span className={poppins.className}>{title}</span>
        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {isExpanded && <div className={styles.subItems}>{children}</div>}
    </div>
  );
}

// ✅ User Item Component
interface UserItemProps {
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
    display_name: string;
  };
  isSelected: boolean;
  isUnread: boolean;
  onSelect: (id: string, username: string, avatar_url: string | null, display_name: string) => void;
}

function UserItem({ user, isSelected, isUnread, onSelect }: UserItemProps) {

  console.log(user,"user");
  const handleClick = () => {
    onSelect(user.id, user.username, user.avatar_url, user.display_name);
  };

  return (
    <div
      className={`${styles.dmItem} ${poppins.className} ${isSelected ? styles.selectedChat : ""} ${isUnread ? styles.unread : ""}`}
      onClick={handleClick}
    >
      <Image
        src={user.avatar_url ? `${baseUrl}${user.avatar_url}` : DefaultAvatar}
        alt={user.username}
        width={24}
        height={24}
        className={styles.dmAvatar}
      />
      <span>{user.username}</span>
    </div>
  );
}

// ✅ Group Item Component
interface GroupItemProps {
  group: {
    group_id: string;
    group_name: string;
    group_avatar: string | null;
    member_count: string;
  };
  isSelected: boolean;
  isUnread: boolean;
  onSelect: (id: string, name: string, avatar: string | null, memberCount: string) => void;
}

function GroupItem({ group, isSelected, isUnread, onSelect }: GroupItemProps) {
  const handleClick = () => {
    onSelect(group.group_id, group.group_name, group.group_avatar, group.member_count);
  };

  return (
    <p
      className={`${styles.subItem} ${poppins.className} ${isSelected ? styles.selectedChat : ""} ${isUnread ? styles.unread : ""}`}
      onClick={handleClick}
    >
      <Hash size={16} /> {group.group_name}
    </p>
  );
}
