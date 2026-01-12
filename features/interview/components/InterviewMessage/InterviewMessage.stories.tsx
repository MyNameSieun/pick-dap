import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import InterviewMessage from './InterviewMessage';

const meta: Meta<typeof InterviewMessage> = {
  title: 'Components/Interview/InterviewMessage',
  component: InterviewMessage,
  tags: ['autodocs'],
  argTypes: {
    target: {
      control: 'radio',
      options: ['pickbot', 'me'],
      description: '메시지 발신자',
    },
    message: {
      control: 'text',
      description: '메시지 내용',
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-2xl p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InterviewMessage>;

export const Pickbot: Story = {
  args: {
    target: 'pickbot',
    message:
      '안녕하세요! 픽봇입니다.\n\n프로세스와 스레드의 차이점에 대해 설명해주세요.',
  },
};

export const Me: Story = {
  args: {
    target: 'me',
    message:
      '프로세스는 운영체제로부터 자원을 할당받는 작업의 단위이고, 스레드는 프로세스가 할당받은 자원을 이용하는 실행의 단위입니다.',
  },
};

export const LongMessage: Story = {
  args: {
    target: 'pickbot',
    message:
      '답변이 아주 훌륭하시네요!\n추가로 질문을 드려보겠습니다.\n멀티 프로세스 대신 멀티 스레드를 사용하는 상황의 장점과 단점에 대해서도 알고 계신가요? 구체적인 사례를 들어 설명해주시면 더 좋습니다.',
  },
};
