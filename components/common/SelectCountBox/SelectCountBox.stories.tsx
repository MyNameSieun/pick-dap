import type { Meta, StoryObj } from '@storybook/react';
import SelectCountBox from './SelectCountBox';

const meta: Meta<typeof SelectCountBox> = {
  title: 'Components/Common/SelectCountBox',
  component: SelectCountBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    count: {
      control: { type: 'number', min: 0 },
    },
    red: {
      control: 'boolean',
      description: '삭제(빨간) 스타일 적용 여부',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectCountBox>;

export const Default: Story = {
  args: {
    count: 3,
    name: '질문',
    buttonName: '선택한 질문 저장',
  },
};

export const RedVariant: Story = {
  args: {
    count: 5,
    name: '면접',
    buttonName: '선택한 면접 삭제',
    red: true,
  },
};

export const Empty: Story = {
  args: {
    count: 0,
    name: '항목',
    buttonName: '저장하기',
  },
};

export const LargeCount: Story = {
  args: {
    count: 999,
    name: '질문',
    buttonName: '일괄 저장하기',
  },
};
