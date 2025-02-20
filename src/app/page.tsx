"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar/Navbar";
import WelcomeBanner from "./components/WelcomeBanner.tsx/WelcomeBanner";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.replace("/dashboard"); // ✅ Redirect to dashboard if logged in
    }
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <WelcomeBanner />
    </div>
  );
}
