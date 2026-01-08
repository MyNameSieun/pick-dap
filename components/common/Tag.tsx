import { TAG_VARIANTS, TagColor } from "@/constants/Tag.style";
import { twMerge } from "tailwind-merge";

const Tag = ({
  size = "small",
  color,
  children,
  className,
}: {
  size: "small" | "big";
  color: TagColor;
  children: string;
  className?: string;
}) => {
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
export default Tag;
