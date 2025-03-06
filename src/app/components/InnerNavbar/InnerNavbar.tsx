"use client";
import styles from "./InnerNavbar.module.scss";
import { poppins } from "@/app/fonts";
import NavbarHeader from "./components/NavbarHeader/NavbarHeader";
import NavbarSection from "./components/NavbarSection/NavbarSection";
import UserItem from "./components/UserItem/UserItem";
import GroupItem from "./components/GroupItem/GroupItem";
import CreateGroupModal from "../CreateGroupModal/CreateGroupModal";
import { Group, User } from "@/types/components/types";
import { useInnerNavbar } from "@/hooks/chat/useInnerNavbar";

export default function InnerNavbar() {
  const {
    users,
    groups,
    isLoading,
    isGroupsLoading,
    unreadChats,
    expandedSections,
    toggleSection,
    selectedChat,
    showCreateGroup,
    openCreateGroupModal,
    closeCreateGroupModal,
    selectUserChat,
    selectGroupChat,
  } = useInnerNavbar();

  return (
    <aside className={`${poppins.className} ${styles.innerNavbar}`}>
      <NavbarHeader />

      <NavbarSection
        title="Groups"
        isExpanded={expandedSections.groups}
        toggleSection={() => toggleSection("groups")}
      >
        {isGroupsLoading ? (
          <p>Loading groups...</p>
        ) : (
          groups?.map((group: Group) => (
            <GroupItem
              key={group.group_id}
              group={group}
              isSelected={selectedChat === group.group_id}
              isUnread={unreadChats?.has(group.group_id) ?? false}
              onSelect={selectGroupChat}
            />
          ))
        )}
      </NavbarSection>

      <button
        className={styles.createGroupButton}
        onClick={openCreateGroupModal}
      >
        Create Group
      </button>

      <NavbarSection
        title="Direct Messages"
        isExpanded={expandedSections.dms}
        toggleSection={() => toggleSection("dms")}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          users?.map((user: User) => (
            <UserItem
              key={user.id}
              user={user}
              isSelected={selectedChat === user.id}
              isUnread={unreadChats?.has(user.id) ?? false}
              onSelect={selectUserChat}
            />
          ))
        )}
      </NavbarSection>

      {showCreateGroup && <CreateGroupModal onClose={closeCreateGroupModal} />}
    </aside>
  );
}
