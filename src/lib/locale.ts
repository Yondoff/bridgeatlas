export type Locale = "en" | "fr" | "de" | "es" | "ru" | "ja";

export function localeFromPathname(pathname: string | null | undefined): {
  locale: Locale;
  base: "" | "/fr" | "/de" | "/es" | "/ru" | "/ja";
} {
  const p = pathname || "/";
  if (p === "/fr" || p.startsWith("/fr/")) return { locale: "fr", base: "/fr" };
  if (p === "/de" || p.startsWith("/de/")) return { locale: "de", base: "/de" };
  if (p === "/es" || p.startsWith("/es/")) return { locale: "es", base: "/es" };
  if (p === "/ru" || p.startsWith("/ru/")) return { locale: "ru", base: "/ru" };
  if (p === "/ja" || p.startsWith("/ja/")) return { locale: "ja", base: "/ja" };
  return { locale: "en", base: "" };
}

export function stripLocalePrefix(pathname: string): string {
  let p = pathname;
  for (const prefix of ["/fr", "/de", "/es", "/ru", "/ja"] as const) {
    if (p === prefix) return "/";
    if (p.startsWith(prefix + "/")) return p.replace(new RegExp(`^${prefix}`), "");
  }
  return p;
}

export function withLocalePrefix(pathname: string, base: string): string {
  const stripped = stripLocalePrefix(pathname);
  if (!base) return stripped;
  if (stripped === "/") return base;
  return `${base}${stripped}`;
}
