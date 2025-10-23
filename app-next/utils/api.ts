const api = (route: string): string => {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_API_URL");
  return `${base}/api${route}`;
};
export default api;
