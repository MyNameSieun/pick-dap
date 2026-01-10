import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ContentsIndex from './ContentsIndex';

const meta: Meta<typeof ContentsIndex> = {
  title: 'Components/Common/ContentsIndex',
  component: ContentsIndex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedIndex: {
      control: { type: 'number', min: 0, max: 10 },
      description: '현재 활성화된 항목의 인덱스',
    },
    onSelect: { action: 'selected' },
  },
};

export default meta;

type Story = StoryObj<typeof ContentsIndex>;

const ContentsIndexWithState = (args: {
  contents: string[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ContentsIndex
      {...args}
      selectedIndex={currentIndex}
      onSelect={(index) => {
        setCurrentIndex(index);
        args.onSelect?.(index);
      }}
    />
  );
};

export const Interactive: Story = {
  render: (args) => <ContentsIndexWithState {...args} />,
  args: {
    contents: ['기본 정보', '면접 평가', '종합 후기', '심층 분석'],
  },
};
