import type { Bridge } from "@/lib/bridges";

type Book = {
  title: string;
  author?: string;
  url: string;
};

function booksForBridge(b: Bridge): Book[] {
  // Clean, broadly relevant civil/structural references.
  // Note: URLs are plain outbound links; you can add affiliate parameters later.
  const general: Book[] = [
    {
      title: "Bridge Engineering",
      author: "Demetrios E. Tonias, Jim J. Zhao",
      url: "https://www.amazon.com/s?k=Bridge+Engineering+Tonias+Zhao",
    },
    {
      title: "Design of Highway Bridges: An LRFD Approach",
      author: "Richard M. Barker, Jay A. Puckett",
      url: "https://www.amazon.com/s?k=Design+of+Highway+Bridges+LRFD+Barker+Puckett",
    },
    {
      title: "Structural Analysis",
      author: "R. C. Hibbeler",
      url: "https://www.amazon.com/s?k=Hibbeler+Structural+Analysis",
    },
  ];

  if (b.type === "suspension" || b.type === "cable-stayed") {
    return [
      {
        title: "Wind Effects on Structures",
        author: "Emil Simiu, Robert H. Scanlan",
        url: "https://www.amazon.com/s?k=Wind+Effects+on+Structures+Simiu+Scanlan",
      },
      ...general.slice(0, 2),
    ];
  }

  return general;
}

export default function RecommendedReading(props: { bridge: Bridge }) {
  const books = booksForBridge(props.bridge).slice(0, 3);

  return (
    <div className="rounded-[28px] bg-paper/70 border border-black/10 p-6">
      <div className="text-sm font-semibold">Recommended Reading</div>
      <p className="mt-2 text-xs text-ink/60 max-w-2xl leading-6">
        If you want to go deeper than specs, these are solid civil/structural references.
      </p>

      <ul className="mt-4 space-y-2 text-sm">
        {books.map((book) => (
          <li key={book.title}>
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-accent font-semibold hover:text-accentDeep"
            >
              {book.title}
            </a>
            {book.author ? (
              <span className="text-ink/60"> — {book.author}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
