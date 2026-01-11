export type LineSpacing = 4 | 6 | 8 | 12;

export const LINE_MY_CLASS: Record<LineSpacing, string> = {
  4: 'my-4',
  6: 'my-6',
  8: 'my-8',
  12: 'my-12',
};

interface LineProps {
  borderColor?: string;
  my?: LineSpacing;
}

const Line = ({ borderColor = 'border-gray-100', my = 8 }: LineProps) => {
  return <div className={`${LINE_MY_CLASS[my]} border-t ${borderColor}`} />;
};

export default Line;
