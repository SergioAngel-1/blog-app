export type ArticleType = 'Actualidad' | 'Deporte' | 'Cultura';

export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: ArticleType;
  imageUrl: string;
}