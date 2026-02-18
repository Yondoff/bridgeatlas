import React from "react";

type Props = {
  codes: string[]; // ISO-3166 alpha-2 (e.g. US, FR)
  className?: string;
};

function wrap(children: React.ReactNode) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  );
}

import { countryNameFromCode } from "@/lib/countries";

function FlagTile(props: { children: React.ReactNode; code: string }) {
  const name = countryNameFromCode(props.code);
  return (
    <div
      className="h-7 w-10 sm:h-8 sm:w-12 rounded-[10px] overflow-hidden border border-black/10 bg-white/60 shadow-sm"
      aria-label={name}
      title={name}
    >
      {props.children}
    </div>
  );
}

function UnknownFlag(props: { code: string }) {
  return (
    <div className="h-full w-full grid place-items-center text-[10px] font-semibold text-ink/60">
      {props.code}
    </div>
  );
}

function FlagSVG(props: { code: string }) {
  const code = props.code.toUpperCase();

  // Minimal set for current dataset. Add more as needed.
  switch (code) {
    case "FR":
      return (
        <svg viewBox="0 0 3 2" className="h-full w-full">
          <rect width="1" height="2" x="0" y="0" fill="#0055A4" />
          <rect width="1" height="2" x="1" y="0" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" y="0" fill="#EF4135" />
        </svg>
      );
    case "US":
      return (
        <svg viewBox="0 0 190 100" className="h-full w-full">
          <rect width="190" height="100" fill="#fff" />
          {Array.from({ length: 13 }).map((_, i) => (
            <rect
              key={i}
              x="0"
              y={(100 / 13) * i}
              width="190"
              height={100 / 13}
              fill={i % 2 === 0 ? "#B22234" : "#fff"}
            />
          ))}
          <rect x="0" y="0" width="76" height="53.8" fill="#3C3B6E" />
          {/* simple star dots */}
          {Array.from({ length: 9 }).flatMap((_, row) =>
            Array.from({ length: row % 2 === 0 ? 6 : 5 }).map((_, col) => {
              const dx = row % 2 === 0 ? 6 : 11;
              const x = dx + col * 12;
              const y = 6 + row * 6;
              return <circle key={`${row}-${col}`} cx={x} cy={y} r={1.4} fill="#fff" />;
            })
          )}
        </svg>
      );
    case "GB":
      // simplified Union Jack (stylized)
      return (
        <svg viewBox="0 0 60 30" className="h-full w-full">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 60,30 M60,0 0,30" stroke="#FFF" strokeWidth="6" />
          <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3" />
          <path d="M30 0v30 M0 15h60" stroke="#FFF" strokeWidth="10" />
          <path d="M30 0v30 M0 15h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );
    case "CN":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#DE2910" />
          <polygon
            points="6,3 7,6 10,6 7.6,7.8 8.6,11 6,9 3.4,11 4.4,7.8 2,6 5,6"
            fill="#FFDE00"
          />
        </svg>
      );
    case "JP":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#fff" />
          <circle cx="15" cy="10" r="6" fill="#BC002D" />
        </svg>
      );
    case "AU":
      return (
        <svg viewBox="0 0 60 30" className="h-full w-full">
          <rect width="60" height="30" fill="#012169" />
          <circle cx="45" cy="15" r="6" fill="#fff" opacity="0.9" />
          <circle cx="45" cy="15" r="3" fill="#fff" />
        </svg>
      );
    case "PT":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="12" height="20" x="0" y="0" fill="#006600" />
          <rect width="18" height="20" x="12" y="0" fill="#FF0000" />
          <circle cx="12" cy="10" r="4" fill="#FFCC00" opacity="0.9" />
        </svg>
      );
    case "CA":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="7" height="20" x="0" y="0" fill="#D80621" />
          <rect width="16" height="20" x="7" y="0" fill="#fff" />
          <rect width="7" height="20" x="23" y="0" fill="#D80621" />
          <polygon
            points="15,5 16,8 19,8 16.6,9.6 17.6,12.8 15,11 12.4,12.8 13.4,9.6 11,8 14,8"
            fill="#D80621"
          />
        </svg>
      );
    case "IN":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="6.67" y="0" fill="#FF9933" />
          <rect width="30" height="6.67" y="6.67" fill="#fff" />
          <rect width="30" height="6.67" y="13.33" fill="#128807" />
          <circle cx="15" cy="10" r="2.2" fill="#000080" opacity="0.85" />
        </svg>
      );
    case "IT":
      return (
        <svg viewBox="0 0 3 2" className="h-full w-full">
          <rect width="1" height="2" x="0" y="0" fill="#009246" />
          <rect width="1" height="2" x="1" y="0" fill="#FFFFFF" />
          <rect width="1" height="2" x="2" y="0" fill="#CE2B37" />
        </svg>
      );
    case "SG":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="10" y="0" fill="#EF3340" />
          <rect width="30" height="10" y="10" fill="#fff" />
          <circle cx="8" cy="6" r="3" fill="#fff" opacity="0.9" />
          <circle cx="9" cy="6" r="2.5" fill="#EF3340" />
        </svg>
      );
    case "CZ":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="10" y="0" fill="#fff" />
          <rect width="30" height="10" y="10" fill="#D7141A" />
          <polygon points="0,0 12,10 0,20" fill="#11457E" />
        </svg>
      );
    case "HU":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="6.67" y="0" fill="#CE2939" />
          <rect width="30" height="6.67" y="6.67" fill="#fff" />
          <rect width="30" height="6.67" y="13.33" fill="#477050" />
        </svg>
      );
    case "TW":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#FE0000" />
          <rect width="14" height="10" fill="#000095" />
          <circle cx="7" cy="5" r="3" fill="#fff" opacity="0.9" />
        </svg>
      );
    case "TH":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="4" y="0" fill="#DA121A" />
          <rect width="30" height="4" y="4" fill="#fff" />
          <rect width="30" height="8" y="8" fill="#241D4F" />
          <rect width="30" height="2" y="16" fill="#fff" />
          <rect width="30" height="2" y="18" fill="#DA121A" />
        </svg>
      );
    case "DE":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="6.67" y="0" fill="#000" />
          <rect width="30" height="6.67" y="6.67" fill="#DD0000" />
          <rect width="30" height="6.66" y="13.34" fill="#FFCE00" />
        </svg>
      );
    case "TR":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#E30A17" />
          <circle cx="12" cy="10" r="5" fill="#fff" />
          <circle cx="13.4" cy="10" r="4" fill="#E30A17" />
          <polygon points="18.8,10 16.7,10.8 17.5,8.7 15.9,10.2 15.4,8.1 14.9,10.2 13.3,8.7 14.1,10.8 12.1,10" fill="#fff" opacity="0.9" />
        </svg>
      );
    case "BR":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#009C3B" />
          <polygon points="15,2 28,10 15,18 2,10" fill="#FFDF00" />
          <circle cx="15" cy="10" r="4.2" fill="#002776" />
          <path d="M11 10c2.2-1.6 5.8-1.6 8 0" stroke="#fff" strokeWidth="1" fill="none" opacity="0.85" />
        </svg>
      );
    case "RU":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="6.67" y="0" fill="#fff" />
          <rect width="30" height="6.67" y="6.67" fill="#0039A6" />
          <rect width="30" height="6.66" y="13.34" fill="#D52B1E" />
        </svg>
      );
    case "EG":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="6.67" y="0" fill="#CE1126" />
          <rect width="30" height="6.67" y="6.67" fill="#fff" />
          <rect width="30" height="6.66" y="13.34" fill="#000" />
          <rect x="14" y="8" width="2" height="4" fill="#C9B037" opacity="0.85" />
        </svg>
      );
    case "MZ":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#007168" />
          <rect width="30" height="6.67" y="0" fill="#1EB53A" />
          <rect width="30" height="6.66" y="13.34" fill="#FCE100" />
          <rect width="30" height="1" y="6.67" fill="#000" opacity="0.9" />
          <rect width="30" height="1" y="13.34" fill="#000" opacity="0.9" />
          <polygon points="0,0 12,10 0,20" fill="#D21034" />
          <polygon points="3.2,10 5.2,10.7 4.5,8.8 6.0,10.0 4.0,10.0 5.5,11.2 4.8,9.3" fill="#FFDA44" opacity="0.9" />
        </svg>
      );
    case "ZA":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="10" y="0" fill="#E03C31" />
          <rect width="30" height="10" y="10" fill="#002395" />
          <path d="M0 0 L12 10 L0 20 Z" fill="#000" />
          <path d="M0 2 L10.5 10 L0 18 Z" fill="#FFB612" />
          <path d="M0 4 L9 10 L0 16 Z" fill="#007A4D" />
          <path d="M8 9 L30 9 L30 11 L8 11 Z" fill="#fff" opacity="0.9" />
          <path d="M8.7 9.6 L30 9.6 L30 10.4 L8.7 10.4 Z" fill="#007A4D" />
        </svg>
      );
    case "BA":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#002395" />
          <polygon points="14,0 30,0 30,20 24,20" fill="#FCD116" />
          {Array.from({ length: 7 }).map((_, i) => (
            <circle key={i} cx={14 + i * 2.2} cy={2 + i * 2.2} r={0.7} fill="#fff" opacity="0.9" />
          ))}
        </svg>
      );
    case "DK":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#C60C30" />
          <rect x="10" width="3" height="20" fill="#fff" />
          <rect y="8" width="30" height="3" fill="#fff" />
        </svg>
      );
    case "SE":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#006AA7" />
          <rect x="9" width="4" height="20" fill="#FECC00" />
          <rect y="8" width="30" height="4" fill="#FECC00" />
        </svg>
      );
    case "DE":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="6.67" y="0" fill="#000" />
          <rect width="30" height="6.67" y="6.67" fill="#DD0000" />
          <rect width="30" height="6.67" y="13.33" fill="#FFCE00" />
        </svg>
      );
    case "TR":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#E30A17" />
          <circle cx="12" cy="10" r="5" fill="#fff" />
          <circle cx="13.4" cy="10" r="4" fill="#E30A17" />
          <polygon points="18,10 20,10.7 19.3,9 20,7.3 18,8 16,7.3 16.7,9 16,10.7" fill="#fff" opacity="0.95" />
        </svg>
      );
    case "BR":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#009B3A" />
          <polygon points="15,3 27,10 15,17 3,10" fill="#FFDF00" />
          <circle cx="15" cy="10" r="4" fill="#002776" />
        </svg>
      );
    case "RU":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="6.67" y="0" fill="#fff" />
          <rect width="30" height="6.67" y="6.67" fill="#0039A6" />
          <rect width="30" height="6.67" y="13.33" fill="#D52B1E" />
        </svg>
      );
    case "EG":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="6.67" y="0" fill="#CE1126" />
          <rect width="30" height="6.67" y="6.67" fill="#fff" />
          <rect width="30" height="6.67" y="13.33" fill="#000" />
          <rect x="14" y="8" width="2" height="4" fill="#C8A200" opacity="0.85" />
        </svg>
      );
    case "MZ":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#007168" />
          <rect width="30" height="6.67" y="0" fill="#007168" />
          <rect width="30" height="6.67" y="6.67" fill="#000" />
          <rect width="30" height="6.67" y="13.33" fill="#FCE100" />
          <polygon points="0,0 12,10 0,20" fill="#D21034" />
          <polygon points="1.5,10 5,8.5 3.5,12" fill="#fff" opacity="0.9" />
        </svg>
      );
    case "ZA":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="10" y="0" fill="#E03C31" />
          <rect width="30" height="10" y="10" fill="#002395" />
          <polygon points="0,0 11,10 0,20" fill="#000" />
          <polygon points="0,2 9,10 0,18" fill="#FFB81C" />
          <polygon points="0,4 7,10 0,16" fill="#007A4D" />
          <polygon points="7,10 30,6 30,8 11,10 30,12 30,14" fill="#fff" opacity="0.9" />
          <polygon points="8,10 30,7.2 30,8.7 12,10 30,11.3 30,12.8" fill="#007A4D" />
        </svg>
      );
    case "BA":
      return (
        <svg viewBox="0 0 30 20" className="h-full w-full">
          <rect width="30" height="20" fill="#002395" />
          <polygon points="10,0 30,0 30,20" fill="#FECB00" />
          {/* simple star dots */}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} cx={11 + i * 2.6} cy={3 + i * 2.6} r={0.7} fill="#fff" opacity="0.9" />
          ))}
        </svg>
      );
    default:
      return <UnknownFlag code={code} />;
  }
}

export default function FlagBadge(props: Props) {
  const tiles = props.codes.slice(0, 2).map((code) => (
    <FlagTile key={code} code={code}>
      <FlagSVG code={code} />
    </FlagTile>
  ));

  return (
    <div className={props.className ?? ""}>
      {wrap(tiles)}
    </div>
  );
}
