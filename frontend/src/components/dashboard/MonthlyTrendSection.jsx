import { useId, useMemo, useState } from "react";
import { Activity } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthlyTrend, sharedPalette } from "../../data/crmData";
import { formatAxisMillions, formatCompactCurrency, formatCompactInteger, formatFullCurrency, formatPercentValue } from "../../utils/formatters";
import { ChartTooltip } from "./ChartTooltip";
import { MeasuredChart } from "./MeasuredChart";
import { SectionCard } from "./SectionCard";

const chartTabs = [
  { id: "revenue", label: "Revenue" },
  { id: "deals", label: "Deal Count" },
  { id: "win-loss", label: "Win vs Loss" },
];

const toSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const ActiveBarShape = (props) => (
  <Rectangle
    {...props}
    height={Math.max(props.height + 6, 0)}
    radius={12}
    width={Math.max(props.width + 4, 0)}
    x={props.x - 2}
    y={props.y - 6}
  />
);

export const MonthlyTrendSection = ({ delay, reducedMotion, theme, themePalette, variant = "default" }) => {
  const [activeTab, setActiveTab] = useState("revenue");
  const rawId = useId();
  const gradientId = useMemo(() => `trend-gradient-${rawId.replace(/:/g, "")}`, [rawId]);
  const revenueTotal = monthlyTrend.reduce((sum, month) => sum + month.revenue, 0);
  const dealsTotal = monthlyTrend.reduce((sum, month) => sum + month.deals, 0);
  const wonTotal = monthlyTrend.reduce((sum, month) => sum + month.won, 0);
  const lostTotal = monthlyTrend.reduce((sum, month) => sum + month.lost, 0);
  const peakRevenueMonth = monthlyTrend.reduce((best, month) => (month.revenue > best.revenue ? month : best), monthlyTrend[0]);
  const peakDealsMonth = monthlyTrend.reduce((best, month) => (month.deals > best.deals ? month : best), monthlyTrend[0]);
  const bestSpreadMonth = monthlyTrend.reduce((best, month) => (month.won - month.lost > best.won - best.lost ? month : best), monthlyTrend[0]);
  const isHero = variant === "hero";
  const chartPanelClassName = isHero ? "chart-panel chart-panel--hero" : "chart-panel chart-panel--large";

  const summaryByTab = {
    revenue: [
      { label: "Year booked", note: "12-month revenue total", value: formatCompactCurrency(revenueTotal) },
      { label: "Peak month", note: formatCompactCurrency(peakRevenueMonth.revenue), value: peakRevenueMonth.month },
      { label: "Avg / month", note: "Boardroom benchmark", value: formatCompactCurrency(revenueTotal / monthlyTrend.length) },
    ],
    deals: [
      { label: "Deals closed", note: "Across FY24", value: formatCompactInteger(dealsTotal) },
      { label: "Peak month", note: `${formatCompactInteger(peakDealsMonth.deals)} deals`, value: peakDealsMonth.month },
      { label: "Avg / month", note: "Steady monthly cadence", value: formatCompactInteger(Math.round(dealsTotal / monthlyTrend.length)) },
    ],
    "win-loss": [
      { label: "Deals won", note: `${formatPercentValue((wonTotal / (wonTotal + lostTotal)) * 100, 1)} overall win`, value: formatCompactInteger(wonTotal) },
      { label: "Deals lost", note: "Losses compress toward year-end", value: formatCompactInteger(lostTotal) },
      { label: "Best spread", note: `${formatCompactInteger(bestSpreadMonth.won)} won vs ${formatCompactInteger(bestSpreadMonth.lost)} lost`, value: bestSpreadMonth.month },
    ],
  };

  const referenceMonth = activeTab === "revenue" ? peakRevenueMonth.month : activeTab === "deals" ? peakDealsMonth.month : bestSpreadMonth.month;

  const renderChart = () => {
    if (activeTab === "revenue") {
      return (
        <MeasuredChart
          className={chartPanelClassName}
          renderChart={({ height, width }) => (
            <AreaChart data={monthlyTrend} height={height} key={`monthly-revenue-${theme}-${variant}`} margin={{ bottom: 8, left: 0, right: 8, top: 12 }} width={width}>
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={sharedPalette.cyan} stopOpacity={isHero ? 0.42 : 0.34} />
                  <stop offset="100%" stopColor={sharedPalette.cyan} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={themePalette.grid} strokeDasharray="2 10" vertical={false} />
              <XAxis axisLine={false} dataKey="month" tick={{ fill: themePalette.muted, fontFamily: "var(--font-mono)", fontSize: 11 }} tickLine={false} />
              <YAxis
                axisLine={false}
                tick={{ fill: themePalette.muted, fontFamily: "var(--font-mono)", fontSize: 11 }}
                tickFormatter={formatAxisMillions}
                tickLine={false}
              />
              {isHero ? <ReferenceLine stroke={themePalette.border} strokeDasharray="4 8" x={referenceMonth} /> : null}
              <Tooltip content={<ChartTooltip themePalette={themePalette} valueFormatter={(value) => formatFullCurrency(value)} />} cursor={{ stroke: themePalette.border, strokeWidth: 1.1, strokeDasharray: "4 6" }} />
              <Area
                activeDot={{ fill: sharedPalette.cyan, r: isHero ? 4.2 : 3.8, stroke: themePalette.text, strokeWidth: 2 }}
                dataKey="revenue"
                fill={`url(#${gradientId})`}
                isAnimationActive={!reducedMotion}
                stroke={sharedPalette.cyan}
                strokeWidth={isHero ? 3 : 2.6}
                type="monotone"
              />
            </AreaChart>
          )}
          testId="monthly-trend-chart-panel"
        />
      );
    }

    if (activeTab === "deals") {
      return (
        <MeasuredChart
          className={chartPanelClassName}
          renderChart={({ height, width }) => (
            <BarChart data={monthlyTrend} height={height} key={`monthly-deals-${theme}-${variant}`} margin={{ bottom: 8, left: 0, right: 8, top: 12 }} width={width}>
              <CartesianGrid stroke={themePalette.grid} strokeDasharray="2 10" vertical={false} />
              <XAxis axisLine={false} dataKey="month" tick={{ fill: themePalette.muted, fontFamily: "var(--font-mono)", fontSize: 11 }} tickLine={false} />
              <YAxis axisLine={false} tick={{ fill: themePalette.muted, fontFamily: "var(--font-mono)", fontSize: 11 }} tickLine={false} />
              {isHero ? <ReferenceLine stroke={themePalette.border} strokeDasharray="4 8" x={referenceMonth} /> : null}
              <Tooltip content={<ChartTooltip themePalette={themePalette} valueFormatter={(value) => `${formatCompactInteger(value)} deals`} />} cursor={false} />
              <Bar activeBar={<ActiveBarShape />} barSize={isHero ? 34 : 30} dataKey="deals" fill={sharedPalette.purple} isAnimationActive={!reducedMotion} radius={[12, 12, 0, 0]} />
            </BarChart>
          )}
          testId="monthly-trend-chart-panel"
        />
      );
    }

    return (
      <MeasuredChart
        className={chartPanelClassName}
        renderChart={({ height, width }) => (
          <BarChart data={monthlyTrend} height={height} key={`monthly-win-loss-${theme}-${variant}`} margin={{ bottom: 8, left: 0, right: 8, top: 12 }} width={width}>
            <CartesianGrid stroke={themePalette.grid} strokeDasharray="2 10" vertical={false} />
            <XAxis axisLine={false} dataKey="month" tick={{ fill: themePalette.muted, fontFamily: "var(--font-mono)", fontSize: 11 }} tickLine={false} />
            <YAxis axisLine={false} tick={{ fill: themePalette.muted, fontFamily: "var(--font-mono)", fontSize: 11 }} tickLine={false} />
            {isHero ? <ReferenceLine stroke={themePalette.border} strokeDasharray="4 8" x={referenceMonth} /> : null}
            <Tooltip content={<ChartTooltip themePalette={themePalette} valueFormatter={(value) => `${formatCompactInteger(value)} deals`} />} cursor={false} />
            <Bar activeBar={<ActiveBarShape />} barSize={isHero ? 34 : 30} dataKey="won" fill={sharedPalette.green} isAnimationActive={!reducedMotion} name="Won" radius={[12, 12, 0, 0]} stackId="outcomes" />
            <Bar activeBar={<ActiveBarShape />} barSize={isHero ? 34 : 30} dataKey="lost" fill={sharedPalette.rose} isAnimationActive={!reducedMotion} name="Lost" radius={[12, 12, 0, 0]} stackId="outcomes" />
          </BarChart>
        )}
        testId="monthly-trend-chart-panel"
      />
    );
  };

  if (isHero) {
    return (
      <article className="hero-trend-card staggered" data-testid="hero-trend-card" style={{ "--stagger-delay": `${delay}ms` }}>
        <div className="hero-trend-card__header">
          <div className="hero-trend-card__copy">
            <p className="hero-trend-card__eyebrow" data-testid="hero-trend-card-eyebrow">
              Revenue pulse
            </p>
            <h2 className="hero-trend-card__title" data-testid="hero-trend-card-title">
              Yearly performance snapshot.
            </h2>
            <p className="hero-trend-card__subtitle" data-testid="hero-trend-card-subtitle">
              Switch between revenue, volume, and outcomes without losing the overall business story.
            </p>

            <div className="hero-trend-card__badge" data-testid="hero-trend-card-badge">
              Peak month · {referenceMonth}
            </div>
          </div>
        </div>

        <div className="hero-trend-card__controls">
          <div className="chart-tabs chart-tabs--hero" data-testid="monthly-trend-tab-group">
            {chartTabs.map((tab) => (
              <button
                className={`chart-tabs__button ${activeTab === tab.id ? "chart-tabs__button--active" : ""}`.trim()}
                data-testid={`monthly-trend-tab-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hero-trend-card__summary" data-testid={`monthly-trend-summary-${activeTab}`}>
          {summaryByTab[activeTab].map((item) => (
            <article className="hero-trend-card__summary-item" data-testid={`monthly-trend-summary-card-${toSlug(item.label)}`} key={`${activeTab}-${item.label}`}>
              <p className="hero-trend-card__summary-label">{item.label}</p>
              <p className="hero-trend-card__summary-value">{item.value}</p>
              <p className="hero-trend-card__summary-note">{item.note}</p>
            </article>
          ))}
        </div>

        {activeTab === "win-loss" ? (
          <div className="chart-legend-mini hero-trend-card__legend" data-testid="monthly-trend-win-loss-legend">
            <span className="chart-legend-mini__item">
              <span className="chart-legend-mini__dot" style={{ background: sharedPalette.green }} />
              Won
            </span>
            <span className="chart-legend-mini__item">
              <span className="chart-legend-mini__dot" style={{ background: sharedPalette.rose }} />
              Lost
            </span>
          </div>
        ) : null}

        {renderChart()}

        <div className="hero-trend-card__footnote" data-testid="hero-trend-card-footnote">
          October marks the cleanest overlap of volume and revenue strength, while December softens after a strong autumn run.
        </div>
      </article>
    );
  }

  return (
    <SectionCard
      action={
        <div className="section-badge" data-testid="monthly-trend-peak-month-badge">
          Peak month · October
        </div>
      }
      delay={delay}
      icon={Activity}
      subtitle="Flip the story between revenue momentum, volume, and closed outcomes over 12 months."
      testId="monthly-trend-section-card"
      title="Monthly trend"
    >
      <div className="chart-tabs" data-testid="monthly-trend-tab-group">
        {chartTabs.map((tab) => (
          <button
            className={`chart-tabs__button ${activeTab === tab.id ? "chart-tabs__button--active" : ""}`.trim()}
            data-testid={`monthly-trend-tab-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="trend-summary-grid" data-testid={`monthly-trend-summary-${activeTab}`}>
        {summaryByTab[activeTab].map((item) => (
          <article className="trend-summary" data-testid={`monthly-trend-summary-card-${toSlug(item.label)}`} key={`${activeTab}-${item.label}`}>
            <p className="trend-summary__label">{item.label}</p>
            <p className="trend-summary__value">{item.value}</p>
            <p className="trend-summary__note">{item.note}</p>
          </article>
        ))}
      </div>

      {activeTab === "win-loss" ? (
        <div className="chart-legend-mini" data-testid="monthly-trend-win-loss-legend">
          <span className="chart-legend-mini__item">
            <span className="chart-legend-mini__dot" style={{ background: sharedPalette.green }} />
            Won
          </span>
          <span className="chart-legend-mini__item">
            <span className="chart-legend-mini__dot" style={{ background: sharedPalette.rose }} />
            Lost
          </span>
        </div>
      ) : null}

      {renderChart()}
    </SectionCard>
  );
};