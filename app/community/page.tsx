import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '커뮤니티',
  description: '픽답 커뮤니티입니다.',
};

export default function CommunityPage() {
  redirect('/community/1');
} // 자동으로 1(전체)로 리다이렉트됨
