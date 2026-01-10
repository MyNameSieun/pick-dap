import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Crown, MessageSquare, PlusCircle } from 'lucide-react';
import EmptyStateBox from './EmptyStateBox';

const meta: Meta<typeof EmptyStateBox> = {
  title: 'Components/Common/EmptyStateBox',
  component: EmptyStateBox,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    Icon: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof EmptyStateBox>;

export const Default: Story = {
  args: {
    title: '제목을 입력하세요',
    description: '설명을 적어주세요',
    buttonName: '버튼 이름',
  },
};

export const CustomNavigation: Story = {
  args: {
    Icon: PlusCircle,
    title: '새로운 면접 연습 시작',
    description: '원하는 직무를 선택하고 AI 면접관과 연습을 시작해보세요.',
    buttonName: '연습 시작하기',
    onClick: () => {
      alert('면접 연습 페이지로 이동합니다!');
    },
  },
};

export const NoAnswer: Story = {
  args: {
    Icon: Crown,
    title: '아직 답변이 없습니다',
    description: '첫 번째로 답변을 작성하고 지식을 공유해보세요!',
    buttonName: '답변 작성하기',
    onClick: () => {
      console.log('답변 작성 폼 오픈');
    },
  },
};

export const NoMessages: Story = {
  args: {
    Icon: MessageSquare,
    title: '나눈 대화가 없습니다',
    description: '멘토에게 궁금한 점을 질문해보세요.',
    buttonName: '질문 보내기',
  },
};
