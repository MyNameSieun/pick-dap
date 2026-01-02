// components/common/Button/Button.tsx
export interface ButtonProps {
  /** 버튼의 primary 속성 설정 */
  primary?: boolean;
  /** 버튼의 variant 설정 */
  variant?: "primary" | "secondary" | "outline";
  /** 버튼의 배경색 설정*/
  backgroundColor?: string;
  /** 버튼의 크기 설정 */
  size?: "small" | "medium" | "large";
  /** 버튼의 라벨 설정 */
  label: string;
  /** 버튼의 클릭 이벤트 설정 */
  onClick?: () => void;
}

/** 버튼 컴포넌트 */
export const Button = ({
  primary = false,
  variant,
  size = "medium",
  backgroundColor,
  label,
  onClick,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-block cursor-pointer border-0 rounded-full font-bold leading-none";

  // variant가 있으면 variant 우선, 없으면 primary 사용
  const variantClasses = variant
    ? variant === "primary"
      ? "bg-[#555ab9] text-white"
      : variant === "secondary"
      ? "bg-gray-500 text-white"
      : "border border-blue-500 text-blue-500 bg-transparent"
    : primary
    ? "bg-[#555ab9] text-white"
    : "bg-transparent text-gray-800 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]";

  const sizeClasses = {
    small: "px-4 py-2.5 text-xs",
    medium: "px-5 py-2.5 text-sm",
    large: "px-6 py-3 text-base",
  };

  const className = `${baseClasses} ${variantClasses} ${sizeClasses[size]}`;

  return (
    <button
      type="button"
      className={className}
      style={backgroundColor ? { backgroundColor } : undefined}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
