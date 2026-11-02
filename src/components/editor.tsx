"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Dispatch, SetStateAction } from "react";
import { Block } from "@blocknote/core";

type EditorProps = {
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
};

export default function Editor({ value, onChange, onBlur }: EditorProps) {
  const editor = useCreateBlockNote({
    initialContent: value?.length ? value : undefined,
  });

  return (
    <div onBlur={onBlur}>
      <BlockNoteView
        style={{ background: "#f9f9f9" }}
        editor={editor}
        onChange={() => onChange(JSON.stringify(editor.document))}
        theme={{
          colors: { editor: { background: "#f9f9f9", text: "#28282b" } },
        }}
      />
    </div>
  );
}
