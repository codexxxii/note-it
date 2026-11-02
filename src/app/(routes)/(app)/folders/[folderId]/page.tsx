import DeleteFileButton from "@/components/modals/files/delete-file-button";
import DeleteFolderButton from "@/components/modals/folders/delete-folder-button";
import { getFolder } from "@/server/actions";
import { Pen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;

  const data = await getFolder(folderId);

  if (!data) return notFound();
  return (
    <div className="py-5">
      <div className="w-full h-32 flex justify-between items-center">
        <p className="text-5xl font-semibold tracking-tighter">{data.name}</p>
        <div className="flex items-center gap-2.5">
          <Link href={`/write/${folderId}`}>
            <button className="p-0! w-7 h-7 grid place-items-center transition-all ease-in-out duration-500 hover:bg-[#28282b] hover:text-[#f9f9f9]">
              <Pen size={15} />
            </button>
          </Link>
          <DeleteFolderButton folderId={folderId} />
        </div>
      </div>
      {data.files.length < 1 ? (
        <div className="w-full h-44 grid place-items-center">
          <p className="text-sm text-gray-400">No files</p>
        </div>
      ) : (
        <>
          <div className="w-full h-12 flex border-b border-b-gray-200">
            <div className="w-2/5 flex justify-start items-center">
              <p>Title</p>
            </div>
            <div className="w-1/5 grid place-items-center">
              <p>Created at</p>
            </div>
            <div className="w-1/5 grid place-items-center">
              <p>Updated at</p>
            </div>
            <div className="w-1/5 flex justify-end items-center">Delete</div>
          </div>
          {data.files.map((file) => (
            <div
              className="w-full h-12 flex border-b border-b-gray-200"
              key={file.id}
            >
              <div className="w-2/5 flex justify-start items-center">
                <Link href={`/files/${file.id}`} className="hover:underline">
                  {file.title}
                </Link>
              </div>
              <div className="w-1/5 grid place-items-center">
                <p className="text-sm">
                  {Intl.DateTimeFormat("US-en", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  }).format(file.created_at as Date)}
                </p>
              </div>
              <div className="w-1/5 grid place-items-center">
                <p className="text-sm">
                  {Intl.DateTimeFormat("US-en", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  }).format(file.updated_at as Date)}
                </p>
              </div>
              <div className="w-1/5 flex justify-end items-center">
                <DeleteFileButton fileId={file.id} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
