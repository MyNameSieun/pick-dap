import { TagColor } from "@/constants/Tag.style";

export interface Tag {
  size: "small" | "big";
  color: TagColor;
  children: string;
  className?: string;
}
