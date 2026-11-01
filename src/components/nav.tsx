import { Show, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import { ArrowRight } from "lucide-react";

export default function Nav() {
  return (
    <header className="w-full h-20">
      <MaxWidthWrapper className="h-full flex justify-between items-center">
        <Link href="/" className="text-3xl font-semibold tracking-tighter">
          NoteIt
        </Link>
        <nav className="flex items-center gap-2.5">
          <Suspense>
            <Show when={"signed-in"}>
              <Link href="/files">
                <button className="border-transparent hover:underline">
                  Files
                </button>
              </Link>
              <Link href="/folders">
                <button className="border-transparent hover:underline">
                  Folders
                </button>
              </Link>
              <SignOutButton>
                <button className="border-red-800 bg-red-200 text-red-800">
                  Sign Out
                </button>
              </SignOutButton>
            </Show>
            <Show when={"signed-out"}>
              <SignInButton mode="modal" forceRedirectUrl={"/auth-callback"}>
                <button>Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal" forceRedirectUrl={"/auth-callback"}>
                <button className="border-black flex items-center gap-2 bg-black text-white">
                  Get Started <ArrowRight size={12} />
                </button>
              </SignUpButton>
            </Show>
          </Suspense>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}
