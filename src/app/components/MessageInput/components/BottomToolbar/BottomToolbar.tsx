import { BottomToolbarProps } from "@/types/components/types";
import styles from "./BottomToolbar.module.scss";
import { Smile, Paperclip, ImageIcon, Mic, Send } from "lucide-react";

export default function BottomToolbar({
  handleFileSelect,
  handleSendMessage,
  isDisabled,
}: BottomToolbarProps) {
  const buttons = [
    { icon: <Smile size={16} />, action: () => {} },
    { icon: <Paperclip size={16} />, action: () => {} },
    {
      icon: (
        <label htmlFor="fileInput">
          <ImageIcon size={16} />
        </label>
      ),
      action: () => {},
    },
    { icon: <Mic size={16} />, action: () => {} },
  ];

  return (
    <div className={styles.bottomBar}>
      <div className={styles.toolbar}>
        {buttons.map((btn, index) => (
          <button key={index} onClick={btn.action}>
            {btn.icon}
          </button>
        ))}
        <input
          type="file"
          id="fileInput"
          multiple
          accept="image/*"
          className={styles.fileInput}
          onChange={handleFileSelect}
        />
      </div>

      <button
        className={styles.sendButton}
        onClick={handleSendMessage}
        disabled={isDisabled}
      >
        <Send size={20} />
      </button>
    </div>
  );
}
