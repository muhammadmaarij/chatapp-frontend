import { useState, useRef, useEffect } from "react";
import styles from "./MemberDropdown.module.scss";
import { ChevronDown, Check } from "lucide-react";
import Image from "next/image";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { baseUrl } from "@/api/constants/baseUrl";
import { MemberDropdownProps } from "@/types/components/types";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

export default function MemberDropdown({
  users,
  isLoading,
  selectedMembers,
  setSelectedMembers,
}: MemberDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Toggle dropdown state
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className={styles.selectMembersContainer} ref={dropdownRef}>
      <button className={styles.selectTrigger} onClick={toggleDropdown}>
        {selectedMembers.length > 0
          ? `${selectedMembers.length} selected`
          : "Select Members"}
        <ChevronDown size={16} />
      </button>

      <div
        className={`${styles.selectDropdown} ${
          dropdownOpen ? styles.open : ""
        }`}
      >
        {isLoading ? (
          <p className={styles.loadingText}>Loading users...</p>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className={styles.memberItem}
              onClick={() => toggleMember(user.id)}
            >
              <input
                type="checkbox"
                checked={selectedMembers.includes(user.id)}
                readOnly
              />

              <ProfileAvatar
                src={user.avatar_url}
                alt={user.username}
                size={30}
              />

              {user.username}
              {selectedMembers.includes(user.id) && (
                <Check size={16} color="#0077cc" />
              )}
            </div>
          ))
        ) : (
          <p className={styles.noUsers}>No users available</p>
        )}
      </div>
    </div>
  );
}
