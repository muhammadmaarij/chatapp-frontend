"use client";
import { useState } from "react";
import styles from "./InnerNavbar.module.scss";
import { Users, MessageCircle, ChevronDown, ChevronRight, Hash } from "lucide-react"; // Using Lucide Icons
import Image from "next/image";

const groups = ["Log Rocket Updates", "Random", "General", "HR"];
const directMessages = [
  { name: "Muhammad Salman", avatar: "/avatars/salman.png" },
  { name: "Fahad Jalal", avatar: "/avatars/fahad.png" },
  { name: "Yashua Parvez", avatar: "/avatars/yashua.png" },
  { name: "Aneeq Akbar", avatar: "/avatars/aneeq.png" },
];

export default function InnerNavbar() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    groups: true,
    dms: true,
  });
  const [selectedChat, setSelectedChat] = useState<string | null>(null); // Can be group or DM

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className={styles.innerNavbar}>
      <h2 className={styles.heading}>QLU Recruiting</h2>

      {/* Groups Section */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggleSection("groups")}>
          <Users size={20} />
          <span>Groups</span>
          {expandedSections.groups ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
        {expandedSections.groups && (
          <div className={styles.subItems}>
            {groups.map((group) => (
              <p
                key={group}
                className={`${styles.subItem} ${selectedChat === group ? styles.selectedChat : ""}`}
                onClick={() => setSelectedChat(group)}
              >
                <Hash size={16} /> {group}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Direct Messages Section */}
      <div className={styles.section}>
        <button className={styles.sectionHeader} onClick={() => toggleSection("dms")}>
          <MessageCircle size={20} />
          <span>Direct Messages</span>
          {expandedSections.dms ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
        {expandedSections.dms && (
          <div className={styles.subItems}>
            {directMessages.map((user) => (
              <div
                key={user.name}
                className={`${styles.dmItem} ${selectedChat === user.name ? styles.selectedChat : ""}`}
                onClick={() => setSelectedChat(user.name)}
              >
                <Image src={user.avatar} alt={user.name} width={24} height={24} className={styles.dmAvatar} />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
