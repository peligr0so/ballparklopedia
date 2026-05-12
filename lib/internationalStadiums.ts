export type InternationalCountry = "Japan" | "South Korea";

export interface InternationalStadium {
  id: string;
  slug: string;
  name: string;
  nameLocal: string;
  team: string; // "LG Twins / Doosan Bears" for shared parks
  country: InternationalCountry;
  league: string; // "NPB · Central League", "NPB · Pacific League", "KBO"
  city: string;
  capacity: number;
  yearOpened: number;
  coordinates: { lat: number; lng: number };
  description: string;
  funFacts: string[];
  imageColor: string;
}

export const internationalStadiums: InternationalStadium[] = [
  // ── NPB · Central League ─────────────────────────────────────────────────
  {
    id: "tokyo-dome",
    slug: "tokyo-dome",
    name: "Tokyo Dome",
    nameLocal: "東京ドーム",
    team: "Yomiuri Giants",
    country: "Japan",
    league: "NPB · Central League",
    city: "Tokyo",
    capacity: 45600,
    yearOpened: 1988,
    coordinates: { lat: 35.70566, lng: 139.75191 },
    description:
      "The first fully domed stadium in Asia, Tokyo Dome — affectionately known as the \"Big Egg\" — has been the home of the storied Yomiuri Giants since 1988 and a landmark of Japanese baseball culture.",
    funFacts: [
      "Tokyo Dome was the first fully air-pressurized domed stadium in Asia; the roof is kept inflated by slightly higher air pressure inside than outside.",
      "The Yomiuri Giants are Japan's most successful and most-watched franchise, often called 'the Yankees of Japanese baseball.'",
      "The stadium also hosts concerts, boxing, and pro wrestling — New Japan Pro-Wrestling's Wrestle Kingdom events regularly sell out all 45,000 seats.",
    ],
    imageColor: "bg-orange-600",
  },
  {
    id: "meiji-jingu-stadium",
    slug: "meiji-jingu-stadium",
    name: "Meiji Jingu Stadium",
    nameLocal: "明治神宮野球場",
    team: "Tokyo Yakult Swallows",
    country: "Japan",
    league: "NPB · Central League",
    city: "Tokyo",
    capacity: 37933,
    yearOpened: 1926,
    coordinates: { lat: 35.67453, lng: 139.71706 },
    description:
      "One of the oldest active ballparks in professional baseball, Meiji Jingu Stadium sits in the heart of Tokyo's Shinjuku district, surrounded by the forested grounds of Meiji Shrine. Its intimate scale and central location make it one of the most beloved venues in Japanese baseball.",
    funFacts: [
      "The stadium opened in 1926, making it one of the oldest active professional baseball venues in the world — older than many MLB parks.",
      "The Swallows' fan tradition of opening umbrellas during rallies creates one of the most visually distinctive crowd displays in all of baseball.",
      "The stadium sits adjacent to the sacred grounds of Meiji Shrine, and high fly balls have been known to disappear into the surrounding trees.",
    ],
    imageColor: "bg-blue-600",
  },
  {
    id: "yokohama-stadium",
    slug: "yokohama-stadium",
    name: "Yokohama Stadium",
    nameLocal: "横浜スタジアム",
    team: "Yokohama DeNA BayStars",
    country: "Japan",
    league: "NPB · Central League",
    city: "Yokohama",
    capacity: 35250,
    yearOpened: 1978,
    coordinates: { lat: 35.44343, lng: 139.64010 },
    description:
      "Nicknamed 'Hamastar,' Yokohama Stadium is the compact, raucous home of the DeNA BayStars in the heart of Yokohama's Kannai district. It hosted Olympic and Paralympic baseball events during the 2020 Tokyo Games.",
    funFacts: [
      "Yokohama Stadium hosted baseball during the 2020 Tokyo Olympics, making it the first Olympic baseball venue in Japan in decades.",
      "The park is famous for its electric atmosphere — BayStars fans are among the loudest in NPB, filling the stadium with coordinated chants and thundersticks.",
      "Located within walking distance of Chinatown and the Yokohama waterfront, 'Hamastar' is one of the most accessible and tourist-friendly ballparks in Japan.",
    ],
    imageColor: "bg-blue-700",
  },
  {
    id: "vantelin-dome-nagoya",
    slug: "vantelin-dome-nagoya",
    name: "Vantelin Dome Nagoya",
    nameLocal: "バンテリンドームナゴヤ",
    team: "Chunichi Dragons",
    country: "Japan",
    league: "NPB · Central League",
    city: "Nagoya",
    capacity: 36418,
    yearOpened: 1997,
    coordinates: { lat: 35.18611, lng: 136.94722 },
    description:
      "The home of the Chunichi Dragons in Nagoya, Vantelin Dome is one of several fully domed NPB stadiums, providing climate-controlled comfort year-round. The Dragons' loyal fanbase has made it one of the most consistently well-attended parks in Japanese baseball.",
    funFacts: [
      "The dome was originally called Nagoya Dome and has gone through several corporate naming rights changes.",
      "Vantelin, the sponsoring brand, produces pain-relief creams and gels — making for one of the more unexpected stadium naming partnerships in professional baseball.",
      "The Chunichi Dragons won their most recent Japan Series in 2007, and the championship celebration at the dome has become legendary in Nagoya.",
    ],
    imageColor: "bg-blue-800",
  },
  {
    id: "hanshin-koshien-stadium",
    slug: "hanshin-koshien-stadium",
    name: "Hanshin Koshien Stadium",
    nameLocal: "阪神甲子園球場",
    team: "Hanshin Tigers",
    country: "Japan",
    league: "NPB · Central League",
    city: "Nishinomiya",
    capacity: 47400,
    yearOpened: 1924,
    coordinates: { lat: 34.72140, lng: 135.36170 },
    description:
      "The oldest active professional baseball stadium in Japan and one of the most sacred venues in all of the sport, Koshien Stadium is the passionate home of the Hanshin Tigers and the annual site of Japan's National High School Baseball Championship — a tournament that commands the entire country's attention every summer.",
    funFacts: [
      "Koshien Stadium opened on August 1, 1924 — making it older than Yankee Stadium and nearly as old as Fenway Park.",
      "The National High School Baseball Championship (Koshien Tournament) is held here twice annually and is one of Japan's most-watched sporting events, with over 4 million fans attending across the two tournaments.",
      "Hanshin Tigers fans are famous for their intensity; the Tigers-Giants rivalry is the most heated in Japanese baseball, sometimes compared to the Yankees-Red Sox dynamic.",
    ],
    imageColor: "bg-yellow-500",
  },
  {
    id: "mazda-zoom-zoom-stadium",
    slug: "mazda-zoom-zoom-stadium",
    name: "Mazda Zoom-Zoom Stadium Hiroshima",
    nameLocal: "MAZDA Zoom-Zoom スタジアム広島",
    team: "Hiroshima Toyo Carp",
    country: "Japan",
    league: "NPB · Central League",
    city: "Hiroshima",
    capacity: 32000,
    yearOpened: 2009,
    coordinates: { lat: 34.39192, lng: 132.48475 },
    description:
      "The most beloved ballpark in Japan by many accounts, Mazda Zoom-Zoom Stadium Hiroshima is a masterpiece of modern stadium design — an open-air park that brought Hiroshima's Carp faithful back to the heart of the city after decades in an aging facility.",
    funFacts: [
      "Mazda Stadium is almost always sold out; the Hiroshima Carp have one of the most devoted fanbases in Japan, with season tickets in such high demand that waiting lists stretch for years.",
      "The stadium's name reflects Hiroshima's status as Mazda's headquarters city — the automaker has been the Carp's primary sponsor for decades.",
      "The Carp won back-to-back-to-back Central League pennants from 2016 to 2018, sparking a golden era of near-sellout crowds at the park.",
    ],
    imageColor: "bg-red-600",
  },

  // ── NPB · Pacific League ──────────────────────────────────────────────────
  {
    id: "mizuho-paypay-dome",
    slug: "mizuho-paypay-dome",
    name: "Mizuho PayPay Dome Fukuoka",
    nameLocal: "みずほPayPayドーム福岡",
    team: "Fukuoka SoftBank Hawks",
    country: "Japan",
    league: "NPB · Pacific League",
    city: "Fukuoka",
    capacity: 40142,
    yearOpened: 1993,
    coordinates: { lat: 33.59528, lng: 130.36222 },
    description:
      "Japan's first stadium built with a retractable roof, Mizuho PayPay Dome sits on Fukuoka's waterfront and is home to the powerhouse SoftBank Hawks — winners of multiple consecutive Japan Series titles and arguably the most dominant dynasty in recent NPB history.",
    funFacts: [
      "The SoftBank Hawks won five Japan Series championships in six seasons between 2015 and 2020, making them the most dominant team in NPB during that era.",
      "The dome was the first retractable-roof stadium in Japan when it opened in 1993; on clear days, the roof opens to reveal stunning views of Hakata Bay.",
      "The stadium complex includes a hotel, spa, and entertainment zone called the 'Hawks Town' development — fans can stay overnight within the stadium.",
    ],
    imageColor: "bg-yellow-600",
  },
  {
    id: "zozo-marine-stadium",
    slug: "zozo-marine-stadium",
    name: "ZOZO Marine Stadium",
    nameLocal: "ZOZOマリンスタジアム",
    team: "Chiba Lotte Marines",
    country: "Japan",
    league: "NPB · Pacific League",
    city: "Chiba",
    capacity: 29635,
    yearOpened: 1990,
    coordinates: { lat: 35.64524, lng: 140.03092 },
    description:
      "Perched on the edge of Tokyo Bay in Mihama, ZOZO Marine Stadium is famous across Japan for its brutal sea winds — known locally as 'Marine winds' — that can turn routine fly balls into unpredictable adventures and make the park one of the most uniquely challenging venues in professional baseball.",
    funFacts: [
      "The park's proximity to Tokyo Bay creates powerful marine winds that significantly affect play — outfielders must account for gusts of up to 25 mph on breezy days.",
      "ZOZO Marine is named for ZOZO, Inc., the Japanese fashion e-commerce giant founded by eccentric entrepreneur Yusaku Maezawa.",
      "The Marines' fans are known as the 'Lotte Oendan' and are considered among the most energetic supporters in NPB, creating a wall of noise behind the first-base line.",
    ],
    imageColor: "bg-gray-700",
  },
  {
    id: "belluna-dome",
    slug: "belluna-dome",
    name: "Belluna Dome",
    nameLocal: "ベルーナドーム",
    team: "Saitama Seibu Lions",
    country: "Japan",
    league: "NPB · Pacific League",
    city: "Tokorozawa",
    capacity: 31552,
    yearOpened: 1979,
    coordinates: { lat: 35.76850, lng: 139.42050 },
    description:
      "One of the most unusual stadiums in professional baseball, Belluna Dome is a semi-outdoor domed stadium where home runs can literally fly out of the building — its roof covers the seating areas but leaves the outfield walls open to the outside air.",
    funFacts: [
      "Belluna Dome has an open structure unlike any other: the dome roof covers the grandstand but the outfield is open, meaning balls can leave the stadium entirely on long home runs.",
      "The park is nestled in the wooded hills of Tokorozawa, Saitama, giving it a forested, almost rustic setting unusual for a professional sports venue.",
      "The Seibu Lions won eight consecutive Pacific League pennants from 1982 to 1992 — one of the greatest dynasties in NPB history.",
    ],
    imageColor: "bg-blue-500",
  },
  {
    id: "rakuten-mobile-park",
    slug: "rakuten-mobile-park",
    name: "Rakuten Mobile Saikyo Park Miyagi",
    nameLocal: "楽天モバイル最強パーク宮城",
    team: "Tohoku Rakuten Golden Eagles",
    country: "Japan",
    league: "NPB · Pacific League",
    city: "Sendai",
    capacity: 30508,
    yearOpened: 1950,
    coordinates: { lat: 38.25621, lng: 140.90250 },
    description:
      "The home of the Tohoku Rakuten Golden Eagles in Sendai, this park carries deep emotional significance for the Tohoku region. When the Eagles won the 2013 Japan Series — their first championship and just their ninth year of existence — it was celebrated as a moment of healing for a region still recovering from the 2011 earthquake and tsunami.",
    funFacts: [
      "The Eagles' 2013 Japan Series victory, led by ace Masahiro Tanaka, was profoundly meaningful for the Tohoku region still rebuilding after the March 2011 earthquake and tsunami devastated the area.",
      "Rakuten Mobile Park is the oldest active baseball stadium in Japan, with portions of the facility dating to 1950 — though it has been extensively renovated multiple times.",
      "The Eagles are one of NPB's newest franchises, founded in 2004 as an expansion team, making their 2013 championship among the fastest turnarounds in professional baseball history.",
    ],
    imageColor: "bg-red-700",
  },
  {
    id: "kyocera-dome-osaka",
    slug: "kyocera-dome-osaka",
    name: "Kyocera Dome Osaka",
    nameLocal: "京セラドーム大阪",
    team: "Orix Buffaloes",
    country: "Japan",
    league: "NPB · Pacific League",
    city: "Osaka",
    capacity: 36627,
    yearOpened: 1997,
    coordinates: { lat: 34.66930, lng: 135.47610 },
    description:
      "The centerpiece of Osaka's Namba entertainment district, Kyocera Dome is home to the Orix Buffaloes — winners of back-to-back Japan Series titles in 2022 and 2023 and one of the most exciting young teams in NPB. The dome is also a beloved concert venue that has hosted every major Japanese and international act.",
    funFacts: [
      "Orix Buffaloes manager Satoshi Nakashima led the team to consecutive Japan Series championships in 2022 and 2023, reinvigorating a franchise that had gone decades without winning.",
      "The dome's official name is 'Osaka Dome,' though Kyocera Corporation holds the naming rights — the stadium is unusual in that the original name is still widely used.",
      "Shohei Ohtani played his final NPB seasons with the Orix Buffaloes before moving to MLB — helping transform the franchise into a powerhouse.",
    ],
    imageColor: "bg-blue-700",
  },
  {
    id: "escon-field-hokkaido",
    slug: "escon-field-hokkaido",
    name: "ES CON Field Hokkaido",
    nameLocal: "エスコンフィールド北海道",
    team: "Hokkaido Nippon-Ham Fighters",
    country: "Japan",
    league: "NPB · Pacific League",
    city: "Kitahiroshima",
    capacity: 35000,
    yearOpened: 2023,
    coordinates: { lat: 42.98972, lng: 141.54944 },
    description:
      "The newest and most technologically advanced ballpark in Japanese baseball, ES CON Field Hokkaido opened in 2023 as the Fighters' purpose-built home in Kitahiroshima — featuring a retractable roof, a hotel with rooms overlooking the field, and a 100-meter transparent glass wall beyond right field.",
    funFacts: [
      "ES CON Field has a hotel inside the stadium complex with rooms that look directly down onto the field — guests can watch games from their beds.",
      "The park's translucent right-field wall stands 100 meters tall and is made entirely of glass, allowing fans to see Mount Fureai in the distance on clear days.",
      "The Fighters made the controversial decision to leave Sapporo Dome and build their own facility — a move that paid off with a state-of-the-art park widely regarded as the best in NPB.",
    ],
    imageColor: "bg-slate-600",
  },

  // ── KBO ───────────────────────────────────────────────────────────────────
  {
    id: "jamsil-baseball-stadium",
    slug: "jamsil-baseball-stadium",
    name: "Jamsil Baseball Stadium",
    nameLocal: "잠실야구장",
    team: "LG Twins / Doosan Bears",
    country: "South Korea",
    league: "KBO",
    city: "Seoul",
    capacity: 25000,
    yearOpened: 1982,
    coordinates: { lat: 37.51239, lng: 127.07197 },
    description:
      "The most famous ballpark in South Korean baseball, Jamsil Stadium is home to two KBO franchises — the LG Twins and the Doosan Bears — and sits within the sprawling Seoul Sports Complex near the Han River. Derby games between these two Seoul clubs are among the most electric atmospheres in Asian baseball.",
    funFacts: [
      "Jamsil Stadium is the only KBO ballpark shared by two full-time home teams; LG and Doosan alternate home dates throughout the season.",
      "The LG-Doosan 'Seoul Series' is the fiercest rivalry in Korean baseball, drawing frenzied crowds and intense media coverage every time the two teams face each other at home.",
      "The stadium hosted baseball events during the 1988 Seoul Olympics — the games that elevated KBO's profile and helped turn baseball into South Korea's most popular sport.",
    ],
    imageColor: "bg-red-600",
  },
  {
    id: "gocheok-sky-dome",
    slug: "gocheok-sky-dome",
    name: "Gocheok Sky Dome",
    nameLocal: "고척스카이돔",
    team: "Kiwoom Heroes",
    country: "South Korea",
    league: "KBO",
    city: "Seoul",
    capacity: 16744,
    yearOpened: 2015,
    coordinates: { lat: 37.49822, lng: 126.86725 },
    description:
      "South Korea's first and only fully domed baseball stadium, Gocheok Sky Dome brought climate-controlled professional baseball to Seoul's western Guro district. The stadium's intimate size creates an unusually loud atmosphere for a domed venue.",
    funFacts: [
      "Gocheok Sky Dome is the first and only fully enclosed dome in Korean baseball — all other KBO stadiums are open-air.",
      "The Heroes' passionate fanbase fills the relatively compact dome to create one of the loudest environments in Korean sports, despite the smaller capacity.",
      "The stadium has also hosted international events including the 2023 World Baseball Classic pool play games.",
    ],
    imageColor: "bg-purple-600",
  },
  {
    id: "ssg-landers-field",
    slug: "ssg-landers-field",
    name: "Incheon SSG Landers Field",
    nameLocal: "인천 SSG 랜더스필드",
    team: "SSG Landers",
    country: "South Korea",
    league: "KBO",
    city: "Incheon",
    capacity: 23000,
    yearOpened: 2002,
    coordinates: { lat: 37.43678, lng: 126.69331 },
    description:
      "Home to the SSG Landers — owned by the Shinsegae retail conglomerate — Incheon SSG Landers Field sits in South Korea's third-largest city and serves as the flagship venue for one of the KBO's most active spenders and most successful recent franchises.",
    funFacts: [
      "The SSG Landers won back-to-back KBO championships in 2021 and 2022, cementing the franchise's status as one of the league's premier clubs.",
      "The stadium was originally called Munhak Baseball Stadium before the Shinsegae-owned SSG Landers rebranded it in 2021.",
      "Incheon is South Korea's gateway to the world — home to its largest international airport — giving the Landers a fan base that extends across the greater Seoul metro area.",
    ],
    imageColor: "bg-red-500",
  },
  {
    id: "suwon-kt-wiz-park",
    slug: "suwon-kt-wiz-park",
    name: "Suwon KT Wiz Park",
    nameLocal: "수원 KT 위즈 파크",
    team: "KT Wiz",
    country: "South Korea",
    league: "KBO",
    city: "Suwon",
    capacity: 20000,
    yearOpened: 1989,
    coordinates: { lat: 37.29978, lng: 127.00967 },
    description:
      "The home of the KT Wiz in Suwon, Gyeonggi Province, the park serves one of the largest satellite cities in the Seoul metropolitan area. The Wiz are one of KBO's newer franchises, entering the league as an expansion team in 2015.",
    funFacts: [
      "The KT Wiz joined the KBO as an expansion team in 2015 and won their first Korean Series championship in 2021 — one of the fastest turnarounds for an expansion franchise in league history.",
      "KT Corporation, the telecom giant that owns the team, chose Suwon as their base — the city is home to Samsung's global headquarters and is a major tech hub.",
      "The stadium was built in 1989 for amateur and semi-pro baseball before being upgraded to KBO standards when the Wiz joined the league.",
    ],
    imageColor: "bg-red-700",
  },
  {
    id: "daegu-samsung-lions-park",
    slug: "daegu-samsung-lions-park",
    name: "Daegu Samsung Lions Park",
    nameLocal: "대구삼성라이온즈파크",
    team: "Samsung Lions",
    country: "South Korea",
    league: "KBO",
    city: "Daegu",
    capacity: 24000,
    yearOpened: 2016,
    coordinates: { lat: 35.84092, lng: 128.68161 },
    description:
      "Opened in 2016, Daegu Samsung Lions Park is one of the most modern ballparks in Korean baseball, replacing the old Daegu Civil Stadium. Home to the Samsung Lions — the most decorated franchise in KBO history — the park is a point of civic pride for South Korea's fourth-largest city.",
    funFacts: [
      "The Samsung Lions have won nine Korean Series championships — more than any other KBO franchise — making Daegu one of the most successful baseball cities in Korea.",
      "Samsung Lions Park opened in 2016, replacing the old Daegu Civil Stadium that had served the Lions since 1982.",
      "Samsung Electronics, based nearby in Suwon, is the park's primary corporate connection — though the Lions are technically a separate entity from the electronics giant.",
    ],
    imageColor: "bg-blue-600",
  },
  {
    id: "sajik-baseball-stadium",
    slug: "sajik-baseball-stadium",
    name: "Sajik Baseball Stadium",
    nameLocal: "사직야구장",
    team: "Lotte Giants",
    country: "South Korea",
    league: "KBO",
    city: "Busan",
    capacity: 24500,
    yearOpened: 1985,
    coordinates: { lat: 35.19403, lng: 129.06161 },
    description:
      "Known as a 'mecca of Korean baseball,' Sajik Stadium in Busan is the passionate home of the Lotte Giants and the most storied ballpark in Korean baseball history. The Giants' fanbase — among the most fanatical in all of Asian baseball — creates an atmosphere that rivals any stadium in the world.",
    funFacts: [
      "Lotte Giants fans are legendary for their loyalty and intensity; the 'Busan Galmaegi' (Seagull) chant creates a wall of sound that visiting players consistently describe as the most intimidating in the KBO.",
      "Sajik Stadium is the only KBO park where fans are still known to stand for the entirety of games, creating a concert-like standing-room atmosphere.",
      "The Lotte Giants have not won a Korean Series since 1992, yet they consistently draw among the highest attendance in the league — a testament to the unwavering devotion of Busan's baseball fans.",
    ],
    imageColor: "bg-red-600",
  },
  {
    id: "gwangju-kia-champions-field",
    slug: "gwangju-kia-champions-field",
    name: "Gwangju-KIA Champions Field",
    nameLocal: "광주 KIA 챔피언스 필드",
    team: "KIA Tigers",
    country: "South Korea",
    league: "KBO",
    city: "Gwangju",
    capacity: 20500,
    yearOpened: 2014,
    coordinates: { lat: 35.16814, lng: 126.88911 },
    description:
      "Home to the KIA Tigers — one of KBO's most decorated franchises — Gwangju-KIA Champions Field opened in 2014 as a modern replacement for the old Gwangju Municipal Baseball Stadium. The Tigers' passionate fanbase in South Korea's southwest gateway city packs the park nightly.",
    funFacts: [
      "The KIA Tigers have won 11 Korean Series championships, the most in KBO history, making them the most successful franchise in Korean baseball.",
      "Champions Field replaced the old Gwangju Municipal Stadium that had served as the Tigers' home since 1983.",
      "KIA Motors sponsors the team, creating one of the most prominent corporate-franchise partnerships in Asian baseball.",
    ],
    imageColor: "bg-red-700",
  },
  {
    id: "daejeon-hanwha-life-ballpark",
    slug: "daejeon-hanwha-life-ballpark",
    name: "Daejeon Hanwha Life Ballpark",
    nameLocal: "대전 한화생명 볼파크",
    team: "Hanwha Eagles",
    country: "South Korea",
    league: "KBO",
    city: "Daejeon",
    capacity: 20000,
    yearOpened: 2025,
    coordinates: { lat: 36.31625, lng: 127.43144 },
    description:
      "The newest ballpark in Korean baseball, Daejeon Hanwha Life Ballpark opened in March 2025 to replace the aging Hanbat Baseball Stadium that had served the Hanwha Eagles since 1986. A signature feature is the 8-meter translucent glass 'Monster Wall' in right field.",
    funFacts: [
      "The park's signature 'Monster Wall' — an 8-meter translucent glass fence in right field — allows fans in the stands to see the visiting bullpen, a first in Korean baseball.",
      "The ballpark hosted the 2025 KBO All-Star Game in its inaugural season, a rare honor for a brand-new facility.",
      "Hanwha Life Insurance, the sponsor, is one of South Korea's largest insurance companies, headquartered in Daejeon.",
    ],
    imageColor: "bg-orange-500",
  },
  {
    id: "changwon-nc-park",
    slug: "changwon-nc-park",
    name: "Changwon NC Park",
    nameLocal: "창원 NC 파크",
    team: "NC Dinos",
    country: "South Korea",
    league: "KBO",
    city: "Changwon",
    capacity: 22112,
    yearOpened: 2019,
    coordinates: { lat: 35.22244, lng: 128.58183 },
    description:
      "The home of the NC Dinos in Changwon, a major industrial city in South Gyeongsang Province, Changwon NC Park is one of the most modern stadiums in Korean baseball — opened in 2019 to replace the team's temporary home in the city.",
    funFacts: [
      "The NC Dinos, named for the game studio NC Soft that owns the team, joined the KBO as an expansion franchise in 2013 and won the Korean Series in just their eighth season in 2020.",
      "Changwon NC Park was built with a distinctive deep blue color scheme throughout the stadium, reflecting the Dinos' team colors.",
      "NC Soft, the team's parent company, develops massively popular online games like Lineage — making the Dinos one of the most tech-forward franchises in Asian baseball.",
    ],
    imageColor: "bg-blue-700",
  },
];

export const npbStadiums = internationalStadiums.filter(
  (s) => s.league.startsWith("NPB")
);
export const npbCentralStadiums = internationalStadiums.filter(
  (s) => s.league === "NPB · Central League"
);
export const npbPacificStadiums = internationalStadiums.filter(
  (s) => s.league === "NPB · Pacific League"
);
export const kboStadiums = internationalStadiums.filter(
  (s) => s.league === "KBO"
);

export const stadiumsByCountry: Record<InternationalCountry, InternationalStadium[]> = {
  Japan: npbStadiums,
  "South Korea": kboStadiums,
};

export const countrySlug: Record<InternationalCountry, string> = {
  Japan: "japan",
  "South Korea": "south-korea",
};

export const slugToCountry: Record<string, InternationalCountry> = {
  japan: "Japan",
  "south-korea": "South Korea",
};

export function getInternationalStadiumBySlug(
  slug: string
): InternationalStadium | undefined {
  return internationalStadiums.find((s) => s.slug === slug);
}

export function getAllInternationalSlugs(): { country: string; slug: string }[] {
  return internationalStadiums.map((s) => ({
    country: countrySlug[s.country],
    slug: s.slug,
  }));
}
