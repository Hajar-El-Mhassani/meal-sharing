"use client";
import { useRouter } from "next/navigation";
export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mb-4 text-sm text-orange-500  dark:text-orange-400 hover:text-orange-700  dark:border-orange-400 px-4 py-2 rounded"
    >
      ← Back to meals
    </button>
  );
}
