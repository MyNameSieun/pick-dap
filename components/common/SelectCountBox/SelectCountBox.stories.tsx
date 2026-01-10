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

export const Community: Story = {
  args: {
    count: 1,
    name: '글',
    buttonName: '선택한 글 삭제',
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
