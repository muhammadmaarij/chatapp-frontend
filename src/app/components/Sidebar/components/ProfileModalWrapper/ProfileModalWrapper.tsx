import ProfileModal from "../../../ProfileModal/ProfileModal";
import { ProfileModalWrapperProps } from "@/types/components/types";

export default function ProfileModalWrapper({
  setIsProfileOpen,
}: ProfileModalWrapperProps) {
  return <ProfileModal onClose={() => setIsProfileOpen(false)} />;
}
