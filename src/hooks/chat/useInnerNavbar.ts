import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConversation, useUsers } from "@/hooks/user/useGetAll";
import { useMyGroups } from "@/hooks/group/useMyGroups";
import { useUnreadChats } from "@/hooks/chat/useUnreadChats";

export const useInnerNavbar = () => {
  const router = useRouter();
  const { unreadChats, markChatAsRead } = useUnreadChats();
  const { data: users, isLoading } = useUsers();
  const { data: groups, isLoading: isGroupsLoading } = useMyGroups();
  const { mutate: startConversation } = useConversation();

  const [expandedSections, setExpandedSections] = useState({
    groups: true,
    dms: true,
  });
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) =>
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const openCreateGroupModal = () => setShowCreateGroup(true);
  const closeCreateGroupModal = () => setShowCreateGroup(false);

  const selectUserChat = (userId: string) => {
    setSelectedChat(userId);
    startConversation(userId, {
      onSuccess: (data) => {
        markChatAsRead(userId);
        router.push(`/dashboard/chat/${data.conversation.id}`);
      },
    });
  };

  const selectGroupChat = (groupId: string) => {
    setSelectedChat(groupId);
    markChatAsRead(groupId);
    router.push(`/dashboard/group/${groupId}`);
  };

  return {
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
  };
};
