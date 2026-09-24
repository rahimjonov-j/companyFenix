import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      
      // Check for clickable elements
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a');
        
      setIsPointer(!!isClickable);

      // Check for specific data attributes for text
      if (target.dataset.cursor) {
        setCursorText(target.dataset.cursor);
      } else if (target.closest('[data-cursor]')) {
        setCursorText((target.closest('[data-cursor]') as HTMLElement).dataset.cursor || '');
      } else {
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      animate={{
        x: position.x - (cursorText ? 32 : 8),
        y: position.y - (cursorText ? 32 : 8),
        width: cursorText ? 64 : (isPointer ? 24 : 16),
        height: cursorText ? 64 : (isPointer ? 24 : 16),
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      <div 
        className={`w-full h-full rounded-full border border-white flex items-center justify-center
        ${cursorText ? 'bg-white text-black' : 'bg-transparent'}`}
      >
        {cursorText && (
          <span className="text-[10px] font-semibold tracking-wider mix-blend-normal">
            {cursorText}
          </span>
        )}
      </div>
    </motion.div>
  );
};
