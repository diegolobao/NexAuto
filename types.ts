export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ChatStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  status: 'active' | 'coming_soon';
  systemPrompt?: string;
  initialTrigger?: string;
}