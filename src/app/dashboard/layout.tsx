"use client";
import { SocketProvider } from "@/context/socketContext";
import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar";
import InnerNavbar from "../components/InnerNavbar/InnerNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./DashboardLayout.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketProvider>
      <div className={styles.dashboardLayout}>
        <Sidebar />
        <div className={styles.mainContainer}>
          <DashboardNavbar />
          <div className={styles.contentWrapper}>
            <InnerNavbar />
            <main className={styles.mainContent}>{children}</main>
          </div>
        </div>
      </div>
    </SocketProvider>
  );
}
