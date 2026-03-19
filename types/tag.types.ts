import { TagColor } from '@/constants/Tag.style';

export interface Tag {
  size: 'small' | 'big';
  color?: TagColor;
  children: React.ReactNode;
  className?: string;
  category?: boolean;
}
