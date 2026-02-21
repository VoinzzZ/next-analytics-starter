export type TrafficStat = {
  month: string;
  visits: number;
  uniques: number;
  avg_session_seconds: number;
};

export type ConversionStat = {
  month: string;
  rate: number;
};

export type SourceStat = {
  name: string;
  value: number;
};

export type PageStat = {
  page: string;
  views: number;
  uniques: number;
  bounce: number;
};

export type AnalyticsSummary = {
  traffic: TrafficStat[];
  conversion: ConversionStat[];
  sources: SourceStat[];
  pages: PageStat[];
};
