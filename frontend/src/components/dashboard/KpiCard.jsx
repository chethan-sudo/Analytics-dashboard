import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";
import { formatCompactCurrency, formatFullCurrency, formatInteger, formatPercentValue } from "../../utils/formatters";
import { SparklineChart } from "./SparklineChart";

const formatDisplayValue = (displayType, value) => {
  if (displayType === "currency-compact") {
    return formatCompactCurrency(value);
  }

  if (displayType === "currency") {
    return formatFullCurrency(value);
  }

  if (displayType === "percent") {
    return formatPercentValue(value, 1);
  }

  return formatInteger(value);
};

export const KpiCard = ({ card, delay, icon: Icon, reducedMotion, variant = "default" }) => {
  const animatedValue = useCountUp({ delay, duration: 1500, reducedMotion, target: card.value });
  const isPositive = card.trend.startsWith("+");

  return (
    <article
      className={`kpi-card ${variant === "support" ? "kpi-card--support" : ""} staggered`.trim()}
      data-testid={`kpi-card-${card.id}`}
      style={{ "--accent": card.accent, "--stagger-delay": `${delay}ms` }}
    >
      <span aria-hidden="true" className="kpi-card__accent" />

      <div className="kpi-card__top">
        <div>
          <p className="kpi-card__label" data-testid={`kpi-card-${card.id}-label`}>
            {card.label}
          </p>
          <h3 className="kpi-card__value" data-testid={`kpi-card-${card.id}-value`}>
            {formatDisplayValue(card.displayType, animatedValue)}
          </h3>
        </div>

        <div className="kpi-card__icon" data-testid={`kpi-card-${card.id}-icon`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="kpi-card__support">
        <div className={`kpi-card__trend ${isPositive ? "kpi-card__trend--positive" : "kpi-card__trend--negative"}`.trim()}>
          {isPositive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
          <span className="kpi-card__trend-value" data-testid={`kpi-card-${card.id}-trend`}>
            {card.trend}
          </span>
          <span className="kpi-card__comparison">{card.comparison}</span>
        </div>

        <div className="kpi-card__meta" data-testid={`kpi-card-${card.id}-meta`}>
          <span className="kpi-card__meta-label">{card.metaLabel}</span>
          <span className="kpi-card__meta-value">{card.metaValue}</span>
        </div>
      </div>

      <div className="kpi-card__footer">
        <div className="kpi-card__sparkline-shell">
          <span className="kpi-card__sparkline-label">12-month pulse</span>
        </div>
        <div className="kpi-card__sparkline" data-testid={`kpi-card-${card.id}-sparkline`}>
          <SparklineChart color={card.accent} id={card.id} reducedMotion={reducedMotion} values={card.sparkline} />
        </div>
      </div>
    </article>
  );
};