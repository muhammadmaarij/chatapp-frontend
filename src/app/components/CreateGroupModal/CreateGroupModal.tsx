"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./CreateGroupModal.module.scss";
import { X, ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { useUsers } from "@/hooks/user/useGetAll"; // Fetch users
import { useCreateGroup } from "@/hooks/chat/useCreateGroup"; // API Hook

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

  // Handle Avatar Upload
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setGroupAvatar(imageUrl);
    }
  };

  // Toggle Member Selection
  const toggleMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  // Handle Group Creation
  const handleCreateGroup = () => {
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

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        {/* ✅ Header */}
        <div className={styles.header}>
          <h3>Create a Group</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* ✅ Form Fields */}
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

        {/* ✅ File Upload */}
        <div className={styles.inputGroup}>
          <label>Group Avatar</label>
          <input type="file" className={styles.fileInput} accept="image/*" onChange={handleUpload} />
        </div>

        {/* ✅ Show Image Preview */}
        {groupAvatar && (
          <div className={styles.imageWrapper}>
            <Image src={groupAvatar} alt="Group Avatar" width={80} height={80} className={styles.groupAvatar} />
          </div>
        )}

        {/* ✅ Select Members (Multi-Select Dropdown) */}
        <div className={styles.inputGroup} ref={dropdownRef}>
          <label>Select Members</label>
          <div className={`${styles.selectMembersContainer} ${dropdownOpen ? styles.open : ""}`}>
            <button className={styles.selectTrigger} onClick={() => setDropdownOpen((prev) => !prev)}>
              {selectedMembers.length > 0 ? `${selectedMembers.length} selected` : "Select Members"}
              <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className={styles.selectDropdown}>
                {isLoading ? (
                  <p>Loading users...</p>
                ) : (
                  users?.map((user) => (
                    <div key={user.id} className={styles.memberItem} onClick={() => toggleMember(user.id)}>
                      <input type="checkbox" checked={selectedMembers.includes(user.id)} className={styles.checkbox} readOnly />
                      <Image src={user.avatar_url || DefaultAvatar} alt={user.username} width={30} height={30} className={styles.avatar} />
                      {user.username}
                      {selectedMembers.includes(user.id) && <Check size={16} color="#0077cc" />}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* ✅ Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.saveButton} onClick={handleCreateGroup} disabled={isPending}>{isPending ? "Creating..." : "Create Group"}</button>
        </div>
      </div>
    </div>
  );
}
