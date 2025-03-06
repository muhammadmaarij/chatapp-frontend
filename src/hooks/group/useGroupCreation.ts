import { useState } from "react";
import { useUsers } from "@/hooks/user/useGetAll";
import { useCreateGroup } from "@/hooks/group/useCreateGroup";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";

export const useGroupCreation = (onSuccess: () => void) => {
  const { data: users, isLoading } = useUsers();
  const { mutate: createGroup, isPending } = useCreateGroup();

  const [groupName, setGroupName] = useState("");
  const [groupAvatar, setGroupAvatar] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setGroupAvatar(URL.createObjectURL(file));
  };

  const handleGroupCreation = () => {
    if (!groupName.trim() || selectedMembers.length === 0) {
      alert("Please enter a group name and select at least one member.");
      return;
    }

    createGroup(
      {
        group_name: groupName.trim(),
        group_avatar: groupAvatar || DefaultAvatar.src,
        members: selectedMembers,
      },
      {
        onSuccess: () => {
          alert("✅ Group Created Successfully!");
          onSuccess();
        },
      }
    );
  };

  return {
    users,
    isLoading,
    isPending,
    groupName,
    groupAvatar,
    selectedMembers,
    setGroupName,
    handleUpload,
    setSelectedMembers,
    handleGroupCreation,
  };
};
