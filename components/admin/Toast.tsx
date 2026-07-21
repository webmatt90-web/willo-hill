"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

export type ToastState = { kind: "success" | "error"; text: string } | null;

type ToastProps = {
  toast: ToastState;
  onClear: () => void;
};

export default function Toast({ toast, onClear }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClear, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClear]);

  if (!toast) return null;

  return (
    <div
      role="status"
      className={cn(
        "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-sm px-6 py-3 text-sm font-semibold text-white shadow-lg",
        toast.kind === "success" ? "bg-green-700" : "bg-red-700"
      )}
    >
      {toast.text}
    </div>
  );
}
