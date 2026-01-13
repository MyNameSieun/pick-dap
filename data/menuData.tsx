import CommunityContents from '@/features/community/components/CommunityContents';

export const mypageMenuData: TabItem[] = [
  {
    id: '1',
    label: '작성 게시글',
    content: <div>작성 게시글 영역</div>,
  },
  {
    id: '2',
    label: '작성 댓글',
    content: <div>작성 댓글 영역</div>,
  },
  {
    id: '3',
    label: '좋아요',
    content: <div>좋아요 영역</div>,
  },
];

export const communityMenuData: TabItem[] = [
  {
    id: '1',
    label: '전체',
    content: <CommunityContents categoryId="1" />,
  },
  {
    id: '2',
    label: '자유게시판',
    content: <CommunityContents categoryId="2" />,
  },

  {
    id: '3',
    label: '면접 정보',
    content: <CommunityContents categoryId="3" />,
  },
  {
    id: '4',
    label: '스터디',
    content: <CommunityContents categoryId="4" />,
  },
  {
    id: '5',
    label: '질의 응답',
    content: <CommunityContents categoryId="5" />,
  },
  {
    id: '6',
    label: '프로젝트',
    content: <CommunityContents categoryId="6" />,
  },
];
