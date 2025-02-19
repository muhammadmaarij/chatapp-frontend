"use client";
import { useState } from "react";
import styles from "./MessageInput.module.scss";
import {
  Send,
  Mic,
  ImageIcon,
  Smile,
  Paperclip,
  Code,
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  X,
} from "lucide-react";
import { useSocket } from "@/context/socketContext";
import { useSendMessage } from "@/hooks/chat/useSendMessage";
import { useSendMediaMessage } from "@/hooks/chat/useSendMediaMessage";

interface MessageInputProps {
  conversationId: string;
}

export default function MessageInput({ conversationId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { socket } = useSocket();

  const { mutate: sendMessage, isPending } = useSendMessage(conversationId);
  const { mutate: sendMediaMessage, isPending: isMediaSending } = useSendMediaMessage(conversationId);

  const handleSendMessage = () => {
    if (!message.trim() && selectedFiles.length === 0) return;

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append("conversation_id", conversationId);
      formData.append("caption", message.trim());

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      sendMediaMessage(formData, {
        onSuccess: () => {
          setSelectedFiles([]); // Clear selected images
          setMessage(""); // Clear input field
        },
      });

    } else {
      sendMessage({ type: "text", content: message.trim() }, {
        onSuccess: () => setMessage(""), // Clear input on success
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.messageInput}>
      <div className={styles.toolbar}>
        <button><Bold size={16} /></button>
        <button><Italic size={16} /></button>
        <button><Code size={16} /></button>
        <button><List size={16} /></button>
        <button><ListOrdered size={16} /></button>
        <button><Link size={16} /></button>
      </div>

      <input
        type="text"
        placeholder="Type a message..."
        className={styles.input}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />

      {selectedFiles.length > 0 && (
        <div className={styles.previewContainer}>
          {selectedFiles.map((file, index) => (
            <div key={index} className={styles.preview}>
              <img src={URL.createObjectURL(file)} alt="Preview" className={styles.imagePreview} />
              <button onClick={() => removeSelectedFile(index)} className={styles.removeButton}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.bottomBar}>
        <div className={styles.toolbar}>
          <button><Smile size={16} /></button>
          <button><Paperclip size={16} /></button>
          <button>
            <label htmlFor="fileInput">
              <ImageIcon size={16} />
            </label>
            <input
              type="file"
              id="fileInput"
              multiple
              accept="image/*"
              className={styles.fileInput}
              onChange={handleFileSelect}
            />
          </button>
          <button><Mic size={16} /></button>
        </div>

        <button className={styles.sendButton} onClick={handleSendMessage} disabled={isPending || isMediaSending}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
