import type { Bridge } from "@/lib/bridges";

export default function CountryLabelRight(props: { bridge: Bridge }) {
  const b = props.bridge;
  const country = b.country.toUpperCase();
  const city = (b.city ?? "").toUpperCase();

  return (
    <div className="hidden lg:block pointer-events-none absolute right-10 top-24">
      <div className="text-right">
        <div
          className="text-[46px] leading-[0.95] tracking-[0.10em] text-accentDeep"
          style={{ fontFamily: "var(--font-condensed)" }}
        >
          <span className="font-light">{country}</span>
        </div>
        {city ? (
          <div
            className="mt-2 text-[20px] tracking-[0.22em] text-accentDeep/90"
            style={{ fontFamily: "var(--font-condensed)" }}
          >
            <span className="font-light">{city}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
