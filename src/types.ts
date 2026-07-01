export interface Option {
  id: string;
  text: string;
  tags: string[];
  direction: 'up' | 'right' | 'down' | 'left'; // 💡 补上这个让 Vercel 报错的灵魂属性！
}

export interface Question {
  id: number;
  text: string;
  category: string;
  weight: number;
  options: Option[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  comment: string;
  tags: string[];
}

export interface ScoreBoard {
  [key: string]: number;
}