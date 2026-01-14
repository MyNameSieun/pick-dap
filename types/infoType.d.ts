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
