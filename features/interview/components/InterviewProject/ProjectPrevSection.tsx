'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FolderOpen, Zap, CheckCircle2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useQueries } from '@tanstack/react-query';

import { Button } from '@/components/ui/button/Button';
import Loader from '@/components/ui/Loader';
import { useFetchProjectMyList } from '@/features/mypage/hooks/project/useFetchProject';
import { fetchProjectMyDetail } from '@/features/mypage/services/project/fetchProject';
import { QUERY_KEYS } from '@/lib/constants';
import { GenerateProjectsRequest } from '../../services/fetchGenerateProjects';

interface ProjectSubItem {
  id: string;
  description?: string;
  content?: string;
  name?: string;
}

interface ProjectDetailResponse {
  id: string;
  title: string;
  description: string;
  slug: string;
  function?: ProjectSubItem[];
  project_function?: ProjectSubItem[];
  role?: ProjectSubItem[];
  project_role?: ProjectSubItem[];
  tech_stack?: ProjectSubItem[];
  project_tech_stack?: ProjectSubItem[];
  troubleshooting?: ProjectSubItem[];
  project_troubleshooting?: ProjectSubItem[];
  performance?: ProjectSubItem[];
  project_performance?: ProjectSubItem[];
  retrospective?: ProjectSubItem[];
  project_retrospective?: ProjectSubItem[];
}

interface CombinedData {
  title: string[];
  functions: ProjectSubItem[];
  roles: ProjectSubItem[];
  tech_stacks: ProjectSubItem[];
  troubleshootings: ProjectSubItem[];
  performances: ProjectSubItem[];
  retrospectives: ProjectSubItem[];
}

interface ProjectPrevSectionProps {
  onGenerate: (options: GenerateProjectsRequest, projectId: string) => void;
  isPending: boolean;
}

const ProjectPrevSection = ({
  onGenerate,
  isPending,
}: ProjectPrevSectionProps) => {
  const router = useRouter();
  const { data: projectMyLists, isPending: isListLoading } =
    useFetchProjectMyList();

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  const projectDetailQueries = useQueries({
    queries: selectedSlugs.map((slug) => ({
      queryKey: QUERY_KEYS.project.myDetail(slug),
      queryFn: () =>
        fetchProjectMyDetail(slug) as Promise<ProjectDetailResponse>,
      staleTime: 1000 * 60 * 5,
    })),
  });

  const isDetailsLoading = projectDetailQueries.some((q) => q.isFetching);
  const allDetailsReady =
    projectDetailQueries.every((q) => q.data) && selectedSlugs.length > 0;

  if (isListLoading) return <Loader />;

  const handleToggleProject = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const handleGenerateClick = () => {
    if (!allDetailsReady) return;

    const selectedProjects =
      projectMyLists?.filter((p) => selectedSlugs.includes(p.slug)) || [];
    const representativeId = selectedProjects[0]?.id || '';

    const combinedData = projectDetailQueries.reduce<CombinedData>(
      (acc, query) => {
        const d = query.data;
        if (!d) return acc;

        return {
          title: [...acc.title, d.title],
          functions: [
            ...acc.functions,
            ...(d.project_function || d.function || []),
          ],
          roles: [...acc.roles, ...(d.project_role || d.role || [])],
          tech_stacks: [
            ...acc.tech_stacks,
            ...(d.project_tech_stack || d.tech_stack || []),
          ],
          troubleshootings: [
            ...acc.troubleshootings,
            ...(d.project_troubleshooting || d.troubleshooting || []),
          ],
          performances: [
            ...acc.performances,
            ...(d.project_performance || d.performance || []),
          ],
          retrospectives: [
            ...acc.retrospectives,
            ...(d.project_retrospective || d.retrospective || []),
          ],
        };
      },
      {
        title: [],
        functions: [],
        roles: [],
        tech_stacks: [],
        troubleshootings: [],
        performances: [],
        retrospectives: [],
      },
    );

    onGenerate(
      {
        title: combinedData.title.join(', '),
        description: `${selectedSlugs.length}개의 프로젝트 통합 분석`,
        project_type: '통합 분석',
        service_purpose: '다중 프로젝트 기반 역량 검증',
        functions: combinedData.functions.map((item) => ({
          ...item,
          description: item.description || item.content || '',
        })),
        roles: combinedData.roles.map((item) => ({
          ...item,
          description: item.description || '',
        })),
        tech_stacks: combinedData.tech_stacks.map((item) => ({
          ...item,
          description: item.description || item.name || '',
        })),
        troubleshootings: combinedData.troubleshootings.map((item) => ({
          ...item,
          description: item.description || '',
        })),
        performances: combinedData.performances.map((item) => ({
          ...item,
          description: item.description || '',
        })),
        retrospectives: combinedData.retrospectives.map((item) => ({
          ...item,
          description: item.description || '',
        })),
      },
      representativeId,
    );
  };

  return (
    <div
      className={twMerge(
        'container-col',
        'w-2/5 gap-2 rounded-[32px] bg-white p-8 shadow-sm',
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h5 className="h5 font-bold text-black">
            프로젝트 선택 ({selectedSlugs.length})
          </h5>
          <Button
            onClick={() => router.push('/mypage/project/new')}
            variant="link"
            size="xs"
          >
            + 추가하기
          </Button>
        </div>
        <p className="c1 mb-5 text-gray-600">
          함께 분석할 프로젝트들을 모두 선택하세요.
        </p>
      </div>

      <div className="custom-scrollbar flex max-h-[400px] flex-col gap-3 overflow-y-auto pr-2">
        {projectMyLists?.map((p) => {
          const isSelected = selectedSlugs.includes(p.slug);

          return (
            <article
              key={p.id}
              onClick={() => handleToggleProject(p.slug)}
              className={twMerge(
                'card-row cursor-pointer items-center border-2 transition-all active:scale-[0.98]',
                isSelected
                  ? 'border-main-300 bg-main-50/30'
                  : 'border-transparent bg-white shadow-sm hover:border-gray-100',
              )}
            >
              <div
                className={twMerge(
                  'rounded-[10px] p-4 transition-colors',
                  isSelected
                    ? 'bg-main-400 text-white'
                    : 'bg-gray-100 text-gray-400',
                )}
              >
                <FolderOpen size={24} />
              </div>

              <div className="flex-1 overflow-hidden">
                <p
                  className={twMerge(
                    'truncate font-bold',
                    isSelected ? 'text-main-700' : 'text-gray-900',
                  )}
                >
                  {p.title}
                </p>
                <p className="line-clamp-1 text-sm text-gray-500">
                  {p.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-2 h-6">
        {isDetailsLoading && (
          <p className="text-main-500 flex animate-pulse items-center gap-1 text-xs font-semibold">
            선택한 {selectedSlugs.length}개의 상세 데이터를 불러오는 중...
          </p>
        )}
      </div>

      <Button
        size="lg"
        className="w-full gap-2 font-bold shadow-lg"
        disabled={!allDetailsReady || isPending || isDetailsLoading}
        onClick={handleGenerateClick}
      >
        {isPending ? (
          <div className="flex items-center gap-2">AI 심층 분석 중...</div>
        ) : (
          <>
            <Zap size={18} fill="currentColor" />
            {selectedSlugs.length > 0
              ? `${selectedSlugs.length}개 프로젝트 통합 분석`
              : '프로젝트를 선택해주세요'}
          </>
        )}
      </Button>
    </div>
  );
};

export default ProjectPrevSection;
