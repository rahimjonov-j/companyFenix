import { ReactNode, useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';

interface SmoothScrollProps {
  children: ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable Lenis on touch/mobile devices for native scroll performance
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
  }, []);

  // On touch devices use native scroll — much faster on low-end phones
  if (isTouch) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
