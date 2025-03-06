import styles from "./MessageItem.module.scss";
import { decryptMessage } from "@/api/utils/decryption";
import DOMPurify from "dompurify";
import { MessageItemProps } from "@/types/components/types";
import MediaAttachments from "../MediaAttachments/MediaAttachments";
import ProfileAvatar from "../../../ProfileAvatar/ProfileAvatar";

export default function MessageItem({ message }: MessageItemProps) {
  const decryptedContent =
    message.type === "text" && message.content
      ? decryptMessage(message.content)
      : message.content;

  return (
    <div className={styles.message}>
      <div>
        <ProfileAvatar
          src={message.avatar_url}
          alt={message.display_name}
          size={40}
          variant="rounded"
        />
      </div>

      <div className={styles.messageContent}>
        <div className={styles.messageHeader}>
          <strong>{message.display_name}</strong>
          <span className={styles.timestamp}>
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
        </div>
        {message.type === "text" ? (
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(decryptedContent || ""),
            }}
          />
        ) : (
          <MediaAttachments filePaths={message.file_paths} />
        )}
      </div>
    </div>
  );
}
