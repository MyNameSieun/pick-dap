'use client';

import Fallback from '@/components/common/Fallback';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex flex-col gap-2">
      <Fallback />
      <Button onClick={() => reset()}>다시시도</Button>
    </div>
  );
}
