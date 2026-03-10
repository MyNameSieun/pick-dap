// src/features/mypage/constants/navigation.ts
import { Bookmark, Bot, FolderOpen, Users } from 'lucide-react';

export const MYPAGE_MENUS_ITEMS = [
  {
    link: '/mypage/questions',
    name: '저장된 질문',
    icon: Bookmark,
  },
  {
    link: '/mypage/rooms',
    name: '픽봇 AI 면접',
    icon: Bot,
  },
  {
    link: '/mypage/community',
    name: '커뮤니티',
    icon: Users,
  },
  {
    link: '/mypage/project',
    name: '프로젝트',
    icon: FolderOpen,
  },
] as const;
