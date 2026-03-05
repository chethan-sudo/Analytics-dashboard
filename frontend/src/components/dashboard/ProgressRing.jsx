import { useCountUp } from "../../hooks/useCountUp";
import { formatPercentValue } from "../../utils/formatters";

export const ProgressRing = ({ color, label, reducedMotion, size = 92, themePalette, value }) => {
  const animatedValue = useCountUp({ delay: 180, duration: 1600, reducedMotion, target: value });
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (animatedValue / 100) * circumference;

  return (
    <div className="progress-ring" data-testid="overall-win-rate-progress-ring">
      <svg className="progress-ring__svg" height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
        <circle
          className="progress-ring__track"
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke={themePalette.track}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-ring__value"
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </svg>

      <div className="progress-ring__content">
        <span className="progress-ring__percentage" data-testid="overall-win-rate-progress-value">
          {formatPercentValue(animatedValue, 1)}
        </span>
        <span className="progress-ring__label" data-testid="overall-win-rate-progress-label">
          {label}
        </span>
      </div>
    </div>
  );
};