"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-White">
      <h1 className="text-9xl font-extrabold tracking-widest text-Black">
        404
      </h1>
      <div className="absolute rotate-12 rounded bg-Primary px-2 text-sm">
        Page Not Found
      </div>
      <Link
        href="/"
        className="group relative mt-5 inline-block text-sm font-medium text-Primary focus:outline-none focus:ring active:text-orange-500"
      >
        <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-Primary transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="relative block border border-current bg-[#1A2238] px-8 py-3">
          Go Home
        </span>
      </Link>
    </main>
  );
}
