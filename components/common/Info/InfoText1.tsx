"use client";

import { Bookmark, Heart, MessageSquare } from "lucide-react";
import Image from "next/image";

const InfoText1 = () => {
  return (
    <>
      <div className="text-icon-default c1 flex h-fit w-fit gap-3">
        <div className="flex items-center gap-1">
          <div className="relative h-5 w-5 overflow-hidden rounded-full">
            <Image
              className="object-cover"
              alt="작성자 프로필"
              src="/profile.jpg"
              fill
              priority
            />
          </div>
          sieunparko
        </div>
        <div className="flex items-center gap-0.5">
          <Bookmark size={16} />
          45
        </div>
        <div className="flex items-center gap-1">
          <Heart size={16} className="fill-point-heart text-point-heart" />
          123
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare size={16} />
          45
        </div>
      </div>
    </>
  );
};
export default InfoText1;
