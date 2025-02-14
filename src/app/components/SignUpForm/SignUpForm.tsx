"use client";
import { useState } from "react";
import AuthModal from "../AuthPopups/AuthModal";


export default function SignupForm() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Signup</button>

      {isModalOpen && (
        <AuthModal 
          onClose={() => setModalOpen(false)} 
          mode="signup" 
          toggleMode={() => setModalOpen(false)} 
        />
      )}
    </>
  );
}
