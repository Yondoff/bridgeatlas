import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/map", label: "Map" },
  { href: "/bridges", label: "Bridges" },
  { href: "/rankings", label: "Rankings" },
  { href: "/learn", label: "Learn" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-paper/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="font-extrabold tracking-tight text-ink">
          BridgeAtlas
        </Link>

        <nav className="flex items-center gap-2 flex-wrap justify-end">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink/75 hover:text-ink hover:bg-white/60 border border-transparent hover:border-black/10 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
