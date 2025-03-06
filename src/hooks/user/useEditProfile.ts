import { useState, useEffect } from "react";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { useProfile } from "@/hooks/user/useProfile";

export const useEditProfile = (onSuccess: () => void) => {
  const { data: user, isLoading, refetch } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [avatar, setAvatar] = useState<string | File>("");

  useEffect(() => {
    if (user) {
      setName(user.display_name || "");
      setUsername(user.username || "");
      setStatus(user.status || "");
      setAvatar(user.avatar_url || "");
    }
  }, [user]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setAvatar(file);
  };

  const handleRemoveAvatar = () => setAvatar("");

  const handleSave = () => {
    const formData = new FormData();
    formData.append("display_name", name);
    formData.append("username", username);
    formData.append("status", status);
    if (avatar instanceof File) formData.append("avatar", avatar);

    updateProfile(formData, {
      onSuccess: () => {
        refetch();
        onSuccess();
      },
    });
  };

  return {
    isLoading,
    isPending,
    name,
    username,
    status,
    avatar,
    setName,
    setUsername,
    setStatus,
    handleUpload,
    handleRemoveAvatar,
    handleSave,
  };
};
