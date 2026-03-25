'use client';

import { useEffect } from 'react';
import { FileText, PlusCircle } from 'lucide-react';
import PostCard from './PostCard/PostCard';
import Loader from '@/components/ui/Loader';
import { Button } from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import usePostFilters from '../hooks/usePostFilters';
import { useFetchInfinitePostData } from '../hooks/useFetchPostsData';

const CommunityContents = ({ categorySlug }: { categorySlug: string }) => {
  const router = useRouter();
  const { sort, searchQuery } = usePostFilters();
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFetchInfinitePostData({
      categorySlug,
      sort,
      searchQuery,
    });

  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <Loader />;

  const allPosts = data?.pages.flatMap((page) => page) || [];

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      {allPosts.length > 0 ? (
        <div className="flex flex-col gap-4 md:gap-5">
          {allPosts.map((post) => (
            <div
              key={post.id}
              className="transition-transform duration-200 active:scale-[0.99]"
            >
              <PostCard post={post} />
            </div>
          ))}

          <div
            ref={ref}
            className="flex w-full items-center justify-center py-8"
          >
            {isFetchingNextPage && <Loader />}
          </div>
        </div>
      ) : (
        <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-100 bg-gray-50/50 px-6">
          <div className="relative mb-6">
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-bounce rounded-full bg-blue-400 opacity-20" />
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <FileText className="h-10 w-10 text-gray-200" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-bold text-gray-900">
              아직 게시글이 없네요
            </h3>
            <p className="max-w-[240px] text-center text-[14px] leading-relaxed text-gray-400">
              이 공간을 멋진 이야기로 <br />
              가장 먼저 채워보시겠어요?
            </p>
          </div>

          <Button
            variant="white"
            className="mt-8 flex items-center gap-2 rounded-full border-gray-200 px-6 py-5 shadow-sm transition-all hover:border-blue-200 hover:text-blue-600"
            onClick={() => router.push('/community/post/new')}
          >
            <PlusCircle size={18} />
            <span className="font-bold">첫 글 작성하기</span>
          </Button>
        </div>
      )}
    </section>
  );
};

export default CommunityContents;
