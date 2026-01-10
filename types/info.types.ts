export interface Author {
  id: string;
  name: string;
  profileImage: string;
}

export interface PostStats {
  viewCount: number;
  bookmarkCount: number;
  likeCount: number;
  commentCount: number;
}

export interface PostData {
  id: string;
  title: string;
  author: Author;
  createdAt: string;
  stats: PostStats;
}
