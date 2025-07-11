"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";

export default function MealFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("title") || "");
  const [sortKey, setSortKey] = useState(searchParams.get("sortKey") || "");
  const [sortDir, setSortDir] = useState(searchParams.get("sortDir") || "asc");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("title", search);
    if (sortKey) params.set("sortKey", sortKey);
    if (sortDir) params.set("sortDir", sortDir);
    router.push(`/meals?${params.toString()}`);
  }, [search, sortKey, sortDir]);

  const handleReset = () => {
    setSearch("");
    setSortKey("");
    setSortDir("");
    router.push("/meals");
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-center items-center mt-10 gap-7 mb-6">
      {/* Input + Icon */}
      <div className="relative w-[170px]">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search meals..."
          className="w-full px-3 py-[7px]  rounded-md shadow-sm focus:ring-2 focus:ring-orange-400"
        />
        <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Sort by */}
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        className={`w-[160px] px-3 py-[9px]  rounded-md shadow-sm focus:ring-2 focus:ring-orange-400 ${
          sortKey === "" ? "text-gray-400" : "text-gray-700"
        }`}
      >
        <option value="" className="text-gray-400" disabled>
          Sort by
        </option>
        <option value="price">Price</option>
        <option value="when">Date</option>
        <option value="title">Title</option>
      </select>

      {/* Sort direction */}
      <select
        value={sortDir}
        onChange={(e) => setSortDir(e.target.value)}
        className={`w-[160px] px-3 py-[9px]  rounded-md shadow-sm focus:ring-2 focus:ring-orange-400 ${
          sortDir === "" ? "text-gray-400" : "text-gray-700"
        }`}
      >
        <option value="" className="text-gray-400" disabled>
          Sort direction
        </option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-[160px] flex items-center justify-center gap-1 bg-red-100 text-red-600 hover:bg-red-200 font-semibold px-3 py-[9px] rounded-md text-sm shadow-sm"
      >
        <MdRefresh />
        Reset
      </button>
    </div>
  );
}
