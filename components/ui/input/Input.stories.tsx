import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input'; // 컴포넌트 경로에 맞게 수정하세요.
import { Eye, Lock, Mail, Search, User } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'Components/Common/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gray', 'ghost'],
      description: '입력창의 옵션',
    },
    Icon: {
      control: 'select',
      options: ['None', 'Search', 'Mail', 'Lock', 'User', 'Eye'],
      mapping: {
        None: undefined,
        Search: Search,
        Mail: Mail,
        Lock: Lock,
        User: User,
        Eye: Eye,
      },
      description: '우측에 표시될 아이콘',
    },
    inputSize: {
      control: 'radio',
      options: ['default', 'sm', 'lg'],
      description: '입력창의 크기',
    },
    disabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'file'],
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 1. 기본 인풋
export const Default: Story = {
  args: {
    variant: 'default',
    inputSize: 'default',
    placeholder: '내용을 입력해주세요',
  },
};

// 2. 모든 변형(Variants) 한눈에 보기
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex w-[400px] flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-gray-500">Default</span>
        <Input {...args} variant="default" placeholder="Default variant" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-gray-500">Gray</span>
        <Input {...args} variant="gray" placeholder="Gray variant" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-gray-500">Ghost</span>
        <Input {...args} variant="ghost" placeholder="Ghost variant" />
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    className: 'w-100',
    Icon: Search,
    placeholder: '검색어를 입력하세요',
  },
};

// 3. 모든 크기(Sizes) 한눈에 보기
export const AllSizes: Story = {
  render: (args) => (
    <div className="flex w-[400px] flex-col gap-4">
      <Input {...args} inputSize="sm" placeholder="Small size (h-10)" />
      <Input {...args} inputSize="default" placeholder="Default size (h-12)" />
      <Input {...args} inputSize="lg" placeholder="Large size (h-16)" />
    </div>
  ),
};

// 4. 에러 상태 (aria-invalid)
export const Invalid: Story = {
  args: {
    className: 'w-100',
    'aria-invalid': true,
    placeholder: '잘못된 입력입니다',
    defaultValue: '에러 발생 데이터',
  },
};

// 5. 비활성화 상태
export const Disabled: Story = {
  args: {
    className: 'w-100',
    disabled: true,
    placeholder: '입력할 수 없습니다',
  },
};

// 6. 파일 업로드 타입
export const FileInput: Story = {
  args: {
    className: 'w-100',
    type: 'file',
  },
};
