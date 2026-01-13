interface Props {
  params: Promise<{ categoryId: string; id: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { categoryId, id } = await params;
  return {
    title: `커뮤니티 ${categoryId}-${id}`,
  };
};

const CommunityCategoryDetailIdPage = () => {
  return <></>;
};

export default CommunityCategoryDetailIdPage;
