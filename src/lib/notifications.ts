export type AppNotification = {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  createdAt: string;
  read: boolean;
};

const NOTIFICATIONS_KEY = "satuurusan_notifications";

export function getNotifications(): AppNotification[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(NOTIFICATIONS_KEY);
    return raw ? JSON.parse(raw) as AppNotification[] : [];
  } catch {
    return [];
  }
}

export function addNotification(notification: Omit<AppNotification, "id" | "createdAt" | "read">) {
  if (typeof window === "undefined") return;
  const next: AppNotification = {
    ...notification,
    id: `notification_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([next, ...getNotifications()]));
  window.dispatchEvent(new CustomEvent("satuurusan-notifications-changed"));
}

export function markAllNotificationsRead() {
  if (typeof window === "undefined") return;
  const updated = getNotifications().map((notification) => ({ ...notification, read: true }));
  window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent("satuurusan-notifications-changed"));
}
