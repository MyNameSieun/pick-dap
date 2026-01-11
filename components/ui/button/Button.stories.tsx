import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';
import { Search, ChevronRight, Mail } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'white', 'none', 'ghost', 'link'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon'],
      description: '버튼의 크기',
    },
    asChild: {
      control: 'boolean',
      description: '자식 요소를 렌더링할지 여부',
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. 기본 버튼
export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default',
  },
};

// 2. 변형(Variants) 모음
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args} variant="default" className="w-48">
        Default
      </Button>
      <Button {...args} variant="white" className="w-48">
        White
      </Button>
      <Button {...args} variant="none" className="w-48">
        None
      </Button>
      <Button {...args} variant="ghost" className="w-48">
        Ghost
      </Button>
      <Button {...args} variant="link" className="w-48">
        Link
      </Button>
    </div>
  ),
};

// 3. 크기(Sizes) 모음
export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-end gap-4">
      <Button {...args} size="xs">
        Extra Small (xs)
      </Button>
      <Button {...args} size="sm">
        Small (sm)
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large (lg)
      </Button>
    </div>
  ),
};

// 4. 아이콘 버튼
export const WithIcon: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args}>
        <Mail /> 이메일로 시작하기
      </Button>
      <Button {...args} variant="white">
        검색하기 <Search />
      </Button>
      <Button {...args} size="icon" variant="none">
        <ChevronRight />
      </Button>
    </div>
  ),
};

// 5. 비활성화 상태
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
