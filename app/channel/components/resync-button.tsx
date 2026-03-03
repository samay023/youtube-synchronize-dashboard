"use client";

import { useState } from "react";

interface Props {
  id: string;
}

export default function ResyncButton({ id }: Props) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onResync = async () => {
    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetch(`/channel/sync-channel?channelId=${id}`, {
        method: "POST",
      });
      const payload = await response.json();

      setMessage(payload?.message ?? "Completed");
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Failed to sync");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold cursor-pointer rounded-md w-40 p-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={onResync}
        type="button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Syncing..." : "Resync"}
      </button>
      {!!message && <span className="text-xs text-gray-600">{message}</span>}
    </div>
  );
}
