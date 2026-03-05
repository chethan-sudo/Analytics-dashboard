import { useState } from "react";
import { GitBranch } from "lucide-react";
import { pipelineStages } from "../../data/crmData";
import { formatCompactCurrency, formatInteger } from "../../utils/formatters";
import { SectionCard } from "./SectionCard";

export const PipelineSection = ({ delay }) => {
  const [activeStage, setActiveStage] = useState(pipelineStages[1]);
  const totalActiveValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0);
  const activeStageIndex = pipelineStages.findIndex((stage) => stage.stage === activeStage.stage);
  const activeStageValueShare = totalActiveValue > 0 ? ((activeStage.value / totalActiveValue) * 100).toFixed(1) : "0.0";
  const nextStage = pipelineStages[Math.min(activeStageIndex + 1, pipelineStages.length - 1)]?.stage ?? "Closed";
  const activeStageValueDisplay = activeStage.value === 0 ? "—" : formatCompactCurrency(activeStage.value);
  const highestValueStage = [...pipelineStages].sort((a, b) => b.value - a.value)[0];
  const bestConversionStage = [...pipelineStages].sort((a, b) => b.conversion - a.conversion)[0];

  return (
    <SectionCard
      action={
        <div className="section-badge" data-testid="pipeline-active-value-badge">
          Active pipeline · $8.577M
        </div>
      }
      delay={delay}
      icon={GitBranch}
      subtitle="Track stage health and conversion through a compact funnel."
      testId="pipeline-section-card"
      title="Pipeline by stage"
    >
      <div className="pipeline-layout" data-testid="pipeline-layout">
        <div className="pipeline-focus-column" data-testid="pipeline-focus-column">
          <div className="pipeline-detail-panel" data-testid="pipeline-detail-panel">
            <p className="pipeline-detail-panel__label">Focused stage</p>
            <h3 className="pipeline-detail-panel__title" data-testid="pipeline-detail-title">
              {activeStage.stage}
            </h3>
            <p className="pipeline-detail-panel__subtitle" data-testid="pipeline-detail-subtitle">
              {formatInteger(activeStage.deals)} deals carrying {activeStageValueDisplay} at a {activeStage.conversion}% conversion level.
            </p>

            <div className="pipeline-detail-panel__metrics">
              <div className="pipeline-detail-panel__metric" data-testid="pipeline-detail-deals">
                <span className="pipeline-detail-panel__metric-label">Deals</span>
                <span className="pipeline-detail-panel__metric-value">{formatInteger(activeStage.deals)}</span>
              </div>
              <div className="pipeline-detail-panel__metric" data-testid="pipeline-detail-value">
                <span className="pipeline-detail-panel__metric-label">Value</span>
                <span className="pipeline-detail-panel__metric-value">{activeStageValueDisplay}</span>
              </div>
              <div className="pipeline-detail-panel__metric" data-testid="pipeline-detail-conversion">
                <span className="pipeline-detail-panel__metric-label">Conversion</span>
                <span className="pipeline-detail-panel__metric-value">{activeStage.conversion}%</span>
              </div>
            </div>

            <div className="panel-insights" data-testid="pipeline-detail-insights">
              <p className="panel-insights__item" data-testid="pipeline-detail-stage-order">Stage {activeStageIndex + 1} of {pipelineStages.length}</p>
              <p className="panel-insights__item" data-testid="pipeline-detail-value-share">{activeStageValueShare}% share of active pipeline value</p>
              <p className="panel-insights__item" data-testid="pipeline-detail-next-stage">Next transition target: {nextStage}</p>
            </div>
          </div>

          <div className="pipeline-summary-stack" data-testid="pipeline-summary-stack">
            <article className="pipeline-summary-stack__item" data-testid="pipeline-summary-highest-value">
              <p className="pipeline-summary-stack__label">Highest value stage</p>
              <p className="pipeline-summary-stack__value">{highestValueStage.stage} · {formatCompactCurrency(highestValueStage.value)}</p>
            </article>

            <article className="pipeline-summary-stack__item" data-testid="pipeline-summary-best-conversion">
              <p className="pipeline-summary-stack__label">Best conversion</p>
              <p className="pipeline-summary-stack__value">{bestConversionStage.stage} · {bestConversionStage.conversion}%</p>
            </article>
          </div>
        </div>

        <div className="pipeline-funnel" data-testid="pipeline-stage-funnel">
          {pipelineStages.map((stage, index) => {
            const isActive = activeStage.stage === stage.stage;

            return (
              <button
                className={`pipeline-funnel__layer ${isActive ? "pipeline-funnel__layer--active" : ""}`.trim()}
                data-testid={`pipeline-row-${stage.stage.toLowerCase()}`}
                key={stage.stage}
                onFocus={() => setActiveStage(stage)}
                onMouseEnter={() => setActiveStage(stage)}
                style={{ "--fill-delay": `${160 + index * 70}ms`, "--stage-color": stage.color, "--stage-width": `${stage.conversion}%` }}
                type="button"
              >
                <div className="pipeline-funnel__band">
                  <div className="pipeline-funnel__band-top">
                    <span className="pipeline-funnel__stage-index">{`${index + 1}`.padStart(2, "0")}</span>
                    <span className="pipeline-funnel__stage-name">{stage.stage}</span>
                    <span className="pipeline-funnel__stage-rate">{stage.conversion}%</span>
                  </div>

                  <div className="pipeline-funnel__meter" data-testid={`pipeline-row-meter-${stage.stage.toLowerCase()}`}>
                    <span className="pipeline-funnel__meter-fill" style={{ width: `${stage.conversion}%` }} />
                  </div>

                  <div className="pipeline-funnel__band-bottom">
                    <span className="pipeline-funnel__stage-deals">{formatInteger(stage.deals)} deals</span>
                    <span className={`pipeline-funnel__stage-value ${stage.value === 0 ? "pipeline-funnel__stage-value--empty" : ""}`.trim()}>{stage.value === 0 ? "—" : formatCompactCurrency(stage.value)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
};