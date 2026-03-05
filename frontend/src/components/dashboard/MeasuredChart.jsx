import { useLayoutEffect, useRef, useState } from "react";

export const MeasuredChart = ({ className = "", renderChart, testId }) => {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ height: 0, width: 0 });

  useLayoutEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return undefined;
    }

    let frameId = 0;

    const updateSize = () => {
      const nextSize = {
        height: Math.max(0, Math.floor(node.clientHeight)),
        width: Math.max(0, Math.floor(node.clientWidth)),
      };

      setSize((currentSize) =>
        currentSize.width === nextSize.width && currentSize.height === nextSize.height ? currentSize : nextSize,
      );
    };

    frameId = window.requestAnimationFrame(updateSize);

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSize);
      return () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("resize", updateSize);
      };
    }

    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateSize);
    });

    observer.observe(node);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`chart-measure ${className}`.trim()} data-testid={testId} ref={containerRef}>
      {size.width > 24 && size.height > 24 ? renderChart(size) : <div className="chart-skeleton" data-testid={`${testId}-loading`} />}
    </div>
  );
};