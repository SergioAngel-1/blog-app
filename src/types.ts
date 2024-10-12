export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  type: "Actualidad" | "Deporte" | "Cultura";
}

export type ArticleFormData = Omit<Article, "id" | "createdAt" | "updatedAt">;