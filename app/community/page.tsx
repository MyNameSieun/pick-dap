import { redirect } from 'next/navigation';

export default function CommunityPage() {
  redirect('/community/1');
} // 자동으로 1(전체)로 리다이렉트됨
