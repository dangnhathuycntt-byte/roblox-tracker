export function formatNumber(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000_000) {
    const n = abs / 1_000_000_000;
    return sign + n.toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (abs >= 1_000_000) {
    const n = abs / 1_000_000;
    return sign + n.toFixed(2).replace(/\.?0+$/, "") + "M";
  }
  if (abs >= 10_000) {
    const n = abs / 1_000;
    return sign + n.toFixed(1).replace(/\.0$/, "") + "k";
  }
  return sign + abs.toLocaleString("en-US");
}

export function formatXp(value: number): string {
  return formatNumber(value);
}

export function timeAgo(date: Date | string | null): string {
  if (!date) return "Never";
  const now = new Date();
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
}
