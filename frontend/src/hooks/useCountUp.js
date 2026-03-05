import { useEffect, useState } from "react";

export const useCountUp = ({ delay = 0, duration = 1400, reducedMotion = false, target }) => {
  const [value, setValue] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (reducedMotion) {
      setValue(target);
      return undefined;
    }

    let animationFrame;
    let timeoutId;

    const startAnimation = () => {
      const startTime = performance.now();

      const tick = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setValue(target * easedProgress);

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(tick);
        }
      };

      animationFrame = window.requestAnimationFrame(tick);
    };

    setValue(0);
    timeoutId = window.setTimeout(startAnimation, delay);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeoutId);
    };
  }, [delay, duration, reducedMotion, target]);

  return value;
};