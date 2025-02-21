"use client";
import { Dispatch, SetStateAction, JSX, useState } from "react";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import { Home, Bell, MessageCircle, MoreHorizontal, Plus } from "lucide-react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useProfile } from "@/hooks/user/useProfile";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { baseUrl } from "@/api/constants/baseUrl";
import { Images } from "@/constants/images";

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
      <BottomSection isLoading={isLoading} user={user} setIsProfileOpen={setIsProfileOpen} />
      {isProfileOpen && user && <ProfileModalWrapper setIsProfileOpen={setIsProfileOpen} />}
    </aside>
  );
}

// ✅ Define Type for Navigation Items
interface NavItem {
  icon: JSX.Element;
  label: string;
}

// ✅ Extracted Logo Section
const LogoSection: React.FC = () => (
  <div className={styles.logo}>
    <Image src={Images.navPSvg} alt="App Logo" width={40} height={40} />
  </div>
);

// ✅ Extracted Navigation Section
interface NavSectionProps {
  navItems: NavItem[];
}
const NavSection: React.FC<NavSectionProps> = ({ navItems }) => (
  <nav className={styles.navLinks}>
    {navItems.map((item, index) => (
      <button key={index} className={styles.navItem}>
        {item.icon}
        <span>{item.label}</span>
      </button>
    ))}
  </nav>
);

// ✅ Extracted Bottom Section
interface BottomSectionProps {
  isLoading: boolean;
  user?: UserProfile;
  setIsProfileOpen: Dispatch<SetStateAction<boolean>>;
}
const BottomSection: React.FC<BottomSectionProps> = ({ isLoading, user, setIsProfileOpen }) => (
  <div className={styles.bottomSection}>
    <button className={styles.addButton}>
      <Plus size={40} />
    </button>
    <ProfileSection isLoading={isLoading} user={user} setIsProfileOpen={setIsProfileOpen} />
  </div>
);

// ✅ Define User Profile Type
interface UserProfile {
  avatar_url?: string;
  display_name?: string;
}

// ✅ Extracted Profile Section
interface ProfileSectionProps {
  isLoading: boolean;
  user?: UserProfile;
  setIsProfileOpen: Dispatch<SetStateAction<boolean>>;
}
const ProfileSection: React.FC<ProfileSectionProps> = ({ isLoading, user, setIsProfileOpen }) => (
  <div className={styles.profile} onClick={() => setIsProfileOpen(true)}>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <>
        <Image
          src={user?.avatar_url ? `${baseUrl}${user.avatar_url}` : DefaultAvatar}
          alt={user?.display_name || "User"}
          width={40}
          height={40}
          className={styles.profilePic}
        />
        <span className={styles.onlineIndicator}></span>
      </>
    )}
  </div>
);

// ✅ Extracted Profile Modal Wrapper
interface ProfileModalWrapperProps {
  setIsProfileOpen: Dispatch<SetStateAction<boolean>>;
}
const ProfileModalWrapper: React.FC<ProfileModalWrapperProps> = ({ setIsProfileOpen }) => (
  <ProfileModal onClose={() => setIsProfileOpen(false)} />
);
