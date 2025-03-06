import { MediaAttachmentsProps } from "@/types/components/types";
import styles from "./MediaAttachments.module.scss";
import { baseUrl } from "@/api/constants/baseUrl";

export default function MediaAttachments({ filePaths }: MediaAttachmentsProps) {
  if (!filePaths || filePaths.length === 0) return null;

  return (
    <div className={styles.mediaContainer}>
      {filePaths.map((file, index) => (
        <a
          key={index}
          href={`${baseUrl}${file}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${baseUrl}${file}`}
            alt="Attachment"
            className={styles.mediaPreview}
          />
        </a>
      ))}
    </div>
  );
}
