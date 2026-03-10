import ProjectDetail from '@/features/mypage/components/Project/ProjectDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const MypageProjectDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  return (
    <div>
      <ProjectDetail slug={slug} />
    </div>
  );
};

export default MypageProjectDetailPage;
  