'use client';

const ContentsIndex = ({
  contents,
  selectedIndex = 0,
  onSelect,
}: {
  contents: string[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}) => {
  const defaultContents: string[] = ['기본 정보', '면접 평가', '종합 후기'];

  return (
    <>
      <div className="flex h-fit w-54 flex-col gap-1.5">
        <h6 className="mb-4 text-black">목차</h6>
        {(contents || defaultContents).map((v, i) => {
          const isSelected = selectedIndex === i;

          return (
            <div
              key={i}
              onClick={() => onSelect?.(i)}
              className={`flex h-9 cursor-pointer items-center px-4 transition-colors ${
                isSelected ? 'bg-main-100' : 'bg-none hover:bg-gray-300'
              }`}
            >
              <p
                className={`b2 font-semibold ${isSelected ? 'text-main-400' : 'text-gray-900'}`}
              >
                {i + 1}. {v}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ContentsIndex;
