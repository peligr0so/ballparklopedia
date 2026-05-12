export type FranchiseId =
  | "orioles" | "red-sox" | "yankees" | "rays" | "blue-jays"
  | "white-sox" | "guardians" | "tigers" | "royals" | "twins"
  | "astros" | "angels" | "athletics" | "mariners" | "rangers"
  | "braves" | "marlins" | "mets" | "phillies" | "nationals"
  | "cubs" | "reds" | "brewers" | "pirates" | "cardinals"
  | "diamondbacks" | "rockies" | "dodgers" | "padres" | "giants";

export interface Franchise {
  id: FranchiseId;
  currentName: string;
  league: "AL" | "NL";
  division: "AL East" | "AL Central" | "AL West" | "NL East" | "NL Central" | "NL West";
  note?: string; // historical moves or rebrands worth surfacing
}

export const FRANCHISES: Record<FranchiseId, Franchise> = {
  // AL East
  orioles:   { id: "orioles",   currentName: "Baltimore Orioles",    league: "AL", division: "AL East" },
  "red-sox": { id: "red-sox",   currentName: "Boston Red Sox",       league: "AL", division: "AL East" },
  yankees:   { id: "yankees",   currentName: "New York Yankees",     league: "AL", division: "AL East" },
  rays:      { id: "rays",      currentName: "Tampa Bay Rays",       league: "AL", division: "AL East" },
  "blue-jays": { id: "blue-jays", currentName: "Toronto Blue Jays", league: "AL", division: "AL East" },
  // AL Central
  "white-sox": { id: "white-sox", currentName: "Chicago White Sox",  league: "AL", division: "AL Central" },
  guardians:   { id: "guardians", currentName: "Cleveland Guardians", league: "AL", division: "AL Central" },
  tigers:      { id: "tigers",    currentName: "Detroit Tigers",      league: "AL", division: "AL Central" },
  royals:      { id: "royals",    currentName: "Kansas City Royals",  league: "AL", division: "AL Central" },
  twins:       { id: "twins",     currentName: "Minnesota Twins",     league: "AL", division: "AL Central" },
  // AL West
  astros:    { id: "astros",    currentName: "Houston Astros",       league: "AL", division: "AL West", note: "Moved from NL Central to AL West in 2013" },
  angels:    { id: "angels",    currentName: "Los Angeles Angels",   league: "AL", division: "AL West" },
  athletics: { id: "athletics", currentName: "Oakland Athletics",    league: "AL", division: "AL West", note: "Moved from Philadelphia (Athletics) to Kansas City to Oakland; temporarily in Sacramento while Las Vegas ballpark is built" },
  mariners:  { id: "mariners",  currentName: "Seattle Mariners",     league: "AL", division: "AL West" },
  rangers:   { id: "rangers",   currentName: "Texas Rangers",        league: "AL", division: "AL West" },
  // NL East
  braves:    { id: "braves",    currentName: "Atlanta Braves",       league: "NL", division: "NL East", note: "Played in Boston (1876–1952) and Milwaukee (1953–1965) before moving to Atlanta" },
  marlins:   { id: "marlins",   currentName: "Miami Marlins",        league: "NL", division: "NL East" },
  mets:      { id: "mets",      currentName: "New York Mets",        league: "NL", division: "NL East" },
  phillies:  { id: "phillies",  currentName: "Philadelphia Phillies", league: "NL", division: "NL East" },
  nationals: { id: "nationals", currentName: "Washington Nationals", league: "NL", division: "NL East", note: "Montreal Expos (1969–2004) relocated to Washington D.C. in 2005" },
  // NL Central
  cubs:      { id: "cubs",      currentName: "Chicago Cubs",         league: "NL", division: "NL Central" },
  reds:      { id: "reds",      currentName: "Cincinnati Reds",      league: "NL", division: "NL Central" },
  brewers:   { id: "brewers",   currentName: "Milwaukee Brewers",    league: "NL", division: "NL Central", note: "Played in AL West (1969–1997) before moving to NL Central" },
  pirates:   { id: "pirates",   currentName: "Pittsburgh Pirates",   league: "NL", division: "NL Central" },
  cardinals: { id: "cardinals", currentName: "St. Louis Cardinals",  league: "NL", division: "NL Central" },
  // NL West
  diamondbacks: { id: "diamondbacks", currentName: "Arizona Diamondbacks", league: "NL", division: "NL West" },
  rockies:      { id: "rockies",      currentName: "Colorado Rockies",     league: "NL", division: "NL West" },
  dodgers:      { id: "dodgers",      currentName: "Los Angeles Dodgers",  league: "NL", division: "NL West", note: "Brooklyn Dodgers (1890–1957) relocated to Los Angeles in 1958" },
  padres:       { id: "padres",       currentName: "San Diego Padres",     league: "NL", division: "NL West" },
  giants:       { id: "giants",       currentName: "San Francisco Giants", league: "NL", division: "NL West", note: "New York Giants (1883–1957) relocated to San Francisco in 1958" },
};

// Maps every team name that appears in stadiums.ts → franchise ID
const TEAM_TO_FRANCHISE: Record<string, FranchiseId> = {
  // Current names
  "Baltimore Orioles":     "orioles",
  "Boston Red Sox":        "red-sox",
  "New York Yankees":      "yankees",
  "Tampa Bay Rays":        "rays",
  "Toronto Blue Jays":     "blue-jays",
  "Chicago White Sox":     "white-sox",
  "Cleveland Guardians":   "guardians",
  "Cleveland Indians":     "guardians",
  "Detroit Tigers":        "tigers",
  "Kansas City Royals":    "royals",
  "Minnesota Twins":       "twins",
  "Houston Astros":        "astros",
  "Los Angeles Angels":    "angels",
  "Anaheim Angels":        "angels",
  "California Angels":     "angels",
  "Oakland Athletics":     "athletics",
  "Kansas City Athletics": "athletics",
  "Philadelphia Athletics":"athletics",
  "Seattle Mariners":      "mariners",
  "Texas Rangers":         "rangers",
  "Washington Senators":   "rangers",
  "Atlanta Braves":        "braves",
  "Milwaukee Braves":      "braves",
  "Boston Braves":         "braves",
  "Miami Marlins":         "marlins",
  "Florida Marlins":       "marlins",
  "New York Mets":         "mets",
  "Philadelphia Phillies": "phillies",
  "Washington Nationals":  "nationals",
  "Montreal Expos":        "nationals",
  "Chicago Cubs":          "cubs",
  "Cincinnati Reds":       "reds",
  "Milwaukee Brewers":     "brewers",
  "Seattle Pilots":        "brewers",
  "Pittsburgh Pirates":    "pirates",
  "St. Louis Cardinals":   "cardinals",
  "Arizona Diamondbacks":  "diamondbacks",
  "Colorado Rockies":      "rockies",
  "Los Angeles Dodgers":   "dodgers",
  "Brooklyn Dodgers":      "dodgers",
  "San Diego Padres":      "padres",
  "San Francisco Giants":  "giants",
  "New York Giants":       "giants",
};

export function getFranchiseId(team: string): FranchiseId {
  const id = TEAM_TO_FRANCHISE[team];
  if (!id) throw new Error(`Unknown team name: "${team}" — add it to TEAM_TO_FRANCHISE in lib/franchises.ts`);
  return id;
}

export const DIVISION_ORDER = [
  "AL East", "AL Central", "AL West",
  "NL East", "NL Central", "NL West",
] as const;

export type Division = (typeof DIVISION_ORDER)[number];
