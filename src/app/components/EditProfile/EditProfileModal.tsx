"use client";
import styles from "./EditProfileModal.module.scss";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { Images } from "@/constants/images";
import { poppins } from "@/app/fonts";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";
import { baseUrl } from "@/api/constants/baseUrl"; // ✅ Add backend URL

interface EditProfileModalProps {
  initialName: string;
  initialUsername: string;
  initialStatus: string;
  initialAvatar: string;
  onClose: () => void;
}

export default function EditProfileModal({
  initialName,
  initialUsername,
  initialStatus,
  initialAvatar,
  onClose,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [username, setUsername] = useState(initialUsername);
  const [status, setStatus] = useState(initialStatus);
  const [avatar, setAvatar] = useState<string | File>(initialAvatar); // ✅ Allow File or string
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file); // ✅ Store actual file
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("display_name", name);
    formData.append("username", username);
    formData.append("status", status);

    if (avatar instanceof File) {
      formData.append("avatar", avatar); // ✅ Send actual file
    }

    updateProfile(formData, {
      onSuccess: () => {
        console.log("✅ Profile updated successfully!");
        onClose();
      },
      onError: (error) => {
        console.error("🚨 Error updating profile:", error);
      },
    });
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${poppins.className} ${styles.modal}`}>
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.heading}>Edit your profile</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <Image
              src={Images.crossSvgDark}
              alt={"Close"}
              height={30}
              width={30}
            />
          </button>
        </div>

        <hr className={styles.line} />

        {/* Form Fields & Profile Image */}
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.inputGroup}>
              <label>Display name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Status</label>
              <textarea
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.textarea}
              />
            </div>
          </div>

          {/* Profile Image */}
          <div className={styles.rightColumn}>
            <label className={styles.imageLabel}>Profile photo</label>
            <div className={styles.imageWrapper}>
              <Image
                src={
                  avatar instanceof File 
                    ? URL.createObjectURL(avatar) 
                    : avatar
                    ? `${baseUrl}${avatar}`
                    : DefaultAvatar 
                }
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  hidden
                />
              </label>
              <button
                className={styles.removeButton}
                onClick={() => setAvatar("")}
              >
                Remove Photo
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
