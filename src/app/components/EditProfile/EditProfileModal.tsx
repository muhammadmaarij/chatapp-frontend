"use client";
import { useState } from "react";
import styles from "./EditProfileModal.module.scss";
import Image from "next/image";
import { poppins } from "@/app/fonts";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { useProfile } from "@/hooks/user/useProfile"; // ✅ Use profile hook directly
import { baseUrl } from "@/api/constants/baseUrl";
import CloseButton from "../CloseButton/CloseButton";

interface EditProfileModalProps {
  onClose: () => void;
}

export default function EditProfileModal({ onClose }: EditProfileModalProps) {
  const { data: user, isLoading, refetch } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [name, setName] = useState(user?.display_name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [status, setStatus] = useState(user?.status || "");
  const [avatar, setAvatar] = useState<string | File>(user?.avatar_url || "");

  if (isLoading) return <p>Loading profile...</p>;

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar("");
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("display_name", name);
    formData.append("username", username);
    formData.append("status", status);

    if (avatar instanceof File) {
      formData.append("avatar", avatar);
    }

    updateProfile(formData, {
      onSuccess: () => {
        refetch();
        onClose();
      },
      onError: (error) => console.error("🚨 Error updating profile:", error),
    });
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${poppins.className} ${styles.modal}`}>
        <ModalHeader onClose={onClose} />
        <hr className={styles.line} />
        <div className={styles.content}>
          <ProfileForm
            name={name}
            username={username}
            status={status}
            onNameChange={setName}
            onUsernameChange={setUsername}
            onStatusChange={setStatus}
          />
          <ProfileAvatar
            avatar={avatar}
            onUpload={handleUpload}
            onRemove={handleRemoveAvatar}
          />
        </div>
        <ModalActions
          onClose={onClose}
          onSave={handleSave}
          isPending={isPending}
        />
      </div>
    </div>
  );
}

const ModalHeader = ({ onClose }: { onClose: () => void }) => (
  <div className={styles.header}>
    <h3 className={styles.heading}>Edit your profile</h3>
    <CloseButton onClick={onClose} />
  </div>
);

const ProfileForm = ({
  name,
  username,
  status,
  onNameChange,
  onUsernameChange,
  onStatusChange,
}: {
  name: string;
  username: string;
  status: string;
  onNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}) => (
  <div className={styles.leftColumn}>
    <div className={styles.inputGroup}>
      <label>Display name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className={styles.input}
      />
    </div>

    <div className={styles.inputGroup}>
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        className={styles.input}
      />
    </div>

    <div className={styles.inputGroup}>
      <label>Status</label>
      <textarea
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className={styles.textarea}
      />
    </div>
  </div>
);

const ProfileAvatar = ({
  avatar,
  onUpload,
  onRemove,
}: {
  avatar: string | File;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) => {
  const avatarSrc =
    avatar instanceof File
      ? URL.createObjectURL(avatar)
      : avatar
      ? `${baseUrl}${avatar}`
      : DefaultAvatar;

  return (
    <div className={styles.rightColumn}>
      <label className={styles.imageLabel}>Profile photo</label>
      <div className={styles.imageWrapper}>
        <Image
          src={avatarSrc}
          alt="Profile Photo"
          width={120}
          height={120}
          className={styles.profileImage}
          loader={({ src }) => src}
          unoptimized
        />
      </div>
      <div className={styles.uploadButtons}>
        <label className={styles.cancelButton}>
          Upload Profile Photo
          <input type="file" accept="image/*" onChange={onUpload} hidden />
        </label>
        <button className={styles.removeButton} onClick={onRemove}>
          Remove Photo
        </button>
      </div>
    </div>
  );
};

const ModalActions = ({
  onClose,
  onSave,
  isPending,
}: {
  onClose: () => void;
  onSave: () => void;
  isPending: boolean;
}) => (
  <div className={styles.buttonGroup}>
    <button className={styles.cancelButton} onClick={onClose}>
      Cancel
    </button>
    <button className={styles.saveButton} onClick={onSave} disabled={isPending}>
      {isPending ? "Saving..." : "Save changes"}
    </button>
  </div>
);
