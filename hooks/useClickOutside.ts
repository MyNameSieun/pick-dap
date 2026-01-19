import { useEffect, RefObject, useCallback, useState, useRef } from 'react';

/**
 * 특정 요소 외부를 클릭했을 때 실행할 콜백 함수를 등록하는 훅
 * @param ref 외부 클릭을 감지할 타겟 요소의 ref
 * @param callback 외부 클릭 시 실행할 함수
 */

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]);
};

export const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const containerRef = useRef<HTMLDivElement>(null);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // 외부 클릭 시 자동으로 닫히는 기능 연결
  useClickOutside(containerRef, onClose);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    containerRef,
  };
};
