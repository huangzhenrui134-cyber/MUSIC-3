export interface Question {
  id: number;
  text: string;
  weight: number;
  options: QuestionOption[];
  category: 'emotion' | 'scene' | 'weather';
}

export interface ScoreBoard {
  [tag: string]: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  tags: string[];
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
  comment: string;
  tags: string[];
}
