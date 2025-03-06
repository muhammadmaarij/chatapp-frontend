"use client";
import styles from "./CreateGroupModal.module.scss";
import Image from "next/image";
import { CreateGroupModalProps } from "@/types/components/types";
import MemberDropdown from "../MemberDropdown/MemberDropdown";
import Modal from "../Modal/Modal";
import OutlineButton from "../OutlineButton/OutlineButton";
import Button from "../PrimaryButton/Button";
import { useGroupCreation } from "@/hooks/group/useGroupCreation";

export default function CreateGroupModal({ onClose }: CreateGroupModalProps) {
  const {
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
  } = useGroupCreation(onClose);

  return (
    <Modal title="Create a Group" onClose={onClose}>
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

      <MemberDropdown
        users={users || []}
        isLoading={isLoading}
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
      />

      <div className={styles.buttonGroup}>
        <OutlineButton onClick={onClose}>Cancel</OutlineButton>
        <Button onClick={handleGroupCreation} isLoading={isPending}>
          Create Group
        </Button>
      </div>
    </Modal>
  );
}
