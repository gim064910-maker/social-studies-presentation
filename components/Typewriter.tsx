import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  speed = 30, 
  delay = 0, 
  className = "",
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);
  const timerRef = useRef<number | null>(null);
  
  // onComplete 콜백이 변경되어도 useEffect가 재실행되지 않도록 ref에 저장
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // 텍스트가 변경될 때만 초기화
    setDisplayedText('');
    index.current = 0;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    const startTimeout = setTimeout(() => {
      timerRef.current = window.setInterval(() => {
        if (index.current < text.length) {
          // 다음 글자 추가
          const nextChar = text.charAt(index.current);
          setDisplayedText((prev) => prev + nextChar);
          index.current++;
        } else {
          // 타이핑 완료
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          // 부모 상태 업데이트 트리거 (ref 사용으로 리렌더링 시 루프 방지)
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
    // onComplete를 의존성 배열에서 제거하여 부모 리렌더링 시 초기화 방지
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayedText}
      <span className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-1 align-middle cursor-blink" />
    </span>
  );
};

export default Typewriter;