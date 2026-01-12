import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SelectCountBox from './SelectCountBox';

const meta: Meta<typeof SelectCountBox> = {
  title: 'Components/Common/SelectCountBox',
  component: SelectCountBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'radio',
      options: ['save', 'delete'],
      description: 'UI 상태를 결정합니다 (저장/삭제)',
    },
    count: {
      control: { type: 'number', min: 0 },
      description: '선택된 항목의 개수',
    },
    name: {
      control: 'text',
      description: '항목의 이름 (예: 질문, 면접 등)',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 실행되는 함수',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectCountBox>;

export const SaveState: Story = {
  args: {
    state: 'save',
    count: 3,
    name: '질문',
  },
};

export const DeleteState: Story = {
  args: {
    state: 'delete',
    count: 5,
    name: '면접',
  },
};

export const Empty: Story = {
  args: {
    state: 'save',
    count: 0,
    name: '항목',
  },
};

export const LargeCount: Story = {
  args: {
    state: 'save',
    count: 999,
    name: '데이터',
  },
};
