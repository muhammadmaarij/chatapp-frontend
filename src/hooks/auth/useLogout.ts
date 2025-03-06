"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function useLogout() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.replace("/");
  };

  return { handleLogout };
}
