"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { Trash } from "lucide-react";
import { deleteFolder } from "@/server/actions";

export default function DeleteFolderButton({ folderId }: { folderId: string }) {
  const [active, setActive] = useState(false);

  return (
    <>
      <button
        className="p-0! w-7 h-7 grid place-items-center bg-red-200 text-red-800 border-red-800"
        onClick={() => setActive(true)}
      >
        <Trash size={15} />
      </button>
      {active && (
        <DeleteFolderModal folderId={folderId} setActive={setActive} />
      )}
    </>
  );
}

function DeleteFolderModal({
  folderId,
  setActive,
}: {
  folderId: string;
  setActive: Dispatch<SetStateAction<boolean>>;
}) {
  const onClick = async () => {
    await deleteFolder(folderId);
  };

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div
        className="bg-[#f9f9f9]/10 backdrop-blur-sm absolute inset-0"
        onClick={() => setActive(false)}
      />
      <div className="relative z-1000 w-full max-w-2xl border border-gray-200 p-5 bg-[#f9f9f9] space-y-5">
        <div>
          <p className="text-lg font-semibold">Delete folder</p>
          <p className="text-sm text-gray-400">This action cannot be undone</p>
        </div>
        <div className="w-full flex justify-evenly items-center gap-2.5">
          <button
            type="button"
            className="w-1/4 bg-red-200 text-red-800 border-red-800"
            onClick={() => setActive(false)}
          >
            Cancel
          </button>
          <button
            className="w-1/4 bg-[#28282b] border-[#28282b] text-[#f9f9f9]"
            onClick={onClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
