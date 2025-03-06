import Navbar from "./components/Navbar/Navbar";
import WelcomeBanner from "./components/WelcomeBanner.tsx/WelcomeBanner";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <WelcomeBanner />
    </div>
  );
}
