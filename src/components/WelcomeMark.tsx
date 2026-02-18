export default function WelcomeMark() {
  return (
    <div className="relative rounded-[36px] bg-paper/70 border border-black/10 overflow-hidden">
      <svg viewBox="0 0 720 360" className="h-[180px] w-full">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="1" stopColor="rgba(246,241,230,0.9)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="720" height="360" fill="url(#bg)" />

        {/* sun */}
        <circle cx="585" cy="80" r="34" fill="rgba(217,118,39,0.18)" />
        <circle cx="585" cy="80" r="16" fill="rgba(217,118,39,0.26)" />

        {/* stylized arches */}
        <path
          d="M90 260 C170 150, 280 150, 360 260 C440 150, 550 150, 630 260"
          fill="none"
          stroke="rgba(181,95,29,0.70)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* deck */}
        <path
          d="M70 260 H650"
          fill="none"
          stroke="rgba(31,35,40,0.55)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* little notes */}
        <path
          d="M110 105 h120"
          stroke="rgba(31,35,40,0.18)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M110 135 h170"
          stroke="rgba(31,35,40,0.14)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute left-5 top-5 rounded-full bg-white/65 border border-black/10 px-3 py-1 text-[11px] font-semibold text-ink/70">
        BridgeAtlas
      </div>
    </div>
  );
}
