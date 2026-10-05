export interface CareerStat {
  label: string;
  value: string;
  detail: string;
  rank?: string;
}

export interface EraStatGroup {
  id: string;
  name: string;
  years: string;
  team: string;
  wins: number;
  poles: number;
  podiums: number;
  championships: number;
  races: number;
  description: string;
}

export interface CareerMilestone {
  year: string;
  title: string;
  category: 'Championship' | 'Record' | 'Career Move' | 'Historic Win';
  summary: string;
  details: string;
  team: 'McLaren' | 'Mercedes-AMG' | 'Scuderia Ferrari';
  accentColor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ferrari' | 'racing' | 'style';
  categoryLabel: string;
  imageSrc: string;
  webpSrc: string;
  altText: string;
  caption: string;
  dateOrYear: string;
  credit: string;
}

export interface VentureItem {
  name: string;
  category: string;
  role: string;
  founded: string;
  description: string;
  impactMetrics: string[];
  externalUrl?: string;
  urlLabel?: string;
}

export interface VerifiedQuote {
  quote: string;
  context: string;
  year: string;
  source: string;
}
