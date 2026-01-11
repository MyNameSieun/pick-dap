import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import InterviewButton from './InterviewButton';
import { MessageCircle, Settings, User, Search } from 'lucide-react';

const meta: Meta<typeof InterviewButton> = {
  title: 'Components/Common/InterviewButton',
  component: InterviewButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    Icon: {
      control: { type: 'select' },
      options: ['Search', 'MessageCircle', 'User', 'Settings'],
      mapping: { Search, MessageCircle, User, Settings },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InterviewButton>;

export const Default: Story = {
  args: {
    children: '신입 개발자 면접',
    Icon: Search,
  },
};

export const WithMessageIcon: Story = {
  args: {
    children: '채팅 상담하기',
    Icon: MessageCircle,
  },
};

export const LongText: Story = {
  args: {
    children: '내일배움캠프 프론트엔드 면접 질문 모음집',
    Icon: User,
  },
};
