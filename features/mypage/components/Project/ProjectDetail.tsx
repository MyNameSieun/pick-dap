'use client';

import { useRef, useState } from 'react';
import {
  Pen,
  ChevronLeft,
  Github,
  Globe,
  Terminal,
  Users,
  Target,
  Lightbulb,
  Trophy,
  LucideIcon,
  Trash2,
  MoreVertical,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

import Loader from '@/components/ui/Loader';
import { useFetchProjectMyDetail } from '../../hooks/project/useFetchProject';
import { Button } from '@/components/ui/button/Button';
import Line from '@/components/common/Line';
import { useDeleteProject } from '../../hooks/project/useDeleteProject';
import { toast } from 'sonner';

interface ProjectDetailProps {
  slug: string;
}

interface DetailSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const DetailSection = ({ title, icon: Icon, children }: DetailSectionProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
        <Icon className="text-main-500 h-5 w-5" />
        {title}
      </div>

      <div className="space-y-3">{children}</div>
    </section>
  );
};

const ItemBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-lg bg-gray-50 p-4 transition hover:bg-gray-100">
      {children}
    </div>
  );
};

const ProjectDetail = ({ slug }: ProjectDetailProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { data: project, isPending: isProjectPending } =
    useFetchProjectMyDetail(slug);
  const { mutate: deleteProject } = useDeleteProject();

  if (isProjectPending) return <Loader />;

  if (!project)
    return (
      <div className="p-10 text-center text-gray-500">
        프로젝트 데이터를 찾을 수 없습니다.
      </div>
    );

  const handleDeleteProject = () => {
    setIsMenuOpen(false);
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteProject(slug, {
        onSuccess: () => {
          toast.success('프로젝트가 삭제되었습니다.');

          router.replace('/mypage/project');
        },
        onError: (error) => {
          toast.error('삭제 중 문제가 발생했습니다. 다시 시도해 주세요.');
          console.error(error);
        },
      });
    }
  };

  return (
    <div className="space-y-8 px-10 py-10">
      <div className="flex justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
          >
            <ChevronLeft className="h-4 w-4" />
            뒤로가기
          </button>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-start justify-between">
          <h1 className="text-3xl leading-tight font-bold text-gray-900">
            {project.title}
          </h1>

          <div className="relative ml-4" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMenuOpen(false)}
                />

                <div className="animate-in fade-in zoom-in-95 absolute right-0 z-20 mt-2 w-36 origin-top-right rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push(`/mypage/project/${slug}/edit`);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <Pen size={14} className="text-icon-default" />
                    수정하기
                  </button>
                  <button
                    onClick={handleDeleteProject}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <Trash2 size={14} className="text-icon-default" />
                    삭제하기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-lg text-gray-600">{project.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span
            className={`rounded-md px-3 py-1 font-medium ${
              project.project_type === 'team'
                ? 'bg-indigo-50 text-indigo-600'
                : 'bg-green-50 text-green-600'
            }`}
          >
            {project.project_type === 'team'
              ? '👥 팀 프로젝트'
              : '👤 개인 프로젝트'}
          </span>

          <time>
            {project.start_date} ~ {project.end_date || '진행 중'}
          </time>

          <div className="ml-auto flex gap-2">
            {project.github_url && (
              <Button
                variant="white"
                size="icon"
                onClick={() => window.open(project.github_url!, '_blank')}
              >
                <Github className="h-5 w-5" />
              </Button>
            )}

            {project.deploy_url && (
              <Button
                variant="white"
                size="icon"
                onClick={() => window.open(project.deploy_url!, '_blank')}
              >
                <Globe className="h-5 w-5 text-blue-500" />
              </Button>
            )}
          </div>
        </div>
      </section>
      <Line />

      {/* 기술 스택 */}
      {project.tech_stack?.length > 0 && (
        <DetailSection title="기술 스택" icon={Terminal}>
          {project.tech_stack.map((tech) => (
            <ItemBox key={tech.id}>
              <p className="whitespace-pre-wrap">{tech.description}</p>
            </ItemBox>
          ))}
        </DetailSection>
      )}

      {/* 핵심 기능 */}
      {project.function?.length > 0 && (
        <DetailSection title="핵심 기능" icon={Target}>
          {project.function.map((f) => (
            <ItemBox key={f.id}>{f.description}</ItemBox>
          ))}
        </DetailSection>
      )}

      {/* 담당 역할 */}
      {project.role?.length > 0 && (
        <DetailSection title="담당 역할" icon={Users}>
          {project.role.map((r) => (
            <ItemBox key={r.id}>{r.description}</ItemBox>
          ))}
        </DetailSection>
      )}

      {/* 문제 해결 */}
      {project.troubleshooting?.length > 0 && (
        <DetailSection title="문제 해결 경험" icon={Lightbulb}>
          {project.troubleshooting.map((t) => (
            <ItemBox key={t.id}>
              <p className="whitespace-pre-wrap">{t.description}</p>
            </ItemBox>
          ))}
        </DetailSection>
      )}

      {/* 성과 */}
      {project.performance?.length > 0 && (
        <DetailSection title="프로젝트 성과" icon={Trophy}>
          {project.performance.map((p) => (
            <ItemBox key={p.id}>{p.description}</ItemBox>
          ))}
        </DetailSection>
      )}
    </div>
  );
};

export default ProjectDetail;
