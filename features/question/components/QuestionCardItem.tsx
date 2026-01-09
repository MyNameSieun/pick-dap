import Link from "next/link";
import { Question } from "../types/question.types";
import Tags from "@/components/common/Tags/Tags";
import { Bookmark, Crown, Eye } from "lucide-react";

interface QuestionCardItemProps {
  question: Question;
}

const QuestionCardItem = ({ question }: QuestionCardItemProps) => {
  const { id, title, tags, createdAt, stats } = question;

  return (
    <li>
      <Link href={`question/${id}`}>
        <article className="hover:text-highlight-deep rounded-[6px] border border-gray-300 p-3">
          {tags.map((tag) => (
            <Tags
              className="mr-2"
              key={tag.label}
              color={"blue"}
              size={"small"}
            >
              {tag.label}
            </Tags>
          ))}

          <p className="b2 my-3 line-clamp-2 font-bold transition-colors duration-200 ease-out">
            {title}
          </p>
          <div className="text-icon-default c2 flex justify-between">
            <time>{createdAt}</time>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <Eye size={15} />
                {stats.views}
              </div>

              <div className="flex items-center gap-1">
                <Bookmark size={15} />
                {stats.bookmarks}
              </div>

              <div className="flex items-center gap-1">
                <Crown size={15} />
                {stats.comments}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
};

export default QuestionCardItem;
