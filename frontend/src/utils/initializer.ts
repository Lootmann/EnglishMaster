// what the hell is this file name?
export function initSentenceType(): SentenceType {
  return {
    id: 0,
    text: "",
    translation: "",
    counter: 0,
  };
}

export function initNotificationBarType(): NotificationBarType {
  return {
    handleNotification: () => {},
    message: "",
    color: "",
    durationMs: 0,
  };
}
