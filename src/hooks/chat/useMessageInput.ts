import { useState } from "react";
import { useSendMessage } from "@/hooks/chat/useSendMessage";
import { useSendMediaMessage } from "@/hooks/chat/useSendMediaMessage";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "../../app/components/MessageInput/MessageInput.module.scss";

export const useMessageInput = (conversationId: string) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { mutate: sendMessage, isPending } = useSendMessage(conversationId);
  const { mutate: sendMediaMessage, isPending: isMediaSending } =
    useSendMediaMessage(conversationId);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: { attributes: { class: styles.editorInput } },
    onUpdate: ({ editor }) => {
      if (editor.getText().trim() === "") editor.commands.clearContent();
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!editor) return;

    const isInsideList =
      editor.isActive("bulletList") || editor.isActive("orderedList");

    if (event.key === "Enter" && !event.shiftKey) {
      if (isInsideList) return;
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
      sendMessage(
        { type: "text", content: message || "" },
        { onSuccess: () => editor.commands.clearContent() }
      );
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
    const files = event.target.files;
    if (!files) return;

    setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    editor,
    selectedFiles,
    isPending,
    isMediaSending,
    handleKeyDown,
    handleSendMessage,
    handleFileSelect,
    removeSelectedFile,
  };
};
