"use client";
import styles from "./DashboardNavbar.module.scss";
import { Search, LogOut } from "lucide-react";
import OutlineButton from "../OutlineButton/OutlineButton";
import useLogout from "@/hooks/auth/useLogout";

export default function DashboardNavbar() {
  const { handleLogout } = useLogout();

  return (
    <header className={styles.navbar}>
      <div></div>
      <div className={styles.searchContainer}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search QLU Recruiting"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.logoutButton}>
        <OutlineButton onClick={handleLogout}> Logout</OutlineButton>
      </div>
    </header>
  );
}
