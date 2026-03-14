'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { twMerge } from 'tailwind-merge';

interface TabsProps {
  tabs: { id: string; label: string; content?: React.ReactNode }[];
  setId?: string;
  className?: string;
  onTabChange?: (id: string) => void;
}

const Tabs = ({ tabs, setId, className, onTabChange }: TabsProps) => {
  const [isMenu, setMenu] = useState(setId || tabs[0].id);
  const [prevId, setPrevId] = useState(setId);

  if (setId !== prevId) {
    setPrevId(setId);
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
      <div className="relative flex items-center border-b border-gray-100 px-2">
        {tabs.map((v) => {
          const isActive = isMenu === v.id;

          return (
            <button
              key={v.id}
              onClick={() => handleTabClick(v.id)}
              className={cn(
                'relative flex cursor-pointer items-center justify-center px-6 py-4 transition-colors duration-200 outline-none',
                isActive
                  ? 'font-bold text-blue-600'
                  : 'font-medium text-gray-700 hover:text-gray-800',
              )}
            >
              <span className="relative z-10 text-[15px] tracking-tight">
                {v.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute right-0 bottom-[-1px] left-0 z-20 h-[3px] rounded-t-full bg-blue-600"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <div className="absolute inset-x-1 inset-y-2 rounded-lg bg-gray-100 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          );
        })}
      </div>

      <div className="relative mt-8 min-h-[200px] w-full px-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={isMenu}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {tabs.find((v) => isMenu === v.id)?.content || (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <p>표시할 내용이 없습니다.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;
