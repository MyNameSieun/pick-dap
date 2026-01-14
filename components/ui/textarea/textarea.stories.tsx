import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Common/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gray', 'ghost'],
      description: '입력창의 전체적인 스타일을 결정합니다.',
    },
    textareaSize: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: '입력창의 크기(여백 및 폰트)를 결정합니다.',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// 기본 스타일
export const Default: Story = {
  args: {
    variant: 'default',
    textareaSize: 'default',
    placeholder: '내용을 입력해주세요...',
  },
};

// 예시 데이터
export const InterviewExample: Story = {
  args: {
    variant: 'default',
    textareaSize: 'lg',
    placeholder: `예: 1차는 역량 면접으로 1:1로 진행되었습니다.\n실제 경험을 확인하기 위한 꼬리질문이 많았으며...\n2차는 임원 면접이었고 5:3으로 진행되었습니다.`,
  },
};

// Gray 스타일 (배경색이 있는 경우)
export const Gray: Story = {
  args: {
    variant: 'gray',
    placeholder: '배경색이 있는 회색 스타일입니다.',
  },
};

// Ghost 스타일 (테두리 없는 경우)
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    placeholder: '테두리가 없는 고스트 스타일입니다.',
  },
};

//  에러 상태 (aria-invalid)
export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: '필수 입력 항목이 누락된 경우의 스타일입니다.',
  },
};

//  비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '수정할 수 없는 비활성화 상태입니다.',
  },
};
