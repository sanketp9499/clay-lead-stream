// Ottawa Leads Agent - Type Definitions

export type Size = '1-10' | '11-50' | '51-200' | '201-500' | '500+';

export interface Filters {
  keywords?: string[];
  size?: Size;
  hasInstagram?: boolean;
  hasLinkedIn?: boolean;
  hasPhone?: boolean;
  limit?: number; // default 1000, max 5000
}

export type LogLevel = 'info' | 'error' | 'debug';
export type Stage = 'login' | 'filters' | 'export' | 'upload' | 'done';

export interface StatusEvent {
  ts: number;
  level: LogLevel;
  stage: Stage;
  message: string;
}

export interface RunState {
  runId: string | null;
  isRunning: boolean;
  logs: StatusEvent[];
  csvReady: boolean;
  error: string | null;
}

export interface UploadMeta {
  totalRows?: number;
  filters: Filters;
}