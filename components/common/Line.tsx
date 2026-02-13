export const LINE_BORDER_COLOR = {
  gray100: 'border-gray-100',
  gray200: 'border-gray-200',
  gray300: 'border-gray-300',
  gray400: 'border-gray-400',
  gray500: 'border-gray-500',
  gray600: 'border-gray-600',
} as const;

export const LINE_SPACE = {
  1: 'my-1',
  4: 'my-4',
  6: 'my-6',
  8: 'my-8',
  12: 'my-12',
} as const;

export type BorderColorKey = keyof typeof LINE_BORDER_COLOR;
export type LineSpacingKey = keyof typeof LINE_SPACE;

interface LineProps {
  color?: BorderColorKey;
  my?: LineSpacingKey;
  className?: React.ReactNode;
}

const Line = ({ color = 'gray300', my = 8, className }: LineProps) => {
  return (
    <div
      className={`${LINE_SPACE[my]} border-t ${LINE_BORDER_COLOR[color]} ${className}`}
    />
  );
};

export default Line;
