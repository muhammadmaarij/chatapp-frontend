"use client";
import { useEffect, useState } from "react";
import { ToolbarProps } from "@/types/components/types";
import styles from "./Toolbar.module.scss";
import { Bold, Italic, Code, List, ListOrdered } from "lucide-react";

export default function Toolbar({ editor }: ToolbarProps) {
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (!editor) return;

    const updateActiveFormats = () => {
      setActiveFormats({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        code: editor.isActive("code"),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
      });
    };

    editor.on("selectionUpdate", updateActiveFormats);
    editor.on("transaction", updateActiveFormats);

    return () => {
      editor.off("selectionUpdate", updateActiveFormats);
      editor.off("transaction", updateActiveFormats);
    };
  }, [editor]);

  if (!editor) return null;

  const toolbarButtons = [
    {
      type: "bold",
      action: () => editor.chain().focus().toggleBold().run(),
      icon: Bold,
    },
    {
      type: "italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      icon: Italic,
    },
    {
      type: "code",
      action: () => editor.chain().focus().toggleCode().run(),
      icon: Code,
    },
    {
      type: "bulletList",
      action: () => editor.chain().focus().toggleBulletList().run(),
      icon: List,
    },
    {
      type: "orderedList",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      icon: ListOrdered,
    },
  ];

  return (
    <div className={styles.toolbar}>
      {toolbarButtons.map(({ type, action, icon: Icon }, index) => (
        <button
          key={index}
          onClick={action}
          className={activeFormats[type] ? styles.active : ""}
        >
          <Icon size={16} color={activeFormats[type] ? "#0077cc" : "#5b7083"} />
        </button>
      ))}
    </div>
  );
}
