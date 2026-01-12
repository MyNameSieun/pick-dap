import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    menu: {
      control: 'object',
      description: '탭 메뉴 이름들을 담은 배열입니다.',
    },
    className: {
      control: 'text',
      description: 'TailwindCSS 클래스를 추가할 수 있습니다.',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-bg-light min-h-[200px] p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    menu: ['이재건', '박시은', '파이팅'],
  },
};

export const LongNameMenu: Story = {
  args: {
    menu: ['감사합니다', '아리가또고자이마스', '땡큐베리마취', '시에시에'],
    className: 'max-w-xl',
  },
};

export const NarrowWidth: Story = {
  args: {
    menu: ['Tab 1', 'Tab 2'],
    className: 'max-w-xs border border-gray-100 p-2 rounded-lg shadow-sm',
  },
};
