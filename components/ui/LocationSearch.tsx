"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  cityError?: boolean;
}

export default function LocationSearch({ cityError }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (cityError) {
      toast.error("City not found, please try again",{duration:2000});
      router.push("/");
    }
  }, [cityError, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/?city=${encodeURIComponent(query.trim())}`);
  }

  return (
    <>
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="flex items-center w-full max-w-sm mx-auto mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
            className="w-full px-4 py-2 pr-10 rounded-full text-white text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <Image
              src="https://img.icons8.com/?size=100&id=59878&format=png&color=ffffff"
              alt="Search"
              width={18}
              height={18}
              className="opacity-70"
            />
          </button>
        </div>
      </form>
    </>
  );
}