"use client";
import { useState } from "react";

export default function useEditContact(
  initialEmail: string,
  initialContact: string,
  onSave: (email: string, contact: string) => void
) {
  const [email, setEmail] = useState(initialEmail);
  const [contact, setContact] = useState(initialContact);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContact(e.target.value);

  const handleSave = () => onSave(email, contact);

  return { email, contact, handleEmailChange, handleContactChange, handleSave };
}
