export type Bridge = {
  slug: string;
  name: string;
  country: string;
  city?: string;
  type:
    | "suspension"
    | "cable-stayed"
    | "arch"
    | "beam"
    | "truss"
    | "viaduct"
    | "other";
  yearOpened?: number;

  /** Coordinates for the world map (lon/lat). */
  coordinates: { lon: number; lat: number };

  /** True when coords are approximate (city-level) rather than exact bridge centerline. */
  coordinatesApprox?: boolean;

  // Short, readable paragraph (should be grounded in sources)
  intro: string;

  // One-liner used in cards
  tagline: string;

  /** Total length (display string). */
  length: string;

  quickFacts: Array<{ label: string; value: string }>;

  /** A short, fun anecdote / fun fact shown on the bridge page. */
  funFact: string;

  /** Notable records (short bullets). */
  records?: string[];

  /** Optional photo (use Wikimedia/Unsplash URLs). */
  photo?: {
    url: string;
    caption?: string;
    credit?: string;
    sourceUrl?: string;
  };

  // Displayed behind an "Engineering breakdown" button.
  // Keep it structured and sourced.
  engineeringBreakdown: string[];

  sources: Array<{ label: string; url: string }>;
};

const breakdownByType: Record<Bridge["type"], string[]> = {
  suspension: [
    "Style: suspension — the road hangs from big cables.",
    "How it holds up: road → hangers → main cables → anchors and towers → ground.",
    "What matters most: wind, movement (temperature), and long-term maintenance.",
  ],
  "cable-stayed": [
    "Style: cable-stayed — cables go straight from the towers to the road.",
    "How it holds up: road → stays → towers → foundations.",
    "What matters most: the cable layout, stiffness, and wind.",
  ],
  arch: [
    "Style: arch — the arch pushes forces into the ground.",
    "How it holds up: road → arch → supports/foundations.",
    "What matters most: strong supports and stable ground.",
  ],
  beam: [
    "Style: beam/girder — simple spans like strong beams.",
    "How it holds up: road → beams → piers → foundations.",
    "What matters most: fatigue, expansion joints, and durability.",
  ],
  truss: [
    "Style: truss — a triangle framework that shares the load.",
    "How it holds up: road → truss members → supports.",
    "What matters most: connections, corrosion protection, and fatigue.",
  ],
  viaduct: [
    "Style: viaduct — a long chain of repeated spans.",
    "How it holds up: road/track → piers → foundations.",
    "What matters most: repetition quality and maintenance over time.",
  ],
  other: [
    "Style varies — different bridges solve different constraints.",
    "A good starting question: where do forces go from the road to the ground?",
    "Then: wind, clearance, ground conditions, construction, and maintenance.",
  ],
};

function mergedBreakdown(type: Bridge["type"], extras: string[] = []) {
  return [...breakdownByType[type], ...extras];
}

const photosBySlug: Record<string, Bridge["photo"]> = {
  "tianjin-grand-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Beijing-Tianjin_ligne_TGV_viaduc_IMG_4433.jpg",
    caption: "Tianjin Grand Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Beijing-Tianjin_ligne_TGV_viaduc_IMG_4433.jpg",
  },
  "bang-na-expressway": {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Bangna-Bangpakong_Road.jpg",
    caption: "Bang Na Expressway (Elevated highway bridge)",
    credit: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bangna-Bangpakong_Road.jpg",
  },
  "beijing-grand-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Gro%C3%9Fe_Br%C3%BCcke_von_Peking_en.png",
    caption: "Beijing Grand Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Gro%25C3%259Fe_Br%25C3%25BCcke_von_Peking_en.png",
  },
  "manchac-swamp-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Manchac_Bridge.jpg",
    caption: "Manchac Swamp Bridge",
    credit: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Manchac_Bridge.jpg",
  },
  "hangzhou-bay-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/54/%E6%9D%AD%E5%B7%9E%E6%B9%BE%E5%A4%A7%E6%A1%A5%E4%B8%8A%E7%9A%84%E9%AB%98%E9%80%9F%E5%B2%9B%E5%BC%8F%E6%9C%8D%E5%8A%A1%E5%8C%BA.jpeg",
    caption: "Hangzhou Bay Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:%25E6%259D%25AD%25E5%25B7%259E%25E6%25B9%25BE%25E5%25A4%25A7%25E6%25A1%25A5%25E4%25B8%258A%25E7%259A%2584%25E9%25AB%2598%25E9%2580%259F%25E5%25B2%259B%25E5%25BC%258F%25E6%259C%258D%25E5%258A%25A1%25E5%25E5%258C%25BA.jpeg",
  },
  "charles-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/22/Prague_07-2016_view_from_Lesser_Town_Tower_of_Charles_Bridge_img3.jpg",
    caption: "Charles Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Prague_07-2016_view_from_Lesser_Town_Tower_of_Charles_Bridge_img3.jpg",
  },
  "ponte-vecchio": {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Ponte_Vecchio_from_Ponte_alle_Grazie.jpg",
    caption: "Ponte Vecchio",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ponte_Vecchio_from_Ponte_alle_Grazie.jpg",
  },
  "rialto-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Rialto_2025_4.jpg",
    caption: "Rialto Bridge",
    credit: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rialto_2025_4.jpg",
  },
  "firth-of-forth-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Forth_Bridge_2022.jpg",
    caption: "Forth Bridge",
    credit: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Forth_Bridge_2022.jpg",
  },
  "ponte-25-de-abril": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/51/25_De_Abril_Bridge_%28226290561%29.jpeg",
    caption: "25 de Abril Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:25_De_Abril_Bridge_%2528226290561%2529.jpeg",
  },
  "vasco-da-gama-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Vasco_da_Gama_Bridge_aerial_view.jpg",
    caption: "Vasco da Gama Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Vasco_da_Gama_Bridge_aerial_view.jpg",
  },
  "confederation-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Confederation_Bridge_during_winter.jpg",
    caption: "Confederation Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Confederation_Bridge_during_winter.jpg",
  },
  "howrah-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Howrah_bridge_at_night.jpg",
    caption: "Howrah Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Howrah_bridge_at_night.jpg",
  },
  "chain-bridge-budapest": {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Sz%C3%A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg",
    caption: "Széchenyi Chain Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Sz%25C3%25A9chenyi_Chain_Bridge_in_Budapest_at_night.jpg",
  },
  "pont-neuf": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9e/The_western_sides_of_the_%C3%8Ele_de_la_Cit%C3%A9_and_the_Pont_Neuf%2C_14_July_2008.jpg",
    caption: "Pont Neuf",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_western_sides_of_the_%25C3%258Ele_de_la_Cit%25C3%25A9_and_the_Pont_Neuf%252C_14_July_2008.jpg",
  },
  "pont-alexandre-iii": {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Pont_Alexandre_III_depuis_pont_de_la_Concorde_Paris.jpg",
    caption: "Pont Alexandre III",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pont_Alexandre_III_depuis_pont_de_la_Concorde_Paris.jpg",
  },
  "hell-gate-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Hell_Gate_Bridge_%2860275p%29.jpg",
    caption: "Hell Gate Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hell_Gate_Bridge_%252860275p%2529.jpg",
  },
  "pont-du-gard": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/42/Pont_du_Gard_BLS.jpg",
    caption: "Pont du Gard (aqueduct bridge)",
    credit: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pont_du_Gard_BLS.jpg",
  },
  "viaduc-de-garabits": {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Garabit.jpg",
    caption: "Garabit Viaduct",
    credit: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Garabit.jpg",
  },
  "viaducto-de-montabaur": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/90/Siduhe_Bridge-4.jpg",
    caption: "Siduhe Bridge",
    credit: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Siduhe_Bridge-4.jpg",
  },
  "helix-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Double-Helix-Bridge.jpg",
    caption: "Helix Bridge",
    credit: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Double-Helix-Bridge.jpg",
  },
  "russky-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/65/Russky_Bridge_%28October_2024%29-0_2.jpg",
    caption: "Russky Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Russky_Bridge_%2528October_2024%2529-0_2.jpg",
  },
  "stari-most": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Mostar_Old_Town_Panorama_2007.jpg",
    caption: "Stari Most",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mostar_Old_Town_Panorama_2007.jpg",
  },
  "great-belt-bridge": {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/77/Storeb%C3%A6ltsbroen_from_Sj%C3%A6lland.jpg",
    caption: "Great Belt Bridge",
    credit: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Storeb%25C3%25A6ltsbroen_from_Sj%25C3%25A6lland.jpg",
  },
};

const rawBridges: Bridge[] = [
  // -------------------------
  // 10 largest / longest bridges (curated list)
  // Note: “largest/longest” lists change; these are representative famous entries.
  // -------------------------
  {
    funFact:
      "It’s so long that it’s basically “railway on stilts” for an entire region — the engineering trick is repeating a reliable span thousands of times.",
    records: [
      "Often cited as the world’s longest bridge by total length.",
    ],
    slug: "danyang-kunshan-grand-bridge",
    name: "Danyang–Kunshan Grand Bridge",
    country: "China",
    city: "Jiangsu",
    type: "viaduct",
    yearOpened: 2011,
    coordinates: { lon: 120.3, lat: 31.3 },
    coordinatesApprox: true,
    intro:
      "The Danyang–Kunshan Grand Bridge is a massive railway viaduct in Jiangsu, part of the Beijing–Shanghai high-speed rail corridor. It’s known for sheer total length and the repeatable engineering of long-span, elevated rail infrastructure.",
    tagline: "A high-speed rail viaduct built at unbelievable scale.",

    length: "Total length: ~164.8 km",
    quickFacts: [
      { label: "Category", value: "Longest bridge (by total length)" },
      { label: "Use", value: "High-speed rail" },
    ],
    engineeringBreakdown: mergedBreakdown("viaduct", [
      "Why it’s long: repetition of standardized spans makes construction fast and quality controllable.",
      "Main risks: settlement, temperature movement, and maintenance across hundreds of piers.",
    ]),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Danyang%E2%80%93Kunshan_Grand_Bridge",
      },
    ],
  },
  {
    funFact:
      "This one is less about a single dramatic span and more about staying perfectly consistent for high-speed trains — boring is a feature.",
    records: [
      "One of the longest viaduct systems used for high-speed rail.",
    ],
    slug: "changhua-kaohsiung-viaduct",
    name: "Changhua–Kaohsiung Viaduct",
    country: "Taiwan",
    city: "West Taiwan",
    type: "viaduct",
    yearOpened: 2007,
    coordinates: { lon: 120.6, lat: 23.9 },
    coordinatesApprox: true,
    intro:
      "The Changhua–Kaohsiung Viaduct is a long elevated viaduct carrying Taiwan High Speed Rail. The design goal is straightforward: keep high-speed trains smooth and safe while crossing populated and geologically active areas.",
    tagline: "Elevated high-speed rail engineered for consistency and resilience.",

    length: "Total length: ~157.3 km",
    quickFacts: [
      { label: "Use", value: "High-speed rail" },
      { label: "Region", value: "Taiwan" },
    ],
    engineeringBreakdown: mergedBreakdown("viaduct", [
      "For high-speed rail: alignment precision and track-structure interaction matter a lot.",
      "In seismic regions: ductility + detailing + bearings/expansion joints are part of the safety story.",
    ]),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Changhua%E2%80%93Kaohsiung_Viaduct",
      },
    ],
  },
  {
    funFact:
      "When bridges get this long, the real flex is quality control: every segment has to behave like the last one at 300+ km/h.",
    records: [
      "Among the longest bridges by total length.",
    ],
    slug: "tianjin-grand-bridge",
    name: "Tianjin Grand Bridge",
    country: "China",
    city: "Tianjin",
    type: "viaduct",
    yearOpened: 2011,
    coordinates: { lon: 117.2, lat: 39.1 },
    coordinatesApprox: true,
    intro:
      "The Tianjin Grand Bridge is a long railway viaduct on the Beijing–Shanghai high-speed railway. It’s an example of modern segmental viaduct engineering optimized for speed of construction and uniform performance.",
    tagline: "High-speed rail viaduct: long, straight, and brutally efficient.",

    length: "Total length: ~113.7 km",
    quickFacts: [
      { label: "Use", value: "High-speed rail" },
      { label: "Category", value: "Longest bridges" },
    ],
    engineeringBreakdown: mergedBreakdown("viaduct"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Tianjin_Grand_Bridge" },
    ],
  },
  {
    funFact:
      "Mega-viaducts feel like one bridge, but they’re really a huge family of spans that all have to age well together.",
    records: [
      "Often listed among the world’s longest bridges.",
    ],
    slug: "weinan-weihe-grand-bridge",
    name: "Weinan Weihe Grand Bridge",
    country: "China",
    city: "Weinan",
    type: "viaduct",
    yearOpened: 2010,
    coordinates: { lon: 109.5, lat: 34.5 },
    coordinatesApprox: true,
    intro:
      "The Weinan Weihe Grand Bridge is a long railway viaduct that crosses the Wei River valley. Like many mega-viaducts, its ‘wow’ factor is less a single span and more a huge number of engineered repetitions.",
    tagline: "A mega-viaduct that turns repetition into record-breaking length.",

    length: "Total length: ~79.7 km",
    quickFacts: [
      { label: "Use", value: "Rail" },
      { label: "Category", value: "Longest bridges" },
    ],
    engineeringBreakdown: mergedBreakdown("viaduct"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Weinan_Weihe_Grand_Bridge",
      },
    ],
  },
  {
    funFact:
      "Elevated highways are the ultimate “build while the city is awake” problem: engineering + logistics + traffic choreography.",
    records: [
      "Known as one of the longest elevated road structures.",
    ],
    slug: "bang-na-expressway",
    name: "Bang Na Expressway (Elevated highway bridge)",
    country: "Thailand",
    city: "Bangkok",
    type: "viaduct",
    yearOpened: 2000,
    coordinates: { lon: 100.6, lat: 13.6 },
    coordinatesApprox: true,
    intro:
      "The Bang Na Expressway is an elevated highway structure known for long continuous length through the Bangkok area. It’s a case study in urban-scale elevated transport where construction staging and traffic management become part of the engineering.",
    tagline: "An elevated highway built like infrastructure-on-stilts across a city.",

    length: "Total length: ~54 km",
    quickFacts: [
      { label: "Use", value: "Highway" },
      { label: "Region", value: "Bangkok" },
    ],
    engineeringBreakdown: mergedBreakdown("viaduct", [
      "Urban constraint: you’re engineering structure + construction logistics + traffic flow at once.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Bang_Na_Expressway" },
    ],
  },
  {
    funFact:
      "High-speed rail bridges are like precision instruments: tiny deflections matter when your vehicle is a train at speed.",
    records: [
      "Listed among the longest bridges on major global rankings.",
    ],
    slug: "beijing-grand-bridge",
    name: "Beijing Grand Bridge",
    country: "China",
    city: "Beijing",
    type: "viaduct",
    yearOpened: 2010,
    coordinates: { lon: 116.4, lat: 39.9 },
    coordinatesApprox: true,
    intro:
      "The Beijing Grand Bridge is a long viaduct carrying the Beijing–Shanghai high-speed railway. It’s designed for high-speed stability and buildability across a wide urban/flat landscape.",
    tagline: "A long high-speed rail viaduct built for smoothness at speed.",

    length: "Total length: ~48.2 km",
    quickFacts: [
      { label: "Use", value: "High-speed rail" },
      { label: "Region", value: "Beijing" },
    ],
    engineeringBreakdown: mergedBreakdown("viaduct"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Beijing_Grand_Bridge" },
    ],
  },
  {
    funFact:
      "Drivers report that in bad weather it can feel like you’re floating in the middle of a lake — because you kind of are.",
    records: [
      "Often cited as one of the longest continuous over-water bridges.",
    ],
    slug: "lake-pontchartrain-causeway",
    name: "Lake Pontchartrain Causeway",
    country: "United States",
    city: "Louisiana",
    type: "beam",
    yearOpened: 1956,
    coordinates: { lon: -90.2, lat: 30.2 },
    coordinatesApprox: true,
    intro:
      "The Lake Pontchartrain Causeway is a long pair of bridges crossing Lake Pontchartrain in Louisiana. It’s famous for uninterrupted driving over water and the sheer number of spans and piles.",
    tagline: "A long over-water crossing where repetition is the engineering trick.",

    length: "Total length: ~38.4 km",
    quickFacts: [
      { label: "Use", value: "Road" },
      { label: "Crosses", value: "Lake Pontchartrain" },
    ],
    engineeringBreakdown: mergedBreakdown("beam", [
      "Over-water durability: chloride exposure + storms make corrosion protection and inspection critical.",
      "A ‘causeway’ is often many short spans: simpler construction, lots of foundations.",
    ]),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Lake_Pontchartrain_Causeway",
      },
    ],
  },
  {
    funFact:
      "Building over a swamp means the ground is basically negotiating with you — foundations and durability do the talking.",
    records: [
      "Frequently listed among the longest bridges (by total length).",
    ],
    slug: "manchac-swamp-bridge",
    name: "Manchac Swamp Bridge",
    country: "United States",
    city: "Louisiana",
    type: "viaduct",
    yearOpened: 1979,
    coordinates: { lon: -90.4, lat: 30.3 },
    coordinatesApprox: true,
    intro:
      "The Manchac Swamp Bridge is an elevated highway structure carrying I-55 across wetlands in Louisiana. The big engineering constraint is building stable foundations in swampy ground while keeping the structure durable.",
    tagline: "A wetland crossing where foundations and durability do the heavy lifting.",

    length: "Total length: ~36.7 km",
    quickFacts: [
      { label: "Use", value: "Highway" },
      { label: "Environment", value: "Swamp/wetlands" },
    ],
    engineeringBreakdown: mergedBreakdown("viaduct"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Manchac_Swamp_Bridge" },
    ],
  },
  {
    funFact:
      "Over-water bridges aren’t just “long roads” — salt, wind, and marine foundations make maintenance a permanent job.",
    records: [
      "Held records for long over-water crossings at the time of opening.",
    ],
    slug: "qingdao-jiaozhou-bay-bridge",
    name: "Jiaozhou Bay Bridge",
    country: "China",
    city: "Qingdao",
    type: "beam",
    yearOpened: 2011,
    coordinates: { lon: 120.3, lat: 36.1 },
    coordinatesApprox: true,
    intro:
      "The Jiaozhou Bay Bridge is a long over-water bridge in Qingdao, built to improve travel across Jiaozhou Bay. Big water crossings lean heavily on marine foundations, durability, and construction staging.",
    tagline: "An over-water crossing engineered around marine foundations and durability.",

    length: "Total length: ~42.5 km",
    quickFacts: [
      { label: "Use", value: "Road" },
      { label: "Crosses", value: "Jiaozhou Bay" },
    ],
    engineeringBreakdown: mergedBreakdown("beam"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Jiaozhou_Bay_Bridge" },
    ],
  },
  {
    funFact:
      "Tidal bays try to erase your work: currents, scour, and corrosion are constant opponents.",
    records: [
      "One of the world’s notable long bay crossings.",
    ],
    slug: "hangzhou-bay-bridge",
    name: "Hangzhou Bay Bridge",
    country: "China",
    city: "Hangzhou Bay",
    type: "beam",
    yearOpened: 2008,
    coordinates: { lon: 121.1, lat: 30.2 },
    coordinatesApprox: true,
    intro:
      "The Hangzhou Bay Bridge is a long bridge crossing Hangzhou Bay, designed for heavy coastal conditions. Over-water structures in tidal environments face difficult foundation, scour, and corrosion challenges.",
    tagline: "A long tidal-bay crossing built for harsh coastal conditions.",

    length: "Total length: ~35.7 km",
    quickFacts: [
      { label: "Use", value: "Road" },
      { label: "Environment", value: "Tidal bay" },
    ],
    engineeringBreakdown: mergedBreakdown("beam", [
      "Tidal currents + storms → scour checks, protection layers, and robust inspection regimes.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Hangzhou_Bay_Bridge" },
    ],
  },

  // -------------------------
  // 20 iconic bridges (curated)
  // -------------------------
  {
    slug: "golden-gate-bridge",
    name: "Golden Gate Bridge",
    country: "United States",
    city: "San Francisco",
    type: "suspension",
    yearOpened: 1937,
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Golden_Gate_Bridge_as_seen_from_Battery_East.jpg",
      caption: "Golden Gate Bridge",
      credit: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Golden_Gate_Bridge_as_seen_from_Battery_East.jpg",
    },
    coordinates: { lon: -122.4783, lat: 37.8199 },
    intro:
      "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate strait, linking San Francisco to Marin County. Completed in the 1930s, it became a symbol of the city — known for its Art Deco design, its International Orange paint, and the way it appears (and disappears) in coastal fog.",
    tagline: "A suspension icon engineered for wind, fog, and an unforgiving site.",

    length: "Total length: ~2.7 km",
    quickFacts: [
      { label: "Type", value: "Suspension" },
      { label: "Opened", value: "1937" },
    ],
    funFact:
      "It’s famous for a reason: even people who don’t care about bridges recognize it instantly.",
    engineeringBreakdown: mergedBreakdown("suspension", [
      "Built in a tough environment: wind + currents + deep water force conservative detailing and ongoing maintenance.",
      "Corrosion control matters: paint systems, inspection, and retrofits are part of the design’s life story.",
    ]),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Golden_Gate_Bridge",
      },
    ],
  },
  {
    slug: "brooklyn-bridge",
    name: "Brooklyn Bridge",
    country: "United States",
    city: "New York City",
    type: "suspension",
    yearOpened: 1883,
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/00/Brooklyn_Bridge_Manhattan.jpg",
      caption: "Brooklyn Bridge",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Brooklyn_Bridge_Manhattan.jpg",
    },
    coordinates: { lon: -73.9969, lat: 40.7061 },
    intro:
      "The Brooklyn Bridge connects Manhattan and Brooklyn across the East River. Its hybrid suspension/cable-stayed design and stone towers made it a landmark of 19th-century engineering.",
    tagline: "A historic hybrid that turned New York’s skyline into infrastructure.",

    length: "Total length: ~1.8 km",
    quickFacts: [
      { label: "Type", value: "Suspension (hybrid)" },
      { label: "Opened", value: "1883" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Brooklyn_Bridge" },
    ],
  },
  {
    slug: "tower-bridge",
    name: "Tower Bridge",
    country: "United Kingdom",
    city: "London",
    type: "other",
    yearOpened: 1894,
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/59/Tower_Bridge_at_Dawn.jpg",
      caption: "Tower Bridge",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tower_Bridge_at_Dawn.jpg",
    },
    coordinates: { lon: -0.0754, lat: 51.5055 },
    intro:
      "Tower Bridge is a combined bascule and suspension bridge over the River Thames. It’s iconic because it’s both a working movable bridge and a piece of Victorian architectural theater.",
    tagline: "A movable bridge that’s also a symbol of London.",

    length: "Total length: ~244 m",
    quickFacts: [
      { label: "Type", value: "Bascule + suspension" },
      { label: "Opened", value: "1894" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("other", [
      "Movable bridges add machinery + control systems to the structural problem.",
      "Key constraint: keep navigation clearance while still carrying road loads reliably.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Tower_Bridge" },
    ],
  },
  {
    slug: "sydney-harbour-bridge",
    name: "Sydney Harbour Bridge",
    country: "Australia",
    city: "Sydney",
    type: "arch",
    yearOpened: 1932,
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/55/Sydney_Harbour_Bridge-16_October_2025.jpg",
      caption: "Sydney Harbour Bridge",
      credit: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Sydney_Harbour_Bridge-16_October_2025.jpg",
    },
    coordinates: { lon: 151.2108, lat: -33.8523 },
    intro:
      "The Sydney Harbour Bridge is a steel through arch bridge spanning Sydney Harbour. It’s a load-carrying machine that doubles as a national symbol.",
    tagline: "A steel arch ‘coat hanger’ that carries a city.",

    length: "Total length: ~1.1 km",
    quickFacts: [
      { label: "Type", value: "Through arch" },
      { label: "Opened", value: "1932" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("arch"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Sydney_Harbour_Bridge" },
    ],
  },
  {
    slug: "akashi-kaikyo-bridge",
    name: "Akashi Kaikyō Bridge",
    country: "Japan",
    city: "Kobe",
    type: "suspension",
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Akashi_Bridge.JPG",
      caption: "Akashi Kaikyō Bridge",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Akashi_Bridge.JPG",
    },
    yearOpened: 1998,
    coordinates: { lon: 135.021, lat: 34.617 },
    coordinatesApprox: true,
    intro:
      "The Akashi Kaikyō Bridge links the city of Kobe to Awaji Island. It’s famous for extreme span length and the engineering required for deep water, heavy winds, and earthquakes.",
    tagline: "A super-span suspension bridge built for wind and earthquakes.",

    length: "Total length: ~3.9 km",
    quickFacts: [
      { label: "Type", value: "Suspension" },
      { label: "Opened", value: "1998" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("suspension", [
      "Seismic design and aerodynamic stability are first-class constraints on long-span bridges.",
    ]),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Akashi_Kaiky%C5%8D_Bridge",
      },
    ],
  },
  {
    slug: "oresund-bridge",
    name: "Øresund Bridge",
    country: "Denmark / Sweden",
    city: "Copenhagen–Malmö",
    type: "cable-stayed",
    yearOpened: 2000,
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/01/%C3%98resund_Bridge_from_the_air_in_September_2015.jpg",
      caption: "Øresund Bridge",
      credit: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:%C3%98resund_Bridge_from_the_air_in_September_2015.jpg",
    },
    coordinates: { lon: 12.65, lat: 55.57 },
    coordinatesApprox: true,
    intro:
      "The Øresund Link combines bridge, artificial island, and tunnel to connect Denmark and Sweden. It’s iconic because it’s a full transport system, not just a single bridge span.",
    tagline: "Bridge + island + tunnel: infrastructure as a complete system.",

    length: "Bridge length: ~7.8 km",
    quickFacts: [
      { label: "Type", value: "Cable-stayed (link)" },
      { label: "Opened", value: "2000" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("cable-stayed", [
      "Systems engineering: marine traffic, aviation constraints, and tunnel ventilation all shape the final form.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/%C3%98resund_Bridge" },
    ],
  },
  {
    slug: "millau-viaduct",
    name: "Millau Viaduct",
    country: "France",
    city: "Millau",
    type: "cable-stayed",
    yearOpened: 2004,
    photo: {
      url: "https://upload.wikimedia.org/wikipedia/en/a/a6/ViaducdeMillau.jpg",
      caption: "Millau Viaduct",
      credit: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Millau_Viaduct",
    },
    coordinates: { lon: 3.021, lat: 44.085 },
    intro:
      "The Millau Viaduct is a cable-stayed bridge carrying traffic across the valley of the River Tarn near Millau. It’s famous for extreme height and a slender profile that makes the structure feel almost weightless.",
    tagline: "A cable-stayed giant that makes height feel effortless.",

    length: "Total length: ~2.46 km",
    quickFacts: [
      { label: "Type", value: "Cable-stayed" },
      { label: "Opened", value: "2004" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("cable-stayed", [
      "Wind at height: aerodynamic stability and damping become major design constraints.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Millau_Viaduct" },
    ],
  },
  {
    slug: "charles-bridge",
    name: "Charles Bridge",
    country: "Czech Republic",
    city: "Prague",
    type: "arch",
    yearOpened: 1402,
    coordinates: { lon: 14.4114, lat: 50.0865 },
    intro:
      "Charles Bridge is a historic stone arch bridge crossing the Vltava river in Prague. Its engineering story is old-school: masonry arches, foundations in a river, and centuries of maintenance.",
    tagline: "A medieval stone bridge that still anchors a modern city.",

    length: "Total length: ~516 m",
    quickFacts: [
      { label: "Type", value: "Stone arch" },
      { label: "Era", value: "Medieval" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("arch", [
      "Masonry arches excel in compression but rely on stable foundations and intact load paths.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Charles_Bridge" },
    ],
  },
  {
    slug: "ponte-vecchio",
    name: "Ponte Vecchio",
    country: "Italy",
    city: "Florence",
    type: "arch",
    yearOpened: 1345,
    coordinates: { lon: 11.2531, lat: 43.7679 },
    intro:
      "Ponte Vecchio is a medieval stone arch bridge over the Arno River, famous for the shops built along it. Structurally: arches + heavy masonry + a river that doesn’t always behave.",
    tagline: "A bridge that’s also a street of shops — still standing.",

    length: "Total length: ~84 m",
    quickFacts: [
      { label: "Type", value: "Stone arch" },
      { label: "Feature", value: "Shops on the bridge" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("arch"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Ponte_Vecchio" },
    ],
  },
  {
    slug: "rialto-bridge",
    name: "Rialto Bridge",
    country: "Italy",
    city: "Venice",
    type: "arch",
    yearOpened: 1591,
    coordinates: { lon: 12.3358, lat: 45.4380 },
    intro:
      "The Rialto Bridge is a stone arch bridge across the Grand Canal in Venice. It’s iconic for a simple reason: it’s a single bold arch in a city that lives on water.",
    tagline: "A single stone arch spanning Venice’s main canal.",

    length: "Total length: ~48 m",
    quickFacts: [
      { label: "Type", value: "Stone arch" },
      { label: "Setting", value: "Grand Canal" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("arch"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Rialto_Bridge" },
    ],
  },
  {
    slug: "firth-of-forth-bridge",
    name: "Forth Bridge",
    country: "United Kingdom",
    city: "Edinburgh",
    type: "truss",
    yearOpened: 1890,
    coordinates: { lon: -3.3867, lat: 56.0005 },
    intro:
      "The Forth Bridge is a cantilever railway bridge over the Firth of Forth. It’s iconic as a triumph of truss/cantilever engineering and an early example of designing for heavy rail loads.",
    tagline: "Cantilever truss engineering turned into a national landmark.",

    length: "Total length: ~2.5 km",
    quickFacts: [
      { label: "Type", value: "Cantilever truss" },
      { label: "Use", value: "Rail" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("truss", [
      "Cantilever action: large arms balanced around piers reduce the need for falsework in deep water.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Forth_Bridge" },
    ],
  },
  {
    slug: "clifton-suspension-bridge",
    name: "Clifton Suspension Bridge",
    country: "United Kingdom",
    city: "Bristol",
    type: "suspension",
    yearOpened: 1864,
    coordinates: { lon: -2.6277, lat: 51.4547 },
    intro:
      "Clifton Suspension Bridge spans the Avon Gorge in Bristol. It’s a classic suspension form in a dramatic landscape — an early example of turning topography into an advantage.",
    tagline: "A dramatic gorge span that made suspension bridges feel inevitable.",

    length: "Total length: ~414 m",
    quickFacts: [
      { label: "Type", value: "Suspension" },
      { label: "Opened", value: "1864" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Clifton_Suspension_Bridge",
      },
    ],
  },
  {
    slug: "ponte-25-de-abril",
    name: "25 de Abril Bridge",
    country: "Portugal",
    city: "Lisbon",
    type: "suspension",
    yearOpened: 1966,
    coordinates: { lon: -9.1772, lat: 38.6937 },
    intro:
      "The 25 de Abril Bridge crosses the Tagus River in Lisbon. It’s visually reminiscent of other iconic suspension bridges and carries major urban traffic.",
    tagline: "A suspension silhouette that defines Lisbon’s river crossing.",

    length: "Total length: ~2.28 km",
    quickFacts: [
      { label: "Type", value: "Suspension" },
      { label: "Opened", value: "1966" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/25_de_Abril_Bridge" },
    ],
  },
  {
    slug: "vasco-da-gama-bridge",
    name: "Vasco da Gama Bridge",
    country: "Portugal",
    city: "Lisbon",
    type: "viaduct",
    yearOpened: 1998,
    coordinates: { lon: -9.093, lat: 38.77 },
    coordinatesApprox: true,
    intro:
      "The Vasco da Gama Bridge is a long crossing over the Tagus River area in Lisbon. It’s an example of combining viaduct repetition with special spans to handle navigation and soft ground.",
    tagline: "A long river crossing that mixes repetition with key spans.",

    length: "Total length: ~12.3 km",
    quickFacts: [
      { label: "Use", value: "Road" },
      { label: "Opened", value: "1998" },
    ],
    funFact:
      "At this scale, the secret isn’t one heroic span — it’s making thousands of parts behave like one structure.",
    engineeringBreakdown: mergedBreakdown("viaduct"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Vasco_da_Gama_Bridge" },
    ],
  },
  {
    slug: "confederation-bridge",
    name: "Confederation Bridge",
    country: "Canada",
    city: "Prince Edward Island",
    type: "beam",
    yearOpened: 1997,
    coordinates: { lon: -63.7, lat: 46.2 },
    coordinatesApprox: true,
    intro:
      "Confederation Bridge links Prince Edward Island to mainland Canada across icy water. The engineering story is durability and ice loading — an environment that attacks foundations and superstructure.",
    tagline: "A cold-water crossing engineered for ice and harsh weather.",

    length: "Total length: ~12.9 km",
    quickFacts: [
      { label: "Use", value: "Road" },
      { label: "Opened", value: "1997" },
    ],
    funFact:
      "Over water, the bridge is only half the story — the foundations and corrosion control are the real grind.",
    engineeringBreakdown: mergedBreakdown("beam", [
      "Ice loading and freeze-thaw cycles are key constraints for cold-region bridges.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Confederation_Bridge" },
    ],
  },
  {
    slug: "howrah-bridge",
    name: "Howrah Bridge",
    country: "India",
    city: "Kolkata",
    type: "truss",
    yearOpened: 1943,
    coordinates: { lon: 88.3468, lat: 22.5853 },
    intro:
      "Howrah Bridge is a famous cantilever truss bridge over the Hooghly River. It’s iconic for moving huge volumes of traffic and for its unmistakable truss silhouette.",
    tagline: "A truss landmark built to carry relentless urban load.",

    length: "Total length: ~705 m",
    quickFacts: [
      { label: "Type", value: "Cantilever truss" },
      { label: "Opened", value: "1943" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("truss"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Howrah_Bridge" },
    ],
  },
  {
    slug: "chain-bridge-budapest",
    name: "Széchenyi Chain Bridge",
    country: "Hungary",
    city: "Budapest",
    type: "suspension",
    yearOpened: 1849,
    coordinates: { lon: 19.0402, lat: 47.4980 },
    intro:
      "The Széchenyi Chain Bridge is a historic suspension bridge across the Danube in Budapest. It’s iconic because it was a major early permanent crossing that shaped the city.",
    tagline: "A historic suspension bridge that stitched a city together.",

    length: "Total length: ~375 m",
    quickFacts: [
      { label: "Type", value: "Suspension" },
      { label: "Opened", value: "1849" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Sz%C3%A9chenyi_Chain_Bridge" },
    ],
  },
  {
    slug: "pont-neuf",
    name: "Pont Neuf",
    country: "France",
    city: "Paris",
    type: "arch",
    yearOpened: 1607,
    coordinates: { lon: 2.3412, lat: 48.8571 },
    intro:
      "Pont Neuf is the oldest standing bridge across the River Seine in Paris. It’s a masonry-arch classic: multiple spans, robust stonework, and a river that has tested it for centuries.",
    tagline: "Paris’s oldest standing bridge — stone engineering that endured.",

    length: "Total length: ~238 m",
    quickFacts: [
      { label: "Type", value: "Stone arch" },
      { label: "Era", value: "Renaissance" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("arch"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Pont_Neuf" },
    ],
  },
  {
    slug: "pont-alexandre-iii",
    name: "Pont Alexandre III",
    country: "France",
    city: "Paris",
    type: "arch",
    yearOpened: 1900,
    coordinates: { lon: 2.3130, lat: 48.8638 },
    intro:
      "Pont Alexandre III is famous for being both an engineering work and a decorative monument. The low arch profile was chosen to preserve views along the Seine.",
    tagline: "A low arch engineered around sightlines and ceremony.",

    length: "Total length: ~160 m",
    quickFacts: [
      { label: "Type", value: "Arch" },
      { label: "Opened", value: "1900" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("arch", [
      "Architectural constraints can be structural constraints: geometry, clearance, and view corridors matter.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Pont_Alexandre_III" },
    ],
  },
  {
    slug: "hell-gate-bridge",
    name: "Hell Gate Bridge",
    country: "United States",
    city: "New York City",
    type: "arch",
    yearOpened: 1917,
    coordinates: { lon: -73.9240, lat: 40.7797 },
    intro:
      "Hell Gate Bridge is a steel arch bridge carrying rail traffic in New York. It’s notable both for its scale and for influencing later long-span arch concepts.",
    tagline: "A steel arch that made heavy rail spans look elegant.",

    length: "Total length: ~310 m",
    quickFacts: [
      { label: "Type", value: "Steel arch" },
      { label: "Opened", value: "1917" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("arch"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Hell_Gate_Bridge" },
    ],
  },
  {
    slug: "pont-du-gard",
    name: "Pont du Gard (aqueduct bridge)",
    country: "France",
    city: "Vers-Pont-du-Gard",
    type: "arch",
    yearOpened: 50,
    coordinates: { lon: 4.535, lat: 43.947 },
    coordinatesApprox: true,
    intro:
      "Pont du Gard is an ancient Roman aqueduct bridge. The engineering is pure masonry compression and geometry — built to carry water with a tiny slope over long distance.",
    tagline: "Roman arches + precision geometry, built for water.",

    length: "Total length: ~275 m",
    quickFacts: [
      { label: "Type", value: "Masonry aqueduct" },
      { label: "Era", value: "Roman" },
    ],
    funFact:
      "Over water, the bridge is only half the story — the foundations and corrosion control are the real grind.",
    engineeringBreakdown: mergedBreakdown("arch", [
      "Aqueduct constraint: hydraulics — gradient control over kilometers.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Pont_du_Gard" },
    ],
  },
  {
    slug: "viaduc-de-garabits",
    name: "Garabit Viaduct",
    country: "France",
    city: "Cantal",
    type: "arch",
    yearOpened: 1884,
    coordinates: { lon: 3.114, lat: 44.949 },
    coordinatesApprox: true,
    intro:
      "Garabit Viaduct is an iron arch railway viaduct in France. It’s iconic for early metal bridge engineering and for spanning a dramatic valley.",
    tagline: "An early iron arch that made valleys feel smaller.",

    length: "Total length: ~565 m",
    quickFacts: [
      { label: "Type", value: "Arch viaduct" },
      { label: "Use", value: "Rail" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("arch"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Garabit_viaduct" },
    ],
  },
  {
    slug: "pontcysyllte-aqueduct",
    name: "Pontcysyllte Aqueduct",
    country: "United Kingdom",
    city: "Wales",
    type: "arch",
    yearOpened: 1805,
    coordinates: { lon: -3.088, lat: 52.970 },
    coordinatesApprox: true,
    intro:
      "Pontcysyllte Aqueduct carries a canal over the River Dee valley. It’s iconic because it’s a bridge for water — and because its slender form makes the height feel unreal.",
    tagline: "A canal in the sky: aqueduct engineering as spectacle.",

    length: "Total length: ~307 m",
    quickFacts: [
      { label: "Type", value: "Aqueduct" },
      { label: "Opened", value: "1805" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("arch", [
      "Aqueduct bridges add watertightness + lining to the structural problem.",
    ]),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Pontcysyllte_Aqueduct",
      },
    ],
  },
  {
    slug: "viaducto-de-montabaur",
    name: "Siduhe Bridge",
    country: "China",
    city: "Hubei",
    type: "cable-stayed",
    yearOpened: 2009,
    coordinates: { lon: 110.4, lat: 30.4 },
    coordinatesApprox: true,
    intro:
      "Siduhe Bridge is a cable-stayed bridge known for spanning a deep valley in Hubei. It’s a ‘height bridge’ — engineering around terrain as much as span.",
    tagline: "A deep-valley cable-stayed bridge where terrain drives the design.",

    length: "Main span: ~900 m (total length varies by source)",
    quickFacts: [
      { label: "Type", value: "Cable-stayed" },
      { label: "Opened", value: "2009" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("cable-stayed"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Siduhe_Bridge" },
    ],
  },
  {
    slug: "helix-bridge",
    name: "Helix Bridge",
    country: "Singapore",
    city: "Singapore",
    type: "other",
    yearOpened: 2010,
    coordinates: { lon: 103.860, lat: 1.289 },
    coordinatesApprox: true,
    intro:
      "Helix Bridge is a pedestrian bridge with a distinctive double-helix form. It’s iconic because structure and architecture are the same thing — the form is the experience.",
    tagline: "A pedestrian bridge where geometry is the headline.",

    length: "Total length: ~280 m",
    quickFacts: [
      { label: "Type", value: "Pedestrian" },
      { label: "Opened", value: "2010" },
    ],
    funFact:
      "If you like the headline, you’ll love the details — this one is a perfect example of how constraints shape form.",
    engineeringBreakdown: mergedBreakdown("other", [
      "For pedestrian bridges: vibration comfort and lateral stability can govern design.",
    ]),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Helix_Bridge" },
    ],
  },

  // -------------------------
  // More iconic bridges (coverage boost)
  // -------------------------
  {
    slug: "russky-bridge",
    name: "Russky Bridge",
    country: "Russia",
    city: "Vladivostok",
    type: "cable-stayed",
    yearOpened: 2012,
    coordinates: { lon: 131.882, lat: 43.065 },
    coordinatesApprox: true,
    intro:
      "Russky Bridge connects Vladivostok to Russky Island. It’s famous for its huge cable-stayed span and its clean, modern silhouette over the sea.",
    tagline: "A cable-stayed super-span over open water.",

    length: "Total length: ~3.1 km",

    quickFacts: [
      { label: "Style", value: "Cable-stayed" },
      { label: "Opened", value: "2012" },
    ],
    funFact:
      "It was built for a major international event — and instantly became Vladivostok’s modern symbol.",
    records: ["Known for having one of the world’s largest cable-stayed spans."],
    engineeringBreakdown: mergedBreakdown("cable-stayed"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Russky_Bridge" },
    ],
  },
  {
    slug: "yavuz-sultan-selim-bridge",
    name: "Yavuz Sultan Selim Bridge",
    country: "Turkey",
    city: "Istanbul",
    type: "suspension",
    yearOpened: 2016,
    coordinates: { lon: 29.124, lat: 41.194 },
    coordinatesApprox: true,
    intro:
      "Yavuz Sultan Selim Bridge is a major Bosphorus crossing in Istanbul. It’s a big, modern suspension bridge designed to carry heavy traffic (and rail) across a busy strait.",
    tagline: "A Bosphorus crossing built for massive, mixed traffic.",

    length: "Total length: ~2.16 km",

    quickFacts: [
      { label: "Style", value: "Suspension" },
      { label: "Opened", value: "2016" },
    ],
    funFact:
      "On maps, it looks like a simple line — in real life it’s a full-on logistics project across one of the world’s busiest waterways.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Yavuz_Sultan_Selim_Bridge",
      },
    ],
  },
  {
    slug: "fatih-sultan-mehmet-bridge",
    name: "Fatih Sultan Mehmet Bridge",
    country: "Turkey",
    city: "Istanbul",
    type: "suspension",
    yearOpened: 1988,
    coordinates: { lon: 29.063, lat: 41.091 },
    coordinatesApprox: true,
    intro:
      "Fatih Sultan Mehmet Bridge is the second Bosphorus bridge in Istanbul. It’s a classic suspension crossing that’s part of the city’s daily rhythm.",
    tagline: "A suspension bridge that connects continents, every day.",

    length: "Total length: ~1.51 km",

    quickFacts: [
      { label: "Style", value: "Suspension" },
      { label: "Opened", value: "1988" },
    ],
    funFact:
      "It’s one of those bridges where ‘rush hour’ isn’t a time — it’s a lifestyle.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Fatih_Sultan_Mehmet_Bridge",
      },
    ],
  },
  {
    slug: "15-july-martyrs-bridge",
    name: "15 July Martyrs Bridge (Bosphorus Bridge)",
    country: "Turkey",
    city: "Istanbul",
    type: "suspension",
    yearOpened: 1973,
    coordinates: { lon: 29.039, lat: 41.045 },
    coordinatesApprox: true,
    intro:
      "The first Bosphorus Bridge is one of Istanbul’s most recognizable crossings. It’s iconic because it literally links Europe and Asia.",
    tagline: "The original Europe–Asia suspension crossing.",

    length: "Total length: ~1.56 km",

    quickFacts: [
      { label: "Style", value: "Suspension" },
      { label: "Opened", value: "1973" },
    ],
    funFact:
      "Few bridges can claim a daily commute between continents.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/15_July_Martyrs_Bridge",
      },
    ],
  },
  {
    slug: "hohenzollern-bridge",
    name: "Hohenzollern Bridge",
    country: "Germany",
    city: "Cologne",
    type: "arch",
    yearOpened: 1911,
    coordinates: { lon: 6.965, lat: 50.941 },
    coordinatesApprox: true,
    intro:
      "Hohenzollern Bridge is a major rail bridge over the Rhine in Cologne. It’s famous for heavy daily rail traffic and the city’s skyline views.",
    tagline: "A Rhine crossing built for nonstop trains.",

    length: "Total length: ~409 m",

    quickFacts: [
      { label: "Use", value: "Rail" },
      { label: "City", value: "Cologne" },
    ],
    funFact:
      "It’s one of those bridges where you feel the rhythm of a city — because trains never really stop.",
    engineeringBreakdown: mergedBreakdown("arch"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Hohenzollern_Bridge",
      },
    ],
  },
  {
    slug: "kohlbrandbrucke",
    name: "Köhlbrandbrücke",
    country: "Germany",
    city: "Hamburg",
    type: "cable-stayed",
    yearOpened: 1974,
    coordinates: { lon: 9.95, lat: 53.53 },
    coordinatesApprox: true,
    intro:
      "Köhlbrandbrücke is a distinctive cable-stayed bridge in the Port of Hamburg. It’s iconic as industrial infrastructure that still looks elegant.",
    tagline: "A port bridge where industry meets design.",

    length: "Total length: ~3.6 km",

    quickFacts: [
      { label: "Style", value: "Cable-stayed" },
      { label: "Opened", value: "1974" },
    ],
    funFact:
      "It feels like a city landmark, but it’s really a working bridge for a giant port.",
    engineeringBreakdown: mergedBreakdown("cable-stayed"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/K%C3%B6hlbrandbr%C3%BCcke",
      },
    ],
  },
  {
    slug: "rio-niteroi-bridge",
    name: "Rio–Niterói Bridge",
    country: "Brazil",
    city: "Rio de Janeiro",
    type: "beam",
    yearOpened: 1974,
    coordinates: { lon: -43.16, lat: -22.88 },
    coordinatesApprox: true,
    intro:
      "The Rio–Niterói Bridge crosses Guanabara Bay, linking Rio de Janeiro and Niterói. It’s iconic as a huge urban bay crossing.",
    tagline: "A bay bridge that ties two cities into one daily system.",

    length: "Total length: ~13.3 km",

    quickFacts: [
      { label: "Use", value: "Road" },
      { label: "Crosses", value: "Guanabara Bay" },
    ],
    funFact:
      "It’s one of those bridges where the view is postcard-level — but the traffic is very real-life.",
    engineeringBreakdown: mergedBreakdown("beam"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Rio%E2%80%93Niter%C3%B3i_Bridge",
      },
    ],
  },
  {
    slug: "octavio-frias-de-oliveira-bridge",
    name: "Octávio Frias de Oliveira Bridge (Ponte Estaiada)",
    country: "Brazil",
    city: "São Paulo",
    type: "cable-stayed",
    yearOpened: 2008,
    coordinates: { lon: -46.701, lat: -23.625 },
    coordinatesApprox: true,
    intro:
      "Octávio Frias de Oliveira Bridge is a cable-stayed bridge in São Paulo with a very recognizable X-shaped tower.",
    tagline: "A cable-stayed bridge with a signature X-shaped tower.",

    length: "Total length: ~1.38 km",

    quickFacts: [
      { label: "Style", value: "Cable-stayed" },
      { label: "Opened", value: "2008" },
    ],
    funFact:
      "It looks like modern sculpture — but it’s carrying real traffic through a mega-city.",
    engineeringBreakdown: mergedBreakdown("cable-stayed"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Oct%C3%A1vio_Frias_de_Oliveira_Bridge",
      },
    ],
  },
  {
    slug: "nelson-mandela-bridge",
    name: "Nelson Mandela Bridge",
    country: "South Africa",
    city: "Johannesburg",
    type: "cable-stayed",
    yearOpened: 2003,
    coordinates: { lon: 28.044, lat: -26.200 },
    coordinatesApprox: true,
    intro:
      "Nelson Mandela Bridge is a cable-stayed bridge in Johannesburg. It’s iconic for its twin pylon shape and for being a modern symbol in the city.",
    tagline: "A modern landmark with a clean cable-stayed profile.",

    length: "Total length: ~284 m",

    quickFacts: [
      { label: "Style", value: "Cable-stayed" },
      { label: "Opened", value: "2003" },
    ],
    funFact:
      "At night, lighting turns the cables into a graphic design in the sky.",
    engineeringBreakdown: mergedBreakdown("cable-stayed"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Nelson_Mandela_Bridge",
      },
    ],
  },
  {
    slug: "maputo-katembe-bridge",
    name: "Maputo–Katembe Bridge",
    country: "Mozambique",
    city: "Maputo",
    type: "suspension",
    yearOpened: 2018,
    coordinates: { lon: 32.61, lat: -25.99 },
    coordinatesApprox: true,
    intro:
      "Maputo–Katembe Bridge is a long suspension bridge crossing Maputo Bay. It’s iconic as a major modern infrastructure project in Mozambique.",
    tagline: "A modern suspension bridge stretching across a bay.",

    length: "Total length: ~3.0 km",

    quickFacts: [
      { label: "Style", value: "Suspension" },
      { label: "Opened", value: "2018" },
    ],
    funFact:
      "It’s the kind of bridge that changes how a whole city connects to its waterfront.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Maputo%E2%80%93Katembe_bridge",
      },
    ],
  },
  {
    slug: "6th-october-bridge",
    name: "6th of October Bridge",
    country: "Egypt",
    city: "Cairo",
    type: "viaduct",
    yearOpened: 1972,
    coordinates: { lon: 31.22, lat: 30.05 },
    coordinatesApprox: true,
    intro:
      "6th of October Bridge is a huge elevated roadway across Cairo. It’s iconic as a piece of urban infrastructure that moves an entire city.",
    tagline: "An urban viaduct where the city is the load.",

    length: "Total length: ~20.5 km",

    quickFacts: [
      { label: "Use", value: "Urban highway" },
      { label: "City", value: "Cairo" },
    ],
    funFact:
      "It’s not a ‘nice scenic bridge’ — it’s a survival tool for traffic.",
    engineeringBreakdown: mergedBreakdown("viaduct"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/6th_of_October_Bridge",
      },
    ],
  },
  {
    slug: "stari-most",
    name: "Stari Most",
    country: "Bosnia and Herzegovina",
    city: "Mostar",
    type: "arch",
    yearOpened: 1566,
    coordinates: { lon: 17.814, lat: 43.337 },
    coordinatesApprox: true,
    intro:
      "Stari Most is a stone arch bridge in Mostar. It’s iconic for its single graceful arch and for its cultural meaning.",
    tagline: "A single stone arch that became a symbol.",

    length: "Total length: ~30 m",

    quickFacts: [
      { label: "Style", value: "Stone arch" },
      { label: "Era", value: "16th century" },
    ],
    funFact:
      "It’s famous enough that people travel just to watch jumps into the river.",
    engineeringBreakdown: mergedBreakdown("arch"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Stari_Most" },
    ],
  },
  {
    slug: "petersen-bridge",
    name: "Ponte Hercílio Luz",
    country: "Brazil",
    city: "Florianópolis",
    type: "suspension",
    yearOpened: 1926,
    coordinates: { lon: -48.553, lat: -27.594 },
    coordinatesApprox: true,
    intro:
      "Ponte Hercílio Luz is a historic suspension bridge in Florianópolis. It’s iconic in Brazil for its old-school suspension design and city skyline presence.",
    tagline: "A historic suspension bridge with a classic silhouette.",

    length: "Total length: ~820 m",

    quickFacts: [
      { label: "Style", value: "Suspension" },
      { label: "Opened", value: "1926" },
    ],
    funFact:
      "It’s a bridge that reads like history: older engineering, restored to keep the icon alive.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Ponte_Herc%C3%ADlio_Luz",
      },
    ],
  },
  {
    slug: "george-washington-bridge",
    name: "George Washington Bridge",
    country: "United States",
    city: "New York City",
    type: "suspension",
    yearOpened: 1931,
    coordinates: { lon: -73.952, lat: 40.851 },
    coordinatesApprox: true,
    intro:
      "The George Washington Bridge is a major suspension bridge over the Hudson River, linking Manhattan and New Jersey. It’s iconic as a high-capacity bridge that handles enormous daily traffic.",
    tagline: "A suspension bridge designed to move huge volumes.",

    length: "Total length: ~1.45 km",

    quickFacts: [
      { label: "Style", value: "Suspension" },
      { label: "Opened", value: "1931" },
    ],
    funFact:
      "It’s basically a daily stress test for a suspension bridge.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      {
        label: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/George_Washington_Bridge",
      },
    ],
  },
  {
    slug: "great-belt-bridge",
    name: "Great Belt Bridge",
    country: "Denmark",
    city: "Storeb%C3%A6lt",
    type: "suspension",
    yearOpened: 1998,
    coordinates: { lon: 10.95, lat: 55.33 },
    coordinatesApprox: true,
    intro:
      "Great Belt Bridge is part of the fixed link across Storeb%C3%A6lt in Denmark. It’s iconic as a nation-scale connector.",
    tagline: "A nation-linking bridge built at serious scale.",

    length: "Total length: ~6.8 km",

    quickFacts: [
      { label: "Style", value: "Suspension (main span)" },
      { label: "Opened", value: "1998" },
    ],
    funFact:
      "Crossing it feels like you’re just driving into the horizon.",
    engineeringBreakdown: mergedBreakdown("suspension"),
    sources: [
      { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Great_Belt_Bridge" },
    ],
  },
];

export function getBridge(slug: string): Bridge | undefined {
  return bridges.find((b) => b.slug === slug);
}
