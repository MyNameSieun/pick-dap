import Link from 'next/link';
import { Github, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* 로고 및 서비스 설명 */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold tracking-tighter text-blue-600">
              Pickdap
            </h2>
            <p className="mt-2 text-sm text-gray-500">설명이 들어갈 예정</p>
          </div>

          {/* 링크 섹션 */}
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-gray-900">Service</h3>
              <Link
                href="/question"
                className="text-gray-500 transition-colors hover:text-blue-500"
              >
                질문 목록
              </Link>
              <Link
                href="/mypage"
                className="text-gray-500 transition-colors hover:text-blue-500"
              >
                마이페이지
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-gray-900">Connect</h3>
              <Link
                href="https://github.com"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900"
              >
                <Github size={16} /> GitHub
              </Link>
              <Link
                href="https://youtube.com"
                className="flex items-center gap-2 text-gray-500 hover:text-red-500"
              >
                <Youtube size={16} /> YouTube
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-50 pt-8 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Pickdap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
