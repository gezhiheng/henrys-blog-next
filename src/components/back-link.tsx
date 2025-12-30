"use client";

import { useRouter } from "next/navigation";

type BackLinkProps = {
  fallbackHref?: string;
  className?: string;
  label?: string;
  ariaLabel?: string;
};

export default function BackLink({
  fallbackHref = "/",
  className,
  label = "> cd ..",
  ariaLabel = "返回",
}: BackLinkProps) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
}
