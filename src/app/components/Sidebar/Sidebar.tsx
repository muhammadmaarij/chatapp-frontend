"use client";
import { useState } from "react";
import styles from "./Sidebar.module.scss";
import { useProfile } from "@/hooks/user/useProfile";
import { NavItem, UserProfile } from "@/types/components/types";
import { Home, Bell, MessageCircle, MoreHorizontal } from "lucide-react";
import NavSection from "./components/NavSection/NavSection";
import BottomSection from "./components/BottomSection/BottomSection";
import ProfileModalWrapper from "./components/ProfileModalWrapper/ProfileModalWrapper";
import LogoSection from "./components/LogoSection/LogoSection";

export default function Sidebar() {
  const { data: user, isLoading } = useProfile();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems: NavItem[] = [
    { icon: <Home size={24} />, label: "Home" },
    { icon: <Bell size={24} />, label: "Activity" },
    { icon: <MessageCircle size={24} />, label: "DMs" },
    { icon: <MoreHorizontal size={24} />, label: "More" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.navLinks}>
        <LogoSection />
        <NavSection navItems={navItems} />
      </div>
      <BottomSection
        isLoading={isLoading}
        user={user}
        setIsProfileOpen={setIsProfileOpen}
      />
      {isProfileOpen && user && (
        <ProfileModalWrapper setIsProfileOpen={setIsProfileOpen} />
      )}
    </aside>
  );
}
