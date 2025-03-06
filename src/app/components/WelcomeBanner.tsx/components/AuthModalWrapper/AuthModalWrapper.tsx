import AuthModal from "../../../AuthPopups/AuthModal";
import { AuthModalWrapperProps } from "@/types/components/types";

export default function AuthModalWrapper({
  isAuthModalOpen,
  setAuthModalOpen,
  authMode,
  setAuthMode,
  setEmail,
  setConfirmationOpen,
}: AuthModalWrapperProps) {
  const handleSignupComplete = (userEmail: string) => {
    setAuthModalOpen(false);
    setEmail(userEmail);
    setConfirmationOpen(true);
  };

  return isAuthModalOpen ? (
    <AuthModal
      onClose={() => setAuthModalOpen(false)}
      mode={authMode}
      toggleMode={() => setAuthMode(authMode === "signup" ? "login" : "signup")}
      onSignupComplete={handleSignupComplete}
    />
  ) : null;
}
