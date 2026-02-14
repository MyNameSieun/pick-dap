'use client';
import { cx } from 'class-variance-authority';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

interface MoreOptionsMenuProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const MoreOptionsMenu = ({ children, disabled }: MoreOptionsMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cx(
          'flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100',
          isMenuOpen ? 'bg-gray-100' : '',
        )}
      >
        <EllipsisVertical size={20} className="text-gray-900" />
      </button>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* 드롭다운 박스 */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className="animate-in fade-in zoom-in absolute right-0 z-20 mt-2 w-36 origin-top-right rounded-xl border border-gray-100 bg-white p-1.5 text-gray-900 shadow-lg ring-1 ring-black/5 duration-100"
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default MoreOptionsMenu;
