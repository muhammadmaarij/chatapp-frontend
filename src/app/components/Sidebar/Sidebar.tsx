"use client";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import { Home, Bell, MessageCircle, MoreHorizontal, Plus } from "lucide-react"; 
import { useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useProfile } from "@/hooks/user/useProfile";
import DefaultAvatar from "@/assets/images/default-avatar.jpg"; // Fallback avatar
import { baseUrl } from "@/api/constants/baseUrl"; // Backend URL
import { Images } from "@/constants/images";

export default function Sidebar() {
  const { data: user, isLoading } = useProfile(); // Fetch profile
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        <button className={styles.addButton}>
          <Plus size={40} />
        </button>

        {/* Profile */}
        <div 
          className={styles.profile} 
          onClick={() => setIsProfileOpen(true)}
        >
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
              { <span className={styles.onlineIndicator}></span>}
            </>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileOpen && user && (
        <ProfileModal 
          user={{
            name: user.display_name,
            username: user.username,
            status: user.status || "No status set",
            email: user.email,
            contact: "N/A", // Add contact info if available in API
            avatar: user.avatar_url ? `${baseUrl}${user.avatar_url}` : DefaultAvatar,
          }} 
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </aside>
  );
}
