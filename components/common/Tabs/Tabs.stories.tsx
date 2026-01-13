import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tabs from './Tabs';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const mockTabs = [
  {
    id: '1',
    label: '작성 게시글',
    content: (
      <div className="bg-gray-50 p-4">내가 쓴 게시글 목록이 나타납니다.</div>
    ),
  },
  {
    id: '2',
    label: '작성 댓글',
    content: <div className="bg-gray-50 p-4">내가 쓴 댓글 리스트입니다.</div>,
  },
  {
    id: '3',
    label: '좋아요',
    content: <div className="bg-gray-50 p-4">좋아요를 누른 포스트입니다.</div>,
  },
];

export const Interactive: Story = {
  args: {
    tabs: mockTabs,
    setId: '1',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentId, setCurrentId] = useState(args.setId);

    return (
      <Tabs
        {...args}
        setId={currentId}
        onTabChange={(id) => {
          setCurrentId(id as string);
        }}
      />
    );
  },
};

export const FixedTab: Story = {
  args: {
    tabs: mockTabs,
    setId: '2',
  },
};
export const ComplexContent = {
  args: {
    tabs: [
      {
        id: 'all',
        label: '전체보기',
        content: (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-main-100 flex h-20 items-center justify-center rounded"
              >
                카드 {i}
              </div>
            ))}
          </div>
        ),
      },
      {
        id: 'notice',
        label: '공지사항',
        content: (
          <ul className="list-disc pl-5">
            <li>첫 번째 공지</li>
            <li>두 번째 공지</li>
          </ul>
        ),
      },
    ],
  },
};

export const ManyTabs = {
  args: {
    className: 'max-w-[400px]', // 부모 너비 제한
    tabs: [
      { id: 't1', label: '메뉴 1', content: '내용 1' },
      { id: 't2', label: '메뉴 2', content: '내용 2' },
      { id: 't3', label: '메뉴 3', content: '내용 3' },
      { id: 't4', label: '메뉴 4', content: '내용 4' },
      { id: 't5', label: '메뉴 5', content: '내용 5' },
      { id: 't6', label: '메뉴 6', content: '내용 6' },
    ],
  },
};
