'use client';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { FolderOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ReviewMainHeader = () => {
  const router = useRouter();

  return (
    <HeaderTitleBox
      title={'면접 후기'}
      content={'실제 면접 경험을 공유하고 다른사람들의 후기를 확인해 보세요 '}
      icon={FolderOpen}
      buttonOption={{
        text: '후기 등록',
        action: () => {
          router.push('/');
        },
      }}
    />
  );
};

export default ReviewMainHeader;
