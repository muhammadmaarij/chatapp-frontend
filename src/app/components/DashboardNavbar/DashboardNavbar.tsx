"use client";
import styles from "./DashboardNavbar.module.scss";
import { Search } from "lucide-react"; // Using Lucide Icons for Search

export default function DashboardNavbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.searchContainer}>
        <Search size={20} className={styles.searchIcon} />
        <input type="text" placeholder="Search QLU Recruiting" className={styles.searchInput} />
      </div>
    </header>
  );
}
