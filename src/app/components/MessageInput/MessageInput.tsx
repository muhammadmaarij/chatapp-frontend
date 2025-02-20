"use client";
import styles from "./MessageInput.module.scss";
import { useState } from "react";
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
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BoldExtension from "@tiptap/extension-bold";
import ItalicExtension from "@tiptap/extension-italic";
import CodeExtension from "@tiptap/extension-code";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";

interface MessageInputProps {
  conversationId: string;
}

export default function MessageInput({ conversationId }: MessageInputProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { socket } = useSocket();
  const { mutate: sendMessage, isPending } = useSendMessage(conversationId);
  const { mutate: sendMediaMessage, isPending: isMediaSending } = useSendMediaMessage(conversationId);

  // ✅ Tiptap Editor setup
  const editor = useEditor({
    extensions: [
      StarterKit,
      BoldExtension,
      ItalicExtension,
      CodeExtension,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: styles.editorInput, // ✅ Apply custom styles
      },
    },
    onUpdate: ({ editor }) => {
      // Trim empty content from editor
      if (editor.getText().trim() === "") {
        editor.commands.clearContent();
      }
    },
  });

  // ✅ Send message when pressing Enter (without Shift)
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents new line
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!editor) return;

    const message = editor.getHTML().trim();
    if (!message && selectedFiles.length === 0) return;

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append("conversation_id", conversationId);
      formData.append("caption", message || "");

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      sendMediaMessage(formData, {
        onSuccess: () => {
          setSelectedFiles([]);
          editor.commands.clearContent();
        },
      });
    } else {
      sendMessage({ type: "text", content: message || "" }, {
        onSuccess: () => editor.commands.clearContent(),
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
      {/* ✅ Toolbar for Formatting */}
      <div className={styles.toolbar}>
        <button onClick={() => editor?.chain().focus().toggleBold().run()}>
          <Bold size={16} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <Italic size={16} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleCode().run()}>
          <Code size={16} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          <List size={16} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={16} />
        </button>
      </div>

      {/* ✅ Rich Text Input */}
      <div className={styles.editorContainer}>
        {editor && <EditorContent editor={editor} onKeyDown={handleKeyDown} />}
      </div>

      {/* ✅ Image Previews */}
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

      {/* ✅ Bottom Toolbar (Emojis, Attachments) */}
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
