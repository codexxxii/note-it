import { getFolder } from "@/server/actions";
import { Pen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await getFolder(slug);

  if (!data) return notFound();
  return (
    <div>
      <div className="w-full h-32 flex justify-between items-center">
        <p className="text-5xl font-semibold tracking-tighter">{data.name}</p>
        <Link href={`/write/${slug}`}>
          <button className="p-0! w-7 h-7 grid place-items-center hover:bg-black hover:text-white">
            <Pen size={15} />
          </button>
        </Link>
      </div>
    </div>
  );
}
