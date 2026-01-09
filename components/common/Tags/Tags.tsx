import { TAG_VARIANTS } from "@/constants/Tag.style";
import { Tag } from "@/types/tag.types";
import { twMerge } from "tailwind-merge";

const Tags = ({ size = "small", color, children, className }: Tag) => {
  const baseStyle = "c2 rounded-3xl text-center items-center";
  return (
    <>
      {size === "small" && (
        <span
          className={twMerge(
            baseStyle,
            "h-5 px-3 py-0.5",
            TAG_VARIANTS[color],
            className,
          )}
        >
          {children}
        </span>
      )}
      {size === "big" && (
        <span
          className={twMerge(
            baseStyle,
            "h-6 min-w-16 px-4",
            TAG_VARIANTS[color],
            className,
          )}
        >
          {children}
        </span>
      )}
    </>
  );
};
export default Tags;
