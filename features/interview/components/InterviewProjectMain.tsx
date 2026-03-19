'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FolderOpen } from 'lucide-react';
import { toast } from 'sonner';

import BackButton from '@/components/common/BackButton';
import HeaderTitleBox from '@/components/common/HeaderTitleBox';
import ProjectPrevSection from './InterviewProject/ProjectPrevSection';
import ProjectNextSection from './InterviewProject/ProjectNextSection';

import { useFetchGenerateProjects } from '../hooks/useFetchGenerateProjects';
import { useCreateInterview } from '../hooks/useCreateAiInterview';
import {
  GenerateProjectsRequest,
  GenerateProjectsResponse,
} from '../services/fetchGenerateProjects';

const PROJECT_SESSION_KEY = 'ai_project_session_bundle';

interface InterviewSessionData {
  projects: GenerateProjectsResponse[];
  targetProjectId: string | null;
}

const InterviewProjectMain = () => {
  const router = useRouter();

  const [lastAnalyzedProjectId, setLastAnalyzedProjectId] = useState<
    string | null
  >(null);

  const { mutate: generateProjects, isPending: isGenerateProjectsPending } =
    useFetchGenerateProjects();

  const { mutate: startInterview, isPending: isStartInterviewPending } =
    useCreateInterview({
      onSuccess: (data) => {
        router.push(`/interview/ai/room/${data?.id}`);
      },
      onError: () => {
        toast.error('면접 방 생성에 실패했습니다.');
      },
    });

  const [sessionData, setSessionData] = useState<InterviewSessionData | null>(
    () => {
      if (typeof window !== 'undefined') {
        const saved = sessionStorage.getItem(PROJECT_SESSION_KEY);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.targetProjectId)
              setLastAnalyzedProjectId(parsed.targetProjectId);
            return parsed;
          } catch (error) {
            console.error('세션 복구 실패:', error);
          }
        }
      }
      return null;
    },
  );

  const handleGenerate = (
    options: GenerateProjectsRequest,
    projectId: string,
  ) => {
    setSessionData(null);
    setLastAnalyzedProjectId(projectId);

    generateProjects(options, {
      onSuccess: (data) => {
        const newBundle: InterviewSessionData = {
          projects: data,
          targetProjectId: projectId,
        };

        setSessionData(newBundle);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(
            PROJECT_SESSION_KEY,
            JSON.stringify(newBundle),
          );
        }
        toast.success('분석이 완료되었습니다!');
      },
    });
  };
  const handleStartInterview = (selectedQuestion: GenerateProjectsResponse) => {
    if (!lastAnalyzedProjectId) {
      toast.error('프로젝트 정보가 유실되었습니다. 다시 분석해주세요.');
      return;
    }

    startInterview({
      categoryType: 'Project',
      initialQuestion: selectedQuestion.question,
      questionId: `PROJECT_AI_${selectedQuestion.id}`,
      projectId: lastAnalyzedProjectId,
    });
  };

  return (
    <>
      <BackButton
        label={
          <p>
            <b>면접 연습 메인</b>으로 돌아가기
          </p>
        }
      />
      <div className="mb-6">
        <HeaderTitleBox
          title={'프로젝트 면접 질문 생성하기'}
          content={'진행한 프로젝트를 기반으로 면접 질문 생성'}
          icon={FolderOpen}
        />
      </div>

      <div className="flex items-start gap-6">
        <ProjectPrevSection
          onGenerate={handleGenerate}
          isPending={isGenerateProjectsPending}
        />

        <ProjectNextSection
          projects={sessionData?.projects || []}
          isPending={isGenerateProjectsPending}
          onStart={handleStartInterview}
          isStarting={isStartInterviewPending}
        />
      </div>
    </>
  );
};

export default InterviewProjectMain;
