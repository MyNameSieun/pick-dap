"use client";

import { Bookmark, Eye, Heart, MessageSquare } from "lucide-react";

const InfoText2 = () => {
  return (
    <>
      <div className="text-icon-default c2 flex h-fit w-fit gap-2">
        <div className="flex items-center gap-0.5">
          <Eye size={12} />
          45
        </div>
        <div className="flex items-center gap-0.5">
          <Bookmark size={12} />
          45
        </div>
        <div className="flex items-center gap-0.5">
          <MessageSquare size={12} />
          45
        </div>
        <div className="flex items-center gap-1">
          <Heart size={12} className="fill-point-heart text-point-heart" />
          123
        </div>
      </div>
    </>
  );
};
export default InfoText2;
