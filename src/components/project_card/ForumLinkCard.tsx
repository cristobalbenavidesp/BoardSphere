"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ForumLinkCard() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col mt-5 rounded bg-white p-4 w-full max-w-xs shadow-lg">
      <h2 className="font-bold text-balance text-center">Foro de discusión</h2>
      <Link
        href={`${pathname}/forum`}
        className="mt-2 bg-blue-800 text-white font-semibold self-center rounded-xl p-2"
      >
        Ir al foro
      </Link>
    </div>
  );
}
