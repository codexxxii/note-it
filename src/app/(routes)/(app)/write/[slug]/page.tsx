"use client";

import dynamic from "next/dynamic";

export const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

export default function WritePage() {
  return (
    <div className="w-full">
      <div className="w-full min-h-[calc(100vh-160px)] space-y-5 py-5">
        <input
          type="text"
          placeholder="Title"
          className="text-5xl font-semibold tracking-tighter"
        />
        <Editor initialContent="" onChange={() => {}} />
      </div>
      <div className="w-full h-20 flex justify-end items-center">
        <button>Save</button>
      </div>
    </div>
  );
}
