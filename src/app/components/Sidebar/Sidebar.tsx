"use client";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import { Home, Bell, MessageCircle, MoreHorizontal, Plus } from "lucide-react"; // Using Lucide Icons
import { Images } from "@/constants/images";

interface SidebarProps {
  user: {
    name: string;
    profilePic: string;
    isOnline: boolean;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navLinks}>
      <div className={styles.logo}>
        <Image src={Images.navPSvg} alt="App Logo" width={40} height={40} />
      </div>
        <button className={styles.navItem}>
          <Home size={24} />
          <span>Home</span>
        </button>

        <button className={styles.navItem}>
          <Bell size={24} />
          <span>Activity</span>
        </button>

        <button className={styles.navItem}>
          <MessageCircle size={24} />
          <span>DMs</span>
        </button>

        <button className={styles.navItem}>
          <MoreHorizontal size={24} />
          <span>More</span>
        </button>
      </nav>

      <div className={styles.bottomSection}>
        <button className={styles.addButton}>
          <Plus size={40} />
        </button>

        <div className={styles.profile}>
          <Image
            src={Images.usersSvg}
            alt={user.name}
            width={40}
            height={40}
            className={styles.profilePic}
          />
          {user.isOnline && <span className={styles.onlineIndicator}></span>}
        </div>
      </div>
    </aside>
  );
}
