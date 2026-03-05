import { useState } from "react";
import { Layers } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import { sectorWinRates, sharedPalette } from "../../data/crmData";
import { formatCompactCurrency, formatCompactInteger } from "../../utils/formatters";
import { MeasuredChart } from "./MeasuredChart";
import { SectionCard } from "./SectionCard";

export const SectorDonutSection = ({ delay, reducedMotion, theme, themePalette }) => {
  const [activeSector, setActiveSector] = useState(sectorWinRates[0]);

  return (
    <SectionCard
      action={<div className="section-badge" data-testid="sector-quality-badge">Sector quality view</div>}
      delay={delay}
      icon={Layers}
      subtitle="Hover any sector slice or legend item to inspect its exact revenue, deal count, and quality in a separate detail panel."
      testId="sector-donut-section-card"
      title="Win rate by sector"
    >
      <div className="sector-layout sector-layout--refined">
        <div className="sector-layout__visual">
          <div className="sector-donut-shell">
            <MeasuredChart
              className="donut-wrap"
              renderChart={({ height, width }) => {
                const size = Math.min(width, height);
                const outerRadius = size * 0.42;
                const innerRadius = size * 0.29;

                return (
                  <PieChart height={height} key={`sector-donut-${theme}`} width={width}>
                    <Pie
                      data={sectorWinRates}
                      dataKey="winRate"
                      innerRadius={innerRadius}
                      isAnimationActive={!reducedMotion}
                      onMouseEnter={(_, index) => setActiveSector(sectorWinRates[index])}
                      outerRadius={outerRadius}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {sectorWinRates.map((sector) => (
                        <Cell fill={sector.color} key={sector.sector} />
                      ))}
                    </Pie>
                  </PieChart>
                );
              }}
              testId="sector-donut-chart-panel"
            />

            <div className="donut-center" data-testid="sector-donut-center-label">
              <span className="donut-center__value">63.2%</span>
              <span className="donut-center__label">Overall</span>
            </div>
          </div>

          <div className="sector-focus-card" data-testid="sector-focus-card">
            <p className="sector-focus-card__label">Focused sector</p>
            <h3 className="sector-focus-card__title" data-testid="sector-focus-title">
              {activeSector.sector}
            </h3>
            <p className="sector-focus-card__subtitle" data-testid="sector-focus-subtitle">
              {activeSector.winRate}% win rate across {formatCompactInteger(activeSector.deals)} deals and {formatCompactCurrency(activeSector.revenue)} in revenue.
            </p>

            <div className="sector-focus-card__metrics">
              <div className="sector-focus-card__metric" data-testid="sector-focus-win-rate">
                <span className="sector-focus-card__metric-label">Win rate</span>
                <span className="sector-focus-card__metric-value">{activeSector.winRate}%</span>
              </div>
              <div className="sector-focus-card__metric" data-testid="sector-focus-revenue">
                <span className="sector-focus-card__metric-label">Revenue</span>
                <span className="sector-focus-card__metric-value">{formatCompactCurrency(activeSector.revenue)}</span>
              </div>
              <div className="sector-focus-card__metric" data-testid="sector-focus-deals">
                <span className="sector-focus-card__metric-label">Deals</span>
                <span className="sector-focus-card__metric-value">{formatCompactInteger(activeSector.deals)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sector-side-panel" data-testid="sector-side-panel">
          <div className="sector-legend" data-testid="sector-donut-legend">
            {sectorWinRates.map((sector) => {
              const isActive = activeSector.sector === sector.sector;

              return (
                <button
                  className={`sector-legend__item ${isActive ? "sector-legend__item--active" : ""}`.trim()}
                  data-testid={`sector-legend-${sector.sector.toLowerCase()}`}
                  key={sector.sector}
                  onFocus={() => setActiveSector(sector)}
                  onMouseEnter={() => setActiveSector(sector)}
                  type="button"
                >
                  <span className="sector-legend__mini" style={{ "--sector-color": sector.color, "--sector-width": `${sector.winRate}%` }} />

                  <div className="sector-legend__name">
                    <span className="sector-legend__dot" style={{ background: sector.color }} />
                    <span>{sector.sector}</span>
                  </div>
                  <div className="sector-legend__meta">
                    <span className="sector-legend__rate">{sector.winRate}% win</span>
                    <span className="sector-legend__revenue">{formatCompactCurrency(sector.revenue)}</span>
                    <span className="sector-legend__deals">{formatCompactInteger(sector.deals)} deals</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </SectionCard>
  );
};