"use client";

import Image from "next/image";

export function BrandMark({
  className = "",
  size = "normal",
}: {
  className?: string;
  size?: "sm" | "normal" | "lg";
}) {
  const sizeClasses = {
    sm: "w-9 h-9",
    normal: "w-12 h-12 sm:w-14 sm:h-14",
    lg: "w-16 h-16 sm:w-20 sm:h-20",
  }[size] || "w-12 h-12 sm:w-14 sm:h-14";

  const pixelDimensions = {
    sm: 40,
    normal: 64,
    lg: 80,
  }[size] || 64;

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0 ${sizeClasses} ${className}`}
    >
      <Image
        src="/logo.png"
        alt="SatuUrusan Logo"
        width={pixelDimensions}
        height={pixelDimensions}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}