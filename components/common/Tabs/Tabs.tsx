'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { twMerge } from 'tailwind-merge';

const Tabs = ({ tabs, setId, className, onTabChange }: TabsProps) => {
  const [isMenu, setMenu] = useState(setId || tabs[0].id);
  const [prevId, setPrevId] = useState(setId);

  if (setId !== prevId) {
    setPrevId(setId || tabs[0].id);
    setMenu(setId || tabs[0].id);
  }

  const handleTabClick = (id: string) => {
    if (onTabChange) {
      onTabChange(id);
    } else {
      setMenu(id);
    }
  };

  return (
    <div className={twMerge('w-full', className)}>
      <div className="relative flex border-b border-gray-300">
        {tabs.map((v) => (
          <button
            key={v.id}
            onClick={() => handleTabClick(v.id)}
            className={cn(
              'b1 text-gray-1000 relative cursor-pointer px-6 py-3 transition-colors outline-none',
              isMenu === v.id
                ? 'text-gray-1000 font-bold'
                : 'hover:text-gray-1000 font-normal text-gray-800',
            )}
          >
            {v.label}

            {isMenu === v.id && (
              <motion.div
                layoutId="isMenu"
                className="bg-main-400 absolute right-0 bottom-0 left-0 h-0.5"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
              // layoutId가 같으면, 자연스럽게 이동해줌
              // spring은 탄성 옵션, stiffness가 높을수록 빠르게 튀어나감, damping은 마찰력
            )}
          </button>
        ))}
      </div>
      <div className="my-6 overflow-hidden">
        <motion.div
          key={isMenu}
          initial={{ opacity: 0, x: 30 }} // 처음에는 x가 30인 값(오른쪽)에서
          animate={{ opacity: 1, x: 0 }} // x가 0인 값으로 이동
          exit={{ opacity: 0, x: -30 }} // 끝에는 x가 -30인 값(왼쪽)으로 나감
          transition={{ duration: 0.2 }}
        >
          {tabs.find((v) => isMenu === v.id)?.content || (
            <div>항목을 찾을 수 없습니다.</div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default Tabs;
