import ProjectDetail from '@/features/mypage/components/Project/ProjectDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}
export const generateMetadata = async ({ params }: PageProps) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  return {
    title: {
      absolute: `프로젝트 - ${decodedSlug}`,
    },
  };
};

const MypageProjectDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  return (
    <div>
      <ProjectDetail slug={slug} />
    </div>
  );
};

export default MypageProjectDetailPage;
