// what the hell is this file name?
export function initSentenceType(): SentenceType {
  return {
    id: 0,
    text: "",
    num_of_word: 0,
    translation: "",
    counters: [],
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
