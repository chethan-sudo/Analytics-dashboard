import { useState } from "react";
import { MapPin } from "lucide-react";
import { dealSizeDistribution, sharedPalette } from "../../data/crmData";
import { formatInteger } from "../../utils/formatters";
import { SectionCard } from "./SectionCard";

const maxCount = Math.max(...dealSizeDistribution.map((bucket) => bucket.count));
const sharedBarPalette = [sharedPalette.cyan, sharedPalette.indigo, sharedPalette.green, sharedPalette.amber, sharedPalette.rose];

export const DealSizeSection = ({ delay }) => {
  const [activeBucket, setActiveBucket] = useState(dealSizeDistribution[1]);

  return (
    <SectionCard
      action={
        <div className="section-badge" data-testid="deal-size-mid-market-badge">
          Volume distribution
        </div>
      }
      delay={delay}
      icon={MapPin}
      subtitle="Hover bars to inspect count and share for each deal band."
      testId="deal-size-section-card"
      title="Deal size distribution"
    >
      <div className="deal-size-layout" data-testid="deal-size-layout">
        <div className="deal-size-detail-panel" data-testid="deal-size-detail-panel">
          <p className="deal-size-detail-panel__label">Focused range</p>
          <h3 className="deal-size-detail-panel__title" data-testid="deal-size-detail-title">
            {activeBucket.range}
          </h3>
          <p className="deal-size-detail-panel__subtitle" data-testid="deal-size-detail-subtitle">
            {formatInteger(activeBucket.count)} deals, representing {activeBucket.percent}% of total volume.
          </p>

          <div className="deal-size-detail-panel__metrics">
            <div className="deal-size-detail-panel__metric" data-testid="deal-size-detail-count">
              <span className="deal-size-detail-panel__metric-label">Deals</span>
              <span className="deal-size-detail-panel__metric-value">{formatInteger(activeBucket.count)}</span>
            </div>
            <div className="deal-size-detail-panel__metric" data-testid="deal-size-detail-share">
              <span className="deal-size-detail-panel__metric-label">Share</span>
              <span className="deal-size-detail-panel__metric-value">{activeBucket.percent}%</span>
            </div>
          </div>
        </div>

        <div className="deal-size-bars" data-testid="deal-size-chart-panel">
          <div className="deal-size-bars__legend" data-testid="deal-size-color-key">
            <span className="deal-size-bars__legend-text">Shared palette</span>
            <span className="deal-size-bars__legend-palette" data-testid="deal-size-color-palette">
              {sharedBarPalette.map((color, index) => (
                <span className="deal-size-bars__legend-chip" key={color} style={{ background: color }} data-testid={`deal-size-color-chip-${index + 1}`} />
              ))}
            </span>
          </div>

          {dealSizeDistribution.map((bucket, index) => {
            const isActive = activeBucket.range === bucket.range;
            const opacity = (0.38 + ((index + 1) / dealSizeDistribution.length) * 0.55).toFixed(2);
            const barColor = sharedBarPalette[index % sharedBarPalette.length];

            return (
              <button
                className={`deal-size-bar ${isActive ? "deal-size-bar--active" : ""}`.trim()}
                data-testid={`deal-size-bar-${bucket.range.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                key={bucket.range}
                onFocus={() => setActiveBucket(bucket)}
                onMouseEnter={() => setActiveBucket(bucket)}
                style={{ "--bar-height": `${(bucket.count / maxCount) * 100}%`, "--bar-opacity": opacity, "--bar-color": barColor }}
                type="button"
              >
                <span className="deal-size-bar__top-label">{bucket.countLabel}</span>
                <span className="deal-size-bar__column-wrap">
                  <span className="deal-size-bar__column" />
                </span>
                <span className="deal-size-bar__range">{bucket.range}</span>
              </button>
            );
          })}
        </div>
      </div>

    </SectionCard>
  );
};