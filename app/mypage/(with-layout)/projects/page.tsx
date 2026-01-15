'use client';
import EmptyStateBox from '@/components/common/EmptyStateBox/EmptyStateBox';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import { FolderOpen, Pen, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const projectData = [
  {
    id: '1',
    title: '프로젝트 제목1',
    content: '프로젝트 내용1',
    createDate: '2026-01-04',
  },
  {
    id: '2',
    title: '프로젝트 제목2',
    content: '프로젝트 내용2',
    createDate: '2026-02-21',
  },
  {
    id: '3',
    title: '프로젝트 제목2',
    content: '프로젝트 내용2',
    createDate: '2026-02-21',
  },
  {
    id: '4',
    title: '프로젝트 제목2',
    content: '프로젝트 내용2',
    createDate: '2026-02-21',
  },
];
const MypageProjectsPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between">
        <HeaderTitleBox
          title="프로젝트"
          content="2개의 프로젝트가 등록되어 있습니다"
          icon={FolderOpen}
        />

        <div className="flex items-center gap-3">
          <Button variant={'white'} className="h-10 rounded-full">
            <Pen />
            수정
          </Button>
          <Button
            className="h-10 rounded-full"
            onClick={() => router.push('/mypage/project/new')}
          >
            <Plus />
            프로젝트 추가
          </Button>
        </div>
      </div>

      <section className="mt-5">
        {projectData.length === 0 ? (
          <EmptyStateBox
            title="프로젝트를 추가해보세요"
            description="프로젝트 정보를 등록하면 AI가 더 정확한 면접 질문을 생성해드립니다"
            Icon={FolderOpen}
            buttonName="프로젝트 추가하기"
            onClick={() => router.push('/mypage/project/new')}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {projectData.map(({ id, title, content, createDate }) => (
              <article
                key={id}
                className="flex cursor-pointer flex-col justify-between rounded-sm border border-gray-300 bg-white p-5 shadow-sm transition-colors hover:border-gray-400"
              >
                <div className="flex flex-col gap-1">
                  <h6 className="text-gray-1000 font-bold">{title}</h6>
                  <div className="b2 line-clamp-2 break-all text-gray-700">
                    {content}
                  </div>
                </div>
                <time className="c1 mt-9 text-gray-600">
                  등록일: {createDate}
                </time>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MypageProjectsPage;
