import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import InfoText1 from './InfoText1';
import InfoText2 from './InfoText2';
import InfoAuthor from './InfoAuthor';

interface AllVariantsProps {
  image: string;
  author: string;
  createdAt: string;
  bookmarkCount: number;
  likeCount: number;
  viewCount: number;
  commentCount: number;
}

const meta: Meta<AllVariantsProps> = {
  title: 'Components/Common/Info',
  component: InfoText1,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const defaultArgs: AllVariantsProps = {
  image: '/profile.jpg',
  author: 'j_gun2',
  createdAt: '2026.01.02',
  bookmarkCount: 36,
  likeCount: 123,
  viewCount: 45,
  commentCount: 12,
};

export const Text1: StoryObj<typeof InfoText1> = {
  args: {
    image: defaultArgs.image,
    author: defaultArgs.author,
    createdAt: defaultArgs.createdAt,
    bookmarkCount: defaultArgs.bookmarkCount,
    likeCount: defaultArgs.likeCount,
    commentCount: defaultArgs.commentCount,
  },
};

export const Text2: StoryObj<typeof InfoText2> = {
  args: {
    viewCount: defaultArgs.viewCount,
    bookmarkCount: defaultArgs.bookmarkCount,
    commentCount: defaultArgs.commentCount,
    likeCount: defaultArgs.likeCount,
  },
  render: (args) => (
    <InfoText2
      viewCount={args.viewCount}
      bookmarkCount={args.bookmarkCount}
      commentCount={args.commentCount}
      likeCount={args.likeCount}
    />
  ),
};

export const Author: StoryObj<typeof InfoAuthor> = {
  args: {
    image: defaultArgs.image,
    author: defaultArgs.author,
    createdAt: defaultArgs.createdAt,
  },
  render: (args) => (
    <InfoAuthor
      image={args.image}
      author={args.author}
      createdAt={args.createdAt}
    />
  ),
};

export const AllVariants: StoryObj<AllVariantsProps> = {
  args: defaultArgs,
  render: (args) => (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="mb-4 font-mono text-xs text-gray-400 italic">
          # Variant: InfoText1
        </h3>
        <InfoText1
          image={args.image}
          author={args.author}
          createdAt={args.createdAt}
          bookmarkCount={args.bookmarkCount}
          likeCount={args.likeCount}
          commentCount={args.commentCount}
        />
      </div>
      <div>
        <h3 className="mb-4 font-mono text-xs text-gray-400 italic">
          # Variant: InfoText2
        </h3>
        <InfoText2
          viewCount={args.viewCount}
          bookmarkCount={args.bookmarkCount}
          commentCount={args.commentCount}
          likeCount={args.likeCount}
        />
      </div>
      <div>
        <h3 className="mb-4 font-mono text-xs text-gray-400 italic">
          # Variant: InfoAuthor
        </h3>
        <InfoAuthor
          image={args.image}
          author={args.author}
          createdAt={args.createdAt}
        />
      </div>
    </div>
  ),
};
