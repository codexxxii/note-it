import CreateFolderButton from "@/components/modals/folders/create-folder-button";
import { getFolders } from "@/server/actions";
import { Suspense } from "react";
import Link from "next/link";

export default function FoldersPage() {
  return (
    <div className="py-5">
      <div className="w-full h-32 flex justify-between items-center">
        <p className="text-5xl font-semibold tracking-tighter">Folders</p>
        <CreateFolderButton />
      </div>
      <Suspense fallback={<Fallback />}>
        <Folders />
      </Suspense>
    </div>
  );
}

async function Folders() {
  const data = await getFolders();

  return (
    <>
      {data.length < 1 ? (
        <div className="w-full h-44 grid place-items-center">
          <p className="text-sm text-gray-400">No folders</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-5 gap-2.5 place-items-start">
          {data.map((folder) => (
            <Link
              href={`/folders/${folder.id}`}
              key={folder.id}
              className="w-full h-44 border border-gray-200 flex justify-start items-end p-2.5 transition-all ease-in-out duration-500 hover:border-[#28282b] hover:bg-[#28282b] hover:text-[#f9f9f9]"
            >
              <p className="font-semibold text-lg">{folder.name}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

function Fallback() {
  return (
    <div className="w-full grid grid-cols-5 gap-2.5 palce-items-start">
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className="w-full h-44 bg-[#28282b]/5 animate-pulse" />
      ))}
    </div>
  );
}
