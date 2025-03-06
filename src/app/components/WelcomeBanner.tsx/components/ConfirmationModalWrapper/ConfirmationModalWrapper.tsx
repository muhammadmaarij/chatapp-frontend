import ConfirmationModal from "../../../ConfirmationModal/ConfirmationModal";
import { ConfirmationModalWrapperProps } from "@/types/components/types";

export default function ConfirmationModalWrapper({
  isConfirmationOpen,
  setConfirmationOpen,
  email,
}: ConfirmationModalWrapperProps) {
  return isConfirmationOpen ? (
    <ConfirmationModal
      onClose={() => setConfirmationOpen(false)}
      email={email}
      onSuccess={() => console.log("Verification Successful! Redirect user...")}
    />
  ) : null;
}
