export interface ExternalLink {
  name: string;
  url: string;
}

export interface MainAreaState {
  type: 'welcome' | 'external' | 'report';
  url?: string;
}