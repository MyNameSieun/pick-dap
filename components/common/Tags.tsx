import { TAG_VARIANTS } from "@/constants/Tag.style";
import { Tag } from "@/types/tag.types";
import { twMerge } from "tailwind-merge";

const Tags = ({ size = "small", color, children, className }: Tag) => {
  return (
    <>
      {size === "small" && (
        <span
          className={twMerge(
            "c2 h-fit min-h-5 rounded-3xl px-2 text-center",
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
            "c2 h-fit min-h-6 min-w-16 rounded-3xl px-4 text-center",
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
