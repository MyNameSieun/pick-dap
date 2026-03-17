'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { Search, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { jobCategories } from '@/constants/jobCategories';
import { useTechStackData } from '@/hooks/useTechStackData';
import Spinner from '@/components/ui/Spinner';
import { GenerateQuestionsRequest } from '../../hooks/fetchGenerateQuestions';

interface AiPrevSectionProps {
  onGenerate: (options: GenerateQuestionsRequest) => void;
  isPending: boolean;
}

const AiPrevSection = ({ onGenerate, isPending }: AiPrevSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState('FrontEnd');
  const { data: techStack = [] } = useTechStackData();

  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [techSearchInput, setTechSearchInput] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const [topicInput, setTopicInput] = useState('');
  const [selectedCustomTopic, setSelectedCustomTopic] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTechStackOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTechs = techStack.filter((tech) =>
    tech.slug.toLowerCase().includes(techSearchInput.toLowerCase()),
  );

  const toggleTech = (slug: string) => {
    setSelectedTechs((prev) =>
      prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug],
    );
    setTechSearchInput('');
  };

  const handleTopicKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTopic = topicInput.trim();

      if (newTopic && !selectedCustomTopic.includes(newTopic)) {
        setSelectedCustomTopic((prev) => [...prev, newTopic]);
      }
      setTopicInput('');
    }
  };

  const removeCustomTopic = (topicToRemove: string) => {
    setSelectedCustomTopic((prev) => prev.filter((t) => t !== topicToRemove));
  };

  const handleSubmit = () => {
    onGenerate({
      category: selectedCategory,
      skills: selectedTechs.length > 0 ? selectedTechs.join(', ') : undefined,
      topic:
        selectedCustomTopic.length > 0
          ? selectedCustomTopic.join(', ')
          : undefined,
    });
  };

  return (
    <div className={twMerge('container-col', 'w-2/5 gap-8 p-8')}>
      <h5 className="h5 text-black">질문 생성 옵션</h5>

      {/* 카테고리 */}
      <article className="flex flex-col gap-3">
        <p className="b2 text-gray-1000">
          카테고리 <span className="text-point-star">*</span>
        </p>
        <div className="c1 grid grid-cols-2 gap-2.5">
          {jobCategories.map((v, i) => (
            <Button
              key={i}
              onClick={() => setSelectedCategory(v)}
              variant="white"
              className={cn(
                'h-12 transition-colors',
                selectedCategory === v
                  ? 'bg-highlight-light border-highlight-deep hover:bg-main-100 text-highlight-deep hover:text-main-400'
                  : 'bg-bg-light border-gray-500 text-gray-600 hover:bg-gray-100/80 hover:text-gray-700',
              )}
            >
              {v}
            </Button>
          ))}
        </div>
      </article>

      {/* 보유 기술 */}
      <article className="relative flex flex-col gap-3" ref={dropdownRef}>
        <p className="b2 text-gray-1000">보유 기술</p>
        <div className="relative">
          <Input
            className="c1 text-gray-1000 focus:ring-main-500 cursor-text pr-10 pl-10"
            type="text"
            placeholder="기술 스택을 선택해주세요"
            value={techSearchInput}
            onChange={(e) => {
              setTechSearchInput(e.target.value);
              setIsTechStackOpen(true);
            }}
            onFocus={() => setIsTechStackOpen(true)}
          />
          <Search className="text-icon-default absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <ChevronDown
            className={cn(
              'text-icon-default absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer transition-transform',
              isTechStackOpen ? 'rotate-180' : '',
            )}
            onClick={() => setIsTechStackOpen(!isTechStackOpen)}
          />
        </div>
        {selectedTechs.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {selectedTechs.map((tech) => (
              <span
                key={tech}
                className="bg-main-100 text-main-500 border-main-200 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold shadow-sm transition-transform hover:scale-105"
              >
                {tech}
                <X
                  className="hover:text-main-600 h-3 w-3 cursor-pointer transition-colors"
                  onClick={() => toggleTech(tech)}
                />
              </span>
            ))}
          </div>
        )}
        {isTechStackOpen && (
          <div className="custom-scrollbar absolute top-[80px] left-0 z-20 max-h-56 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
            {filteredTechs.length > 0 ? (
              filteredTechs.map((tech) => {
                const isSelected = selectedTechs.includes(tech.slug);
                return (
                  <div
                    key={tech.slug}
                    onClick={() => toggleTech(tech.slug)}
                    className={cn(
                      'c1 flex cursor-pointer items-center justify-between px-4 py-3 transition-colors',
                      isSelected
                        ? 'bg-main-50 text-main-600 font-bold'
                        : 'text-gray-800 hover:bg-gray-50',
                    )}
                  >
                    <span>{tech.slug}</span>
                    {isSelected && (
                      <span className="bg-main-100 text-main-500 rounded-full px-2 py-0.5 text-[10px]">
                        선택됨
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                검색된 기술 스택이 없습니다.
              </div>
            )}
          </div>
        )}
      </article>

      {/* 커스텀 주제 */}
      <article className="flex flex-col gap-3">
        <p className="b2 text-gray-1000">커스텀 주제</p>
        <Input
          className="c1 text-gray-1000 focus:ring-main-500"
          type="text"
          placeholder="예: React Hooks, Spring boot"
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
          onKeyDown={handleTopicKeyDown}
        />

        {selectedCustomTopic.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {selectedCustomTopic.map((topic) => (
              <span
                key={topic}
                className="flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-600 shadow-sm transition-transform hover:scale-105"
              >
                {topic}
                <X
                  className="h-3 w-3 cursor-pointer transition-colors hover:text-purple-800"
                  onClick={() => removeCustomTopic(topic)}
                />
              </span>
            ))}
          </div>
        )}
      </article>

      {/* 제출 */}
      <Button
        size="lg"
        className={cn(
          'mt-2 h-14 font-bold shadow-md transition-all',
          isPending
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-main-400 hover:bg-main-600',
        )}
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-3">
            <Spinner size="sm" className="text-gray-500" />
            <span className="b2 font-medium text-gray-700">
              AI가 질문을 생성하는 중...
            </span>
          </div>
        ) : (
          <span className="b1 font-bold">⚡ AI 맞춤 면접 질문 생성하기</span>
        )}
      </Button>
    </div>
  );
};

export default AiPrevSection;
