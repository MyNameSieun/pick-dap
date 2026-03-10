'use client';
import EmptyStateBox from '@/components/common/EmptyStateBox/EmptyStateBox';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import { Button } from '@/components/ui/button/Button';
import Loader from '@/components/ui/Loader';
import { useFetchProjectMyList } from '@/features/mypage/hooks/project/useFetchProject';
import { FolderOpen, Plus, Calendar, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MypageProjectsPage = () => {
  const router = useRouter();
  const { data: projects, isPending: isProjectPending } =
    useFetchProjectMyList();

  if (isProjectPending) return <Loader />;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col items-start justify-between border-gray-100 pb-6 sm:flex-row sm:items-center">
        <HeaderTitleBox
          title="프로젝트"
          content={`${projects?.length || 0}개의 프로젝트가 등록되어 있습니다`}
          icon={FolderOpen}
        />
        <Button
          className="h-11 gap-2 rounded-full px-6 shadow-sm transition-all hover:shadow-md"
          onClick={() => router.push('/mypage/project/new')}
        >
          <Plus size={18} />
          프로젝트 추가
        </Button>
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects?.map(({ id, title, description, created_at, slug }) => (
              <article
                key={id}
                onClick={() => router.push(`/mypage/project/${slug}`)}
                className="group hover:border-main-200 relative flex cursor-pointer flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="group-hover:text-main-500 text-lg font-bold text-gray-900 transition-colors">
                      {title}
                    </h3>
                    <div className="group-hover:bg-main-50 group-hover:text-main-500 rounded-full bg-gray-50 p-1.5 text-gray-400 transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  </div>

                  <p className="line-clamp-2 h-10 text-sm leading-relaxed break-all text-gray-700">
                    {description || '상세 설명이 없습니다.'}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-50">
                  <div className="mt-4 flex items-center gap-1.5 text-gray-500">
                    <Calendar size={14} />
                    <span className="text-xs">
                      {new Date(created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <span className="text-main-400 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                    상세보기
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MypageProjectsPage;
