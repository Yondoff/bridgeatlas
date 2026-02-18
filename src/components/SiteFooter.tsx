import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-paper/60">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="font-extrabold tracking-tight text-ink">BridgeAtlas</div>
            <p className="mt-2 text-sm text-ink/70 leading-6 max-w-md">
              An independent project: a curated engineering atlas of the world’s greatest bridges.
              Not affiliated with any institution.
            </p>
          </div>

          <div className="sm:text-right">
            <div className="text-xs font-semibold tracking-wide text-ink/60">LINKS</div>
            <div className="mt-3 flex sm:justify-end flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link className="text-accent font-semibold hover:text-accentDeep" href="/">
                Home
              </Link>
              <Link className="text-accent font-semibold hover:text-accentDeep" href="/bridges">
                Bridges
              </Link>
              <Link className="text-accent font-semibold hover:text-accentDeep" href="/rankings">
                Rankings
              </Link>
              <Link className="text-accent font-semibold hover:text-accentDeep" href="/learn">
                Learn
              </Link>
              <Link className="text-accent font-semibold hover:text-accentDeep" href="/map">
                Map
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-ink/55">
          <div>
            © {new Date().getFullYear()} BridgeAtlas • Independent project
          </div>
          <div>
            Photos & data credits are shown on each bridge page.
          </div>
        </div>

        <div className="mt-3 text-[11px] text-ink/50 leading-5">
          Some links may be affiliate links. We may earn a commission at no additional cost to you.
        </div>
      </div>
    </footer>
  );
}
