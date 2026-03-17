import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
// 프로젝트의 Supabase 클라이언트 경로에 맞게 수정해주세요

interface Props {
  selectedJobRoleId: string;
  selectedQuestionId: string;
}

export default function InterviewStartButton({
  selectedJobRoleId,
  selectedQuestionId,
}: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartInterview = async () => {
    // 1. 예외 처리: 선택된 값이 없는 경우
    if (!selectedJobRoleId || !selectedQuestionId) {
      alert('직무와 질문을 모두 선택해주세요!');
      return;
    }

    setIsLoading(true);

    try {
      // 2. 현재 로그인한 유저 정보 가져오기
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert('로그인이 필요합니다.');
        return;
      }

      // 3. ai_interview 테이블에 데이터 Insert
      const { data: interviewData, error: insertError } = await supabase
        .from('ai_interview')
        .insert({
          user_id: user.id,
          job_role_id: selectedJobRoleId,
          question_id: selectedQuestionId,
          status: 'IN_PROGRESS', // DB 설정에 Default가 있다면 생략 가능합니다
        })
        .select() // 🚀 Insert된 후 생성된 'id'를 반환받기 위해 필수!
        .single();

      if (insertError) {
        console.error('Insert Error:', insertError);
        throw new Error('인터뷰 생성 실패');
      }

      // 4. 성공 시 생성된 인터뷰 방 ID를 가지고 라우팅
      if (interviewData) {
        // 인터뷰 방 경로(예: /interview/room/[id])는 프로젝트 구조에 맞게 수정하세요
        router.push(`/interview/room/${interviewData.id}`);
      }
    } catch (error) {
      alert('면접을 시작하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleStartInterview}
      disabled={isLoading}
      className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white disabled:bg-gray-400"
    >
      {isLoading ? '면접 방 준비 중...' : '면접 시작'}
    </button>
  );
}
