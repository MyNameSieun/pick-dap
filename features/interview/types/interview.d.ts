type MessageTarget = 'me' | 'pickbot';

interface Message {
  id: number;
  target: MessageTarget;
  message: string;
}

type InterviewMessageProps = Omit<Message, 'id'>;
