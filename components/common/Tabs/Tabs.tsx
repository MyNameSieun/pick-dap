'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { twMerge } from 'tailwind-merge';

const Tabs = ({ menu, className }: { menu: string[]; className?: string }) => {
  const [isMenu, setMenu] = useState(menu[0]);

  return (
    <div className={twMerge('w-full', className)}>
      <div className="relative flex border-b border-gray-300">
        {menu.map((v) => (
          <button
            key={v}
            onClick={() => setMenu(v)}
            className={cn(
              'b1 relative cursor-pointer px-6 py-3 text-black transition-colors outline-none',
              isMenu === v ? 'font-bold' : 'font-normal',
            )}
          >
            {v}

            {isMenu === v && (
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
      <div className="my-4 overflow-hidden">
        <motion.div
          key={isMenu}
          initial={{ opacity: 0, x: 30 }} // 처음에는 x가 30인 값(오른쪽)에서
          animate={{ opacity: 1, x: 0 }} // x가 0인 값으로 이동
          exit={{ opacity: 0, x: -30 }} // 끝에는 x가 -30인 값(왼쪽)으로 나감
          transition={{ duration: 0.2 }}
        >
          {menu.map(
            //아래 div에다가 메뉴를 클릭할 때 나타낼 컨텐츠를 넣으면 됨
            (v) => isMenu === v && <div key={v}>{v} 콘텐츠가 나타남.</div>,
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default Tabs;
