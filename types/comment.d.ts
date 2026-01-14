interface CommentType {
  id: string;
  content: string;
  postId: string;
  categoryId?: string;
  author: Author;
  createdAt: string;
}
