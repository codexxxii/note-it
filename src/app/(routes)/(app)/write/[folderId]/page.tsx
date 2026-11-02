"use client";

import dynamic from "next/dynamic";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchema, type FileSchema } from "@/lib/types";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createFile } from "@/server/actions";

export const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

export default function WritePage() {
  const params = useParams<{ folderId: string }>();

  const form = useForm<FileSchema>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      folder_id: params.folderId,
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: FileSchema) => {
    const newFile = await createFile(values);

    if (newFile.success) {
      toast.success("Saved");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full min-h-[calc(100vh-160px)] space-y-5 py-5">
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <input
                type="text"
                placeholder="Title"
                className="text-5xl font-semibold tracking-tighter w-full outline-none placeholder:text-[#28282b]"
                {...field}
              />
            )}
          />
          <Controller
            name="content"
            control={form.control}
            render={({ field }) => (
              <Editor
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
        <div className="w-full h-20 flex justify-end items-center">
          <button
            type="submit"
            className={cn(
              "border-[#28282b]",
              form.formState.isValid && "bg-[#28282b] text-[#f9f9f9]",
            )}
          >
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
