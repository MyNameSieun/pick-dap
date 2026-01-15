'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ContentsType } from '@/constants/contents';

const Contents = ({ contents }: { contents: ContentsType }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    contents.forEach((content) => {
      const element = document.getElementById(content.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden w-50 shrink-0 flex-col border-r-2 border-gray-300 p-3 lg:flex">
      <div className="sticky top-20">
        <h5 className="h5 mb-4">목차</h5>
        <ol className="text-gray-1000 b2 flex flex-col gap-1">
          {contents.map((content, index) => {
            const isActive = activeId === content.id;
            return (
              <li
                key={content.id}
                className={cn(
                  'hover:text-main-400 cursor-pointer p-2 transition-all duration-300',
                  isActive
                    ? 'text-main-400 bg-main-100 pt translate-x-1 rounded-md font-bold'
                    : 'text-gray-500',
                )}
                onClick={() => {
                  document
                    .getElementById(content.id)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {index + 1}. {content.label}
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
};

export default Contents;
