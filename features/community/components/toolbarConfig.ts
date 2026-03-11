import { icons } from 'lucide-react';
import { Editor } from '@tiptap/react';
import '@tiptap/extension-highlight';
import '@tiptap/extension-image';
import '@tiptap/extension-link';
import '@tiptap/extension-text-align';

export type EditorActiveState = {
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isBold: boolean;
  isItalic: boolean;
  isStrike: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isBlockquote: boolean;
  isCodeBlock: boolean;
  isHighlight: boolean;
  isAlignLeft: boolean;
  isAlignCenter: boolean;
  isAlignRight: boolean;
};

type ActiveStateKey = keyof EditorActiveState;

export type ToolbarConfig = {
  icon: keyof typeof icons;
  action: (editor: Editor) => void;
  stateKey?: ActiveStateKey;
  text: string;
};

/**
 * Heading 옵션
 */
export const headingOptions: ToolbarConfig[] = [
  {
    icon: 'Heading1',
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    stateKey: 'isHeading1',
    text: '제목1',
  },
  {
    icon: 'Heading2',
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    stateKey: 'isHeading2',
    text: '제목2',
  },
  {
    icon: 'Heading3',
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    stateKey: 'isHeading3',
    text: '제목3',
  },
];

/**
 * 텍스트 마크업 옵션
 */
export const markOptions: ToolbarConfig[] = [
  {
    icon: 'Bold',
    action: (editor) => editor.chain().focus().toggleBold().run(),
    stateKey: 'isBold',
    text: '굵게',
  },
  {
    icon: 'Italic',
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    stateKey: 'isItalic',
    text: '기울임',
  },
  {
    icon: 'Strikethrough',
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    stateKey: 'isStrike',
    text: '취소선',
  },
  {
    icon: 'Highlighter',
    action: (editor: Editor) => editor.chain().focus().toggleHighlight().run(),
    stateKey: 'isHighlight',
    text: '하이라이트',
  },
];

/**
 * 리스트 옵션
 */
export const listOptions: ToolbarConfig[] = [
  {
    icon: 'List',
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    stateKey: 'isBulletList',
    text: '글머리 목록',
  },
  {
    icon: 'ListOrdered',
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    stateKey: 'isOrderedList',
    text: '번호 목록',
  },
];

/**
 * 블록 관련 옵션
 */
export const blockOptions: ToolbarConfig[] = [
  {
    icon: 'Quote',
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    stateKey: 'isBlockquote',
    text: '인용문',
  },
  {
    icon: 'SquareCode',
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    stateKey: 'isCodeBlock',
    text: '코드 블록',
  },
  {
    icon: 'Minus',
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    text: '구분선',
  },
];

/**
 * 정렬 관련 옵션
 */
export const alignOptions: ToolbarConfig[] = [
  {
    icon: 'TextAlignStart',
    action: (editor) => editor.chain().focus().setTextAlign('left').run(),
    stateKey: 'isAlignLeft',
    text: '왼쪽 정렬',
  },
  {
    icon: 'TextAlignJustify',
    action: (editor) => editor.chain().focus().setTextAlign('center').run(),
    stateKey: 'isAlignCenter',
    text: '가운데 정렬',
  },
  {
    icon: 'TextAlignEnd',
    action: (editor) => editor.chain().focus().setTextAlign('right').run(),
    stateKey: 'isAlignRight',
    text: '오른쪽 정렬',
  },
];
// 필요한 옵션 추가
