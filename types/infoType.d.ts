interface Author {
  id: string;
  username: string;
  profileImage: string;
}

interface PostStats {
  viewCount: number;
  bookmarkCount?: number;
  likeCount?: number;
  commentCount?: number;
  postImage?: string;
}

interface PostData {
  id: string;
  title: string;
  categoryId?: string;
  author: Author;
  createdAt: string;
  stats: PostStats;
}
