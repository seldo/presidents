export type President = {
  Tier: string;
  Number: string;
  President: string;
  "In Office": string;
  Lived: string;
  Pros: string;
  Cons: string;
  "Fun fact": string;
  Grade: string;
  Slavery: string;
  Genocide: string;
  "War Crimes": string;
  Rape: string;
  Corruption: string;
  Tweets: string;
};

const SHEET_ID = "14pdn9yikv2ET9SNz2mcdAoh4On5sgHfkI-HbCEfrLdI";
const RANGE = "'Tiers'!A:P";

let cache: President[] | null = null;

export async function getPresidents(): Promise<President[]> {
  if (cache) return cache;

  const key = (import.meta.env.GOOGLE_API_KEY ?? process.env.GOOGLE_API_KEY ?? "").trim();
  if (!key) throw new Error("GOOGLE_API_KEY env var is required");

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheets API ${res.status}: ${await res.text()}`);

  const { values } = (await res.json()) as { values: string[][] };
  const headers = values[0];
  cache = values.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = row[i] ?? ""; });
    return obj as unknown as President;
  });
  return cache;
}

export const TIER_ORDER = [
  "Awesome",
  "Great",
  "Above average",
  "Average",
  "Below average",
  "Awful",
  "The worst",
] as const;
