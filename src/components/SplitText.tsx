import { useRef, useEffect, useState, type CSSProperties, type ElementType } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words';
  textAlign?: CSSProperties['textAlign'];
  tag?: ElementType;
  startDelay?: number;
}

export default function SplitText({
  text,
  className = '',
  delay = 30,
  duration = 600,
  splitType = 'words',
  textAlign = 'left',
  tag: Tag = 'p',
  startDelay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const parts =
    splitType === 'chars'
      ? text.split('').map((ch, i) => ({ text: ch, key: i }))
      : text.split(/(\s+)/).map((word, i) => ({ text: word, key: i }));

  let charIndex = 0;

  const wrapperStyle: CSSProperties = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  };

  const children = parts.map((part) => {
    if (/^\s+$/.test(part.text)) {
      charIndex++;
      return <span key={part.key}>&nbsp;</span>;
    }

    const currentIndex = charIndex;
    charIndex++;

    return (
      <span
        key={part.key}
        style={{
          display: 'inline-block',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${startDelay + currentIndex * delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${startDelay + currentIndex * delay}ms`,
          willChange: 'opacity, transform',
        }}
      >
        {part.text}
      </span>
    );
  });

  return (
    <Tag ref={ref} className={className} style={wrapperStyle}>
      {children}
    </Tag>
  );
}
