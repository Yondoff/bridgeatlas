import Image from "next/image";

export default function PhotoCard(props: {
  url: string;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
}) {
  return (
    <div className="rounded-[28px] bg-paper/70 border border-black/10 overflow-hidden">
      <div className="relative h-[220px] sm:h-[280px]">
        <Image
          src={props.url}
          alt={props.caption ?? "Bridge photo"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 720px"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
        {props.caption ? (
          <div className="absolute left-4 bottom-3 text-white/95 text-sm font-semibold">
            {props.caption}
          </div>
        ) : null}
      </div>

      {(props.credit || props.sourceUrl) ? (
        <div className="px-5 py-4 text-xs text-ink/60">
          {props.credit ? <span>Credit: {props.credit}</span> : null}
          {props.credit && props.sourceUrl ? <span> • </span> : null}
          {props.sourceUrl ? (
            <a className="text-accent font-semibold hover:text-accentDeep" href={props.sourceUrl} target="_blank" rel="noreferrer">
              Source
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
