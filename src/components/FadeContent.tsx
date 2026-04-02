import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from 'react';

interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
}

export default function FadeContent({
  children,
  blur = false,
  duration = 600,
  delay = 0,
  threshold = 0.1,
  className = '',
  style,
}: FadeContentProps) {
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
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: blur ? (isVisible ? 'blur(0px)' : 'blur(10px)') : undefined,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${duration}ms ease-out ${delay}ms, filter ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: 'opacity, filter, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
