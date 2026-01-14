interface PostType {
  id: string;
  title: string;
  content: string;
  categoryId?: string;
  author: Author;
  createdAt: string;
  stats: PostStats;
}
