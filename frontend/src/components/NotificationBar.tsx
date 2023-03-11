import { useEffect, useState } from "react";

/**
 * NotificationBar
 * show notification
 *
 * @param {NotificationBarType}
 */
export function NotificationBar({
  handleNotification,
  message,
  color,
  durationMs,
}: NotificationBarType) {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNotification();
    }, Number(durationMs));

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{ backgroundColor: color }}
      className="absolute top-0 right-0 w-3/5 p-1 pl-5 text-3xl bg-slate-400 text-black rounded-md animate-slide-in-top"
    >
      {message}
    </div>
  );
}
