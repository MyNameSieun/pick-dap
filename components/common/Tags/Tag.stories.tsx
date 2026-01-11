import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tags from './Tags';
import { TAG_VARIANTS, TagColor } from '@/constants/Tag.style';

const meta: Meta<typeof Tags> = {
  title: 'Components/Common/Tags',
  component: Tags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(TAG_VARIANTS) as TagColor[],
      description: '태그의 색상 변형',
    },
    size: {
      control: 'radio',
      options: ['small', 'big'],
      description: '태그의 크기',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tags>;

export const Small: Story = {
  args: {
    size: 'small',
    color: Object.keys(TAG_VARIANTS)[0] as TagColor,
    children: 'Tag',
  },
};

export const Big: Story = {
  args: {
    size: 'big',
    color: Object.keys(TAG_VARIANTS)[0] as TagColor,
    children: 'Tag',
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {Object.keys(TAG_VARIANTS).map((v) => (
        <Tags {...args} key={v} color={v as TagColor}>
          {v}
        </Tags>
      ))}
    </div>
  ),
};
