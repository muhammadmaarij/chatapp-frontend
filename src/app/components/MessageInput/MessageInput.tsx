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
  List,
  ListOrdered,
  X,
} from "lucide-react";
import { useSocket } from "@/context/socketContext";
import { useSendMessage } from "@/hooks/chat/useSendMessage";
import { useSendMediaMessage } from "@/hooks/chat/useSendMediaMessage";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
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
  const { mutate: sendMessage, isPending } = useSendMessage(conversationId);
  const { mutate: sendMediaMessage, isPending: isMediaSending } = useSendMediaMessage(conversationId);

  const editor = useEditor({
    extensions: [StarterKit, BoldExtension, ItalicExtension, CodeExtension, BulletList, OrderedList, ListItem],
    content: "",
    editorProps: { attributes: { class: styles.editorInput } },
    onUpdate: ({ editor }) => {
      if (editor.getText().trim() === "") editor.commands.clearContent();
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!editor) return;

    const message = editor.getHTML().trim();
    if (!message && selectedFiles.length === 0) return;

    if (selectedFiles.length > 0) {
      sendMediaMessage(buildFormData(message), {
        onSuccess: () => {
          setSelectedFiles([]);
          editor.commands.clearContent();
        },
      });
    } else {
      sendMessage({ type: "text", content: message || "" }, { onSuccess: () => editor.commands.clearContent() });
    }
  };

  const buildFormData = (message: string) => {
    const formData = new FormData();
    formData.append("conversation_id", conversationId);
    formData.append("caption", message || "");
    selectedFiles.forEach((file) => formData.append("files", file));
    return formData;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(event.target.files)]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.messageInput}>
      <Toolbar editor={editor} />

      <div className={styles.editorContainer}>{editor && <EditorContent editor={editor} onKeyDown={handleKeyDown} />}</div>

      {selectedFiles.length > 0 && <ImagePreview selectedFiles={selectedFiles} removeSelectedFile={removeSelectedFile} />}

      <BottomToolbar
        handleFileSelect={handleFileSelect}
        handleSendMessage={handleSendMessage}
        isDisabled={isPending || isMediaSending}
      />
    </div>
  );
}

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  const buttons = [
    { action: () => editor?.chain().focus().toggleBold().run(), icon: <Bold size={16} /> },
    { action: () => editor?.chain().focus().toggleItalic().run(), icon: <Italic size={16} /> },
    { action: () => editor?.chain().focus().toggleCode().run(), icon: <Code size={16} /> },
    { action: () => editor?.chain().focus().toggleBulletList().run(), icon: <List size={16} /> },
    { action: () => editor?.chain().focus().toggleOrderedList().run(), icon: <ListOrdered size={16} /> },
  ];

  return (
    <div className={styles.toolbar}>
      {buttons.map((btn, index) => (
        <button key={index} onClick={btn.action}>
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

const ImagePreview = ({ selectedFiles, removeSelectedFile }: { selectedFiles: File[]; removeSelectedFile: (index: number) => void }) => (
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
);

const BottomToolbar = ({
  handleFileSelect,
  handleSendMessage,
  isDisabled,
}: {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  isDisabled: boolean;
}) => {
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
        <input type="file" id="fileInput" multiple accept="image/*" className={styles.fileInput} onChange={handleFileSelect} />
      </div>

      <button className={styles.sendButton} onClick={handleSendMessage} disabled={isDisabled}>
        <Send size={20} />
      </button>
    </div>
  );
};
