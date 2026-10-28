import { getCollection } from 'astro:content';

export const TYPE_LABELS: Record<string, string> = {
  daily: 'Daily log',
  weekly: 'Weekly review',
  monthly: 'Monthly review',
  quarterly: 'Quarterly review',
};

/** Only entries marked "public" ever reach the website. Private entries are never built. */
export async function getPublicJournal() {
  const all = await getCollection('journal', ({ data }) => data.visibility === 'public');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPlaybooks() {
  const all = await getCollection('playbooks', ({ data }) => data.published);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getResearch() {
  const all = await getCollection('research', ({ data }) => data.published);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getTools() {
  const all = await getCollection('tools', ({ data }) => data.published);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getVideos() {
  const all = await getCollection('videos', ({ data }) => data.published);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function monthKey(d: Date) {
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function youtubeId(url?: string) {
  if (!url) return undefined;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? m[1] : undefined;
}

/** Markets text like "NQ · ES". */
export function marketsLabel(markets: string[]) {
  return markets.length ? markets.join(' · ') : '';
}

/** Alternate olive and brown cards down a list, as in the design. */
export function tone(i: number) {
  return i % 2 === 0 ? 'card' : 'card card--brown';
}
