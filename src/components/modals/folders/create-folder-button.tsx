"use client";

import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { folderSchema, FolderSchema } from "@/lib/types";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFolder } from "@/server/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function CreateFolderButton() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button
        className="p-0! w-7 h-7 grid place-items-center transition-all ease-in-out duration-500 hover:bg-[#29292b] hover:text-[#f9f9f9]"
        onClick={() => setActive(true)}
      >
        <Plus size={15} />
      </button>
      {active && <CreateFolderModal setActive={setActive} />}
    </>
  );
}

function CreateFolderModal({
  setActive,
}: {
  setActive: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<FolderSchema>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: FolderSchema) => {
    const newFolder = await createFolder(values);

    if (newFolder.success) {
      toast.success("Folder created");
      form.reset();
      setActive(false);
    }
  };

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div
        className="bg-[#f9f9f9]/10 backdrop-blur-sm absolute inset-0"
        onClick={() => setActive(false)}
      />
      <FormProvider {...form}>
        <form
          className="relative z-1000 w-full max-w-2xl border border-gray-200 p-5 bg-[#f9f9f9] space-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <p className="text-lg font-semibold">Folder name</p>
            <p className="text-sm text-gray-400">
              Give your folder a descriptive name
            </p>
          </div>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <input
                type="text"
                className={cn(
                  "w-full px-3 py-1.5 border border-gray-200 outline-none",
                  form.formState.errors.name && "border-red-800",
                )}
                {...field}
              />
            )}
          />
          <div className="w-full flex justify-end items-center gap-2.5">
            <button
              type="button"
              className="bg-red-200 text-red-800 border-red-800"
              onClick={() => setActive(false)}
            >
              Cancel
            </button>
            <button
              className="bg-[#28282b] border-[#28282b] text-[#f9f9f9]"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
