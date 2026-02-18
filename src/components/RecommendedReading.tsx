import type { Bridge } from "@/lib/bridges";
import config from "@/content/recommendedReading.json";

type Book = {
  title: string;
  author?: string;
  url: string;
};

type ReadingConfig = {
  title: string;
  subtitle?: string;
  default: Book[];
  byType?: Partial<Record<Bridge["type"], Book[]>>;
};

const readingConfig = config as ReadingConfig;

function getBooksForType(type: Bridge["type"]): Book[] {
  const specific = readingConfig.byType?.[type] ?? [];
  // Merge type-specific first, then fall back to defaults.
  const merged = [...specific, ...(readingConfig.default ?? [])];

  // Deduplicate by URL/title to avoid repeats.
  const seen = new Set<string>();
  const deduped: Book[] = [];
  for (const b of merged) {
    const key = `${b.url}::${b.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(b);
  }
  return deduped;
}

export default function RecommendedReading(props: { bridge: Bridge }) {
  const books = getBooksForType(props.bridge.type).slice(0, 3);

  return (
    <div className="rounded-[28px] bg-paper/70 border border-black/10 p-6">
      <div className="text-sm font-semibold">{readingConfig.title}</div>
      {readingConfig.subtitle ? (
        <p className="mt-2 text-xs text-ink/60 max-w-2xl leading-6">
          {readingConfig.subtitle}
        </p>
      ) : null}

      <ul className="mt-4 space-y-2 text-sm">
        {books.map((book) => (
          <li key={book.url}>
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-accent font-semibold hover:text-accentDeep"
            >
              {book.title}
            </a>
            {book.author ? <span className="text-ink/60"> — {book.author}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
