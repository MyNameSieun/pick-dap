'use client';

import { Star } from 'lucide-react';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';

const StarRate = ({ count }: { count: number }) => {
  return (
    <Rate
      value={count}
      character={<Star size={15} fill="currentColor" />}
      onChange={(v) => console.log(v)}
      disabled
    />
  );
};

export default StarRate;
