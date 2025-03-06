import { ImagePreviewProps } from "@/types/components/types";
import styles from "./ImagePreview.module.scss";
import { X } from "lucide-react";
export default function ImagePreview({
  selectedFiles,
  removeSelectedFile,
}: ImagePreviewProps) {
  if (selectedFiles.length === 0) return null;

  return (
    <div className={styles.previewContainer}>
      {selectedFiles.map((file, index) => (
        <div key={index} className={styles.preview}>
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className={styles.imagePreview}
          />
          <button
            onClick={() => removeSelectedFile(index)}
            className={styles.removeButton}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
