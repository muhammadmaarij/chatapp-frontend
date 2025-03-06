"use client";
import styles from "./MessageInput.module.scss";
import Toolbar from "./components/Toolbar/Toolbar";
import ImagePreview from "./components/ImagePreview/ImagePreview";
import BottomToolbar from "./components/BottomToolbar/BottomToolbar";
import { MessageInputProps } from "@/types/components/types";
import { useMessageInput } from "@/hooks/chat/useMessageInput";
import { EditorContent } from "@tiptap/react";

export default function MessageInput({ conversationId }: MessageInputProps) {
  const {
    editor,
    selectedFiles,
    isPending,
    isMediaSending,
    handleKeyDown,
    handleSendMessage,
    handleFileSelect,
    removeSelectedFile,
  } = useMessageInput(conversationId);

  return (
    <div className={styles.messageInput}>
      <Toolbar editor={editor} />
      <div className={styles.editorContainer}>
        {editor && <EditorContent editor={editor} onKeyDown={handleKeyDown} />}
      </div>
      <ImagePreview
        selectedFiles={selectedFiles}
        removeSelectedFile={removeSelectedFile}
      />
      <BottomToolbar
        handleFileSelect={handleFileSelect}
        handleSendMessage={handleSendMessage}
        isDisabled={isPending || isMediaSending}
      />
    </div>
  );
}
