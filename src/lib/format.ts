export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatReadingTime(minutes: number) {
  const rounded = Math.max(1, Math.ceil(minutes));
  return `约${rounded}分钟阅读`;
}
