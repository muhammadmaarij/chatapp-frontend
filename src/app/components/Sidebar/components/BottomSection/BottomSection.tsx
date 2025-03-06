import styles from "./BottomSection.module.scss";
import { Plus } from "lucide-react";
import { BottomSectionProps } from "@/types/components/types";
import ProfileSection from "../ProfileSection/ProfileSection";

export default function BottomSection({
  isLoading,
  user,
  setIsProfileOpen,
}: BottomSectionProps) {
  return (
    <div className={styles.bottomSection}>
      <button className={styles.addButton}>
        <Plus size={40} />
      </button>
      <ProfileSection
        isLoading={isLoading}
        user={user}
        setIsProfileOpen={setIsProfileOpen}
      />
    </div>
  );
}
