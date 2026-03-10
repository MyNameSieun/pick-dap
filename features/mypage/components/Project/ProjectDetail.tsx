'use client';

import { useState } from 'react';
import {
  Pen,
  Check,
  ChevronLeft,
  Github,
  Globe,
  Terminal,
  Users,
  Target,
  Lightbulb,
  Trophy,
  LucideIcon,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

import Loader from '@/components/ui/Loader';
import { useFetchProjectMyDetail } from '../../hooks/project/useFetchProject';
import { Button } from '@/components/ui/button/Button';
import Line from '@/components/common/Line';

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
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: project, isPending } = useFetchProjectMyDetail(slug);

  if (isPending) return <Loader />;

  if (!project)
    return (
      <div className="p-10 text-center text-gray-500">
        프로젝트 데이터를 찾을 수 없습니다.
      </div>
    );

  return (
    <div className="space-y-8 px-10 py-10">
      {/* 상단 */}
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

        <div className="flex items-center">
          <Button
            variant={isEditMode ? 'default' : 'white'}
            onClick={() => router.push(`/mypage/project/${slug}/edit`)}
          >
            {isEditMode ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Pen className="mr-2 h-4 w-4" />
            )}
            {isEditMode ? '수정완료' : '수정'}
          </Button>
        </div>
      </div>

      {/* 헤더 */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>

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
