export interface SlideContent {
  id: string;
  title: string;
  subtitle?: string;
  body: string | string[]; // Can be a paragraph or bullet points
  layout?: 'center' | 'split';
}

export enum SlideState {
  INTRO = 'INTRO',
  PRESENTATION = 'PRESENTATION',
  END = 'END'
}