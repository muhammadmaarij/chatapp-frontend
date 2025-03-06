import Image from "next/image";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { baseUrl } from "@/api/constants/baseUrl";
import styles from "./ProfileAvatar.module.scss";
import { ProfileAvatarProps } from "@/types/components/types";

export default function ProfileAvatar({
  src,
  alt,
  size = 24,
  variant = "square",
}: ProfileAvatarProps) {
  console.log(src, "Sss");
  const isBlobURL = typeof src === "string" && src.startsWith("blob:");
  const avatarSrc = isBlobURL
    ? src
    : src
    ? `${baseUrl}${src}`
    : DefaultAvatar.src;

  return (
    <Image
      src={avatarSrc}
      alt={alt}
      width={size}
      height={size}
      className={`${styles.profileAvatar} ${
        variant === "rounded" ? styles.rounded : styles.square
      }`}
      unoptimized={isBlobURL}
    />
  );
}
