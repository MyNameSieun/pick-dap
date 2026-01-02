//
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

// 1. 스토리북 대시보드에 표시될 그룹 및 설정
const meta = {
  title: "Components/Common/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color", // 색상 피커 UI 사용
      description: "버튼의 배경색",
    },
    size: {
      control: { type: "radio" }, // 라디오 버튼 UI 사용
      options: ["small", "medium", "large"], // 선택지 제한
      description: "버튼의 크기",
    },
    label: {
      control: "text",
      description: "버튼에 들어갈 텍스트",
      table: {
        category: "Content", // 'Content'라는 그룹으로 묶음
      },
    },
    onClick: { action: "clicked" }, // 클릭 시 Actions 패널에 로그 출력
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

// 2. 컴포넌트의 각 '상태(Story)' 정의
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
