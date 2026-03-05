import { useId, useMemo } from "react";

const buildLinePath = (values) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 34 - ((value - min) / range) * 24;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
};

export const SparklineChart = ({ color, id, reducedMotion, values }) => {
  const rawId = useId();
  const gradientId = useMemo(() => `spark-${id}-${rawId.replace(/:/g, "")}`, [id, rawId]);
  const linePath = useMemo(() => buildLinePath(values), [values]);
  const areaPath = `${linePath} L 100 40 L 0 40 Z`;

  return (
    <svg className={`sparkline-chart ${reducedMotion ? "sparkline-chart--still" : ""}`.trim()} data-testid={`sparkline-measure-${id}`} preserveAspectRatio="none" viewBox="0 0 100 40">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <path className="sparkline-chart__area" d={areaPath} fill={`url(#${gradientId})`} />
      <path className="sparkline-chart__line" d={linePath} fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
};