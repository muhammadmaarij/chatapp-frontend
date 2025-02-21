"use client";
import styles from "./DashboardNavbar.module.scss";
import { Search, LogOut } from "lucide-react"; // Added LogOut icon
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token")
    router.replace("/");
  };

  return (
    <header className={styles.navbar}>
    <div></div>
      <div className={styles.searchContainer}>
        <Search size={20} className={styles.searchIcon} />
        <input type="text" placeholder="Search QLU Recruiting" className={styles.searchInput} />
      </div>

      <button className={styles.logoutButton} onClick={handleLogout}>
        <LogOut size={20} className={styles.logoutIcon} />
        Logout
      </button>
    </header>
  );
}
