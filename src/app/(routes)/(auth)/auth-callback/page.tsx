import { authCallback } from "@/server/actions";

export default async function AuthCallbackPage() {
  await authCallback();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <div className="w-7 h-7 rounded-full border-2 border-gray-400 border-r-transparent!" />
      <div className="text-center">
        <p className="text-xl font-semibold">Signing you in</p>
        <p className="text-xs text-gray-400">
          You will be redirected automatically
        </p>
      </div>
    </div>
  );
}
