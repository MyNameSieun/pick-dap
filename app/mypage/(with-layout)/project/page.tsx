'use client';
import EmptyStateBox from '@/components/common/EmptyStateBox/EmptyStateBox';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import Loader from '@/components/ui/Loader';
import { useFetchProjectMyList } from '@/features/mypage/hooks/project/useFetchProject';
import { FolderOpen, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MypageProjectsPage = () => {
  const router = useRouter();
  const { data: projects, isPending: isProjectPending } =
    useFetchProjectMyList();

  if (isProjectPending) return <Loader />;

  return (
    <div>
      <div className="flex justify-between">
        <HeaderTitleBox
          title="프로젝트"
          content="2개의 프로젝트가 등록되어 있습니다"
          icon={FolderOpen}
        />  

        <div className="flex items-center gap-3">
          <Button
            className="h-10 rounded-full"
            onClick={() => router.push('/mypage/project/new')}
          >
            <Plus />
            프로젝트 추가
          </Button>
        </div>
      </div>

      <section>
        {projects?.length === 0 ? (
          <EmptyStateBox
            title="프로젝트를 추가해보세요"
            description="프로젝트 정보를 등록하면 AI가 더 정확한 면접 질문을 생성해드립니다"
            Icon={FolderOpen}
            buttonName="프로젝트 추가하기"
            onClick={() => router.push('/mypage/project/new')}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {projects?.map(({ id, title, description, created_at, slug }) => (
              <article
                onClick={() => router.push(`/mypage/project/${slug}`)}
                key={id}
                className="flex cursor-pointer flex-col justify-between rounded-sm border border-gray-300 bg-white p-5 shadow-sm transition-colors hover:border-gray-400"
              >
                <div className="flex flex-col gap-1">
                  <h6 className="text-gray-1000 font-bold">{title}</h6>
                  <div className="b2 line-clamp-2 break-all text-gray-700">
                    {description}
                  </div>
                </div>
                <time className="c1 mt-9 text-gray-600">
                  등록일: {new Date(created_at).toLocaleString('ko-KR')}
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
