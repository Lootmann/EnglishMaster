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
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNotification();
    }, Number(durationMs));

    return () => {
      clearTimeout(timer);
    };
  }, [now]);

  return (
    <div className="absolute top-0 h-20 w-3/4 bg-slate-400">
      {message} {color} {durationMs}
    </div>
  );
}
