import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Use motion values to bypass React render cycle for mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
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

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  const size = cursorText ? 64 : (isPointer ? 24 : 16);
  const offset = size / 2;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
      }}
      animate={{
        width: size,
        height: size,
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <div 
        className={`w-full h-full rounded-full border border-white flex items-center justify-center transition-colors duration-300
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
