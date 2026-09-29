export type Metric = {
  label: string;
  before: number;
  after: number;
  unit?: string;
  lowerIsBetter?: boolean;
};

export type Quote = {
  name: string;
  business: string;
  text: string;
  videoUrl?: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  summary: string;
  problem: string;
  fix: string;
  measuredWith: string;
  metrics: Metric[];
  quote?: Quote;
};

// Add entries ONLY for real work the client agreed to publish
export const CASE_STUDIES: CaseStudy[] = [];
export const QUOTES: Quote[] = [];