"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./CreateGroupModal.module.scss";
import { ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { useUsers } from "@/hooks/user/useGetAll"; // Fetch users
import { useCreateGroup } from "@/hooks/chat/useCreateGroup"; // API Hook
import { poppins } from "@/app/fonts";
import { baseUrl } from "@/api/constants/baseUrl";
import CloseButton from "../CloseButton/CloseButton";

interface CreateGroupModalProps {
  onClose: () => void;
}

export default function CreateGroupModal({ onClose }: CreateGroupModalProps) {
  const { data: users, isLoading } = useUsers();
  const { mutate: createGroup, isPending } = useCreateGroup();

  const [groupName, setGroupName] = useState("");
  const [groupAvatar, setGroupAvatar] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setGroupAvatar(URL.createObjectURL(file));
    }
  };

  const toggleMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleGroupCreation = () => {
    if (!groupName.trim() || selectedMembers.length === 0) {
      alert("Please enter a group name and select at least one member.");
      return;
    }

    createGroup(
      {
        group_name: groupName.trim(),
        group_avatar: groupAvatar || DefaultAvatar,
        members: selectedMembers,
      },
      {
        onSuccess: () => {
          alert("Group Created Successfully!");
          onClose();
        },
      }
    );
  };

  return (
    <div className={`${poppins.className} ${styles.modalContainer}`}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Create a Group</h3>
          <CloseButton onClick={onClose} />
        </div>

        <div className={styles.inputGroup}>
          <label>Group Name</label>
          <input
            type="text"
            className={styles.input}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name..."
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Group Avatar</label>
          <input
            type="file"
            className={styles.fileInput}
            accept="image/*"
            onChange={handleUpload}
          />
        </div>

        {groupAvatar && (
          <div className={styles.imageWrapper}>
            <Image
              src={groupAvatar}
              alt="Group Avatar"
              width={80}
              height={80}
              className={styles.groupAvatar}
            />
          </div>
        )}

        <div className={styles.inputGroup} ref={dropdownRef}>
          <label>Select Members</label>
          <div
            className={`${styles.selectMembersContainer} ${
              dropdownOpen ? styles.open : ""
            }`}
          >
            <button
              className={styles.selectTrigger}
              onClick={handleDropdownToggle}
            >
              {selectedMembers.length > 0
                ? `${selectedMembers.length} selected`
                : "Select Members"}
              <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className={styles.selectDropdown}>
                {isLoading ? (
                  <p>Loading users...</p>
                ) : (
                  users?.map((user) => (
                    <UserItem
                      key={user.id}
                      user={user}
                      isSelected={selectedMembers.includes(user.id)}
                      onToggle={toggleMember}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={handleGroupCreation}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Group"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface UserItemProps {
  user: { id: string; username: string; avatar_url: string | null };
  isSelected: boolean;
  onToggle: (userId: string) => void;
}

function UserItem({ user, isSelected, onToggle }: UserItemProps) {
  const handleClick = () => {
    onToggle(user.id);
  };

  return (
    <div className={styles.memberItem} onClick={handleClick}>
      <input
        type="checkbox"
        checked={isSelected}
        className={styles.checkbox}
        readOnly
      />
      <Image
        src={user.avatar_url ? `${baseUrl}${user.avatar_url}` : DefaultAvatar}
        alt={user.username}
        width={30}
        height={30}
        className={styles.avatar}
      />
      {user.username}
      {isSelected && <Check size={16} color="#0077cc" />}
    </div>
  );
}
