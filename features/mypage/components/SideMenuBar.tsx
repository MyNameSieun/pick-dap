"use client";

import { Bookmark, Bot, FolderOpen, Settings, Users } from "lucide-react";

const SideMenuBar = () => {
  return (
    <>
      <aside className="flex h-fit w-38.5 flex-col">
        <div className="ditems-center flex h-8 w-full justify-between border-b border-b-gray-300 pb-2">
          <p className="text-button-sm font-bold text-gray-800">마이페이지</p>
          <Settings className="text-icon-default" height={20} width={20} />
        </div>
        <div className="flex h-fit w-full flex-col gap-2 py-4">
          <div className="flex h-7 w-full items-center gap-5 rounded-sm px-2.5 py-1.5 hover:bg-gray-100">
            <Bookmark className="text-icon-default" width={20} height={20} />
            <p className="text-button-sm text-gray-800">저장된 질문</p>
          </div>
          <div className="flex h-7 w-full items-center gap-5 rounded-sm px-2.5 py-1.5 hover:bg-gray-100">
            <Bot className="text-icon-default" width={20} height={20} />
            <p className="text-button-sm text-gray-800">픽봇 AI 면접</p>
          </div>
          <div className="flex h-7 w-full items-center gap-5 rounded-sm px-2.5 py-1.5 hover:bg-gray-100">
            <Users className="text-icon-default" width={20} height={20} />
            <p className="text-button-sm text-gray-800">커뮤니티</p>
          </div>
          <div className="flex h-7 w-full items-center gap-5 rounded-sm px-2.5 py-1.5 hover:bg-gray-100">
            <FolderOpen className="text-icon-default" width={20} height={20} />
            <p className="text-button-sm text-gray-800">프로젝트</p>
          </div>
        </div>
      </aside>
    </>
  );
};
export default SideMenuBar;
