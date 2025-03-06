"use client";
import styles from "./EditProfileModal.module.scss";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import ProfileAvatarSection from "./components/ProfileAvatarSection/ProfileAvatarSection";
import { EditProfileModalProps } from "@/types/components/types";
import Modal from "../Modal/Modal";
import OutlineButton from "../OutlineButton/OutlineButton";
import Button from "../PrimaryButton/Button";
import { useEditProfile } from "@/hooks/user/useEditProfile";

export default function EditProfileModal({ onClose }: EditProfileModalProps) {
  const {
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
  } = useEditProfile(onClose);

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <Modal title="Edit Your Profile" onClose={onClose}>
      <div className={styles.content}>
        <ProfileForm
          name={name}
          username={username}
          status={status}
          onNameChange={setName}
          onUsernameChange={setUsername}
          onStatusChange={setStatus}
        />
        <ProfileAvatarSection
          avatar={avatar}
          onUpload={handleUpload}
          onRemove={handleRemoveAvatar}
        />
      </div>
      <div className={styles.buttonGroup}>
        <OutlineButton onClick={onClose}>Cancel</OutlineButton>
        <Button onClick={handleSave} isLoading={isPending}>
          Save Changes
        </Button>
      </div>
    </Modal>
  );
}
