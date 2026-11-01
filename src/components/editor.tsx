"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

type EditorProps = {
  initialContent?: string;
  editable?: boolean;
  onChange: () => void;
};

export default function Editor({
  initialContent,
  editable,
  onChange,
}: EditorProps) {
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      onChange={onChange}
      theme={"light"}
    />
  );
}
