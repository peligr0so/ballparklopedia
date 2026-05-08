"use client";

import { useState, useEffect } from "react";
import { getBucketList, toggleBucketList } from "@/lib/bucketList";

interface Props {
  slug: string;
  stadiumName: string;
  size?: "sm" | "lg";
}

export default function BucketListButton({ slug, stadiumName, size = "sm" }: Props) {
  const [inList, setInList] = useState(false);

  useEffect(() => {
    setInList(getBucketList().includes(slug));
  }, [slug]);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleBucketList(slug);
    setInList(updated.includes(slug));
  }

  if (size === "lg") {
    return (
      <button
        onClick={handleClick}
        aria-label={inList ? `Remove ${stadiumName} from bucket list` : `Add ${stadiumName} to bucket list`}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
          inList
            ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
            : "bg-white border-gray-200 text-gray-600 hover:border-amber-300 hover:text-amber-600"
        }`}
      >
        <svg
          className={`w-4 h-4 transition-all ${inList ? "text-amber-500 fill-amber-500" : "text-gray-400"}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={inList ? 0 : 1.5}
          fill={inList ? "currentColor" : "none"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
        {inList ? "On bucket list" : "Add to bucket list"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-label={inList ? `Remove ${stadiumName} from bucket list` : `Add ${stadiumName} to bucket list`}
      title={inList ? "Remove from bucket list" : "Add to bucket list"}
      className={`p-1.5 rounded-full transition-all ${
        inList ? "text-amber-500" : "text-gray-300 hover:text-amber-400"
      }`}
    >
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={inList ? 0 : 1.5}
        fill={inList ? "currentColor" : "none"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </button>
  );
}
