'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  label: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

const BackButton = ({ label, path, onClick }: BackButtonProps) => {
  const router = useRouter();

  const handleAction = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (path) {
      router.push(path);
      return;
    }

    router.back();
  };

  return (
    <div className="text-icon-default mb-7">
      <div
        className="inline-flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-70"
        onClick={handleAction}
      >
        <ChevronLeft /> {label}
      </div>
    </div>
  );
};

export default BackButton;
