import { AlertTriangle, GitBranch, Trophy } from "lucide-react";
import { KpiCard } from "./KpiCard";
import { MonthlyTrendSection } from "./MonthlyTrendSection";

const quickFactStyleMap = {
  "Active pipeline": { accent: "var(--crm-cyan)", icon: GitBranch },
  "Deals won": { accent: "var(--crm-green)", icon: Trophy },
  "Deals lost": { accent: "var(--crm-amber)", icon: AlertTriangle },
};

export const HeroOverviewSection = ({ kpiCards, kpiIconMap, quickFacts, reducedMotion, theme, themePalette }) => (
  <div className="hero-overview-grid" data-testid="hero-overview-grid">
    <MonthlyTrendSection delay={220} reducedMotion={reducedMotion} theme={theme} themePalette={themePalette} variant="hero" />

    <aside className="hero-kpi-column staggered" data-testid="hero-kpi-column" style={{ "--stagger-delay": "280ms" }}>
      <div className="hero-kpi-column__header">
        <p className="hero-kpi-column__eyebrow" data-testid="hero-kpi-column-eyebrow">
          Executive snapshot
        </p>
        <h2 className="hero-kpi-column__title" data-testid="hero-kpi-column-title">
          The numbers that matter first.
        </h2>
        <p className="hero-kpi-column__subtitle" data-testid="hero-kpi-column-subtitle">
          Each KPI is tuned for quick scanning so leadership can grasp scale, quality, and deal health in seconds.
        </p>
      </div>

      <div className="hero-kpi-grid" data-testid="hero-kpi-grid">
        {kpiCards.map((card, index) => (
          <KpiCard
            card={card}
            delay={320 + index * 60}
            icon={kpiIconMap[card.id]}
            key={card.id}
            reducedMotion={reducedMotion}
            variant="support"
          />
        ))}
      </div>

      <div className="hero-quick-facts" data-testid="hero-quick-facts">
        {quickFacts.map((fact) => {
          const styleConfig = quickFactStyleMap[fact.label] ?? { accent: "var(--crm-cyan)", icon: GitBranch };
          const Icon = styleConfig.icon;

          return (
            <article className="hero-quick-fact" data-testid={`hero-quick-fact-${fact.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={fact.label} style={{ "--fact-accent": styleConfig.accent }}>
              <div className="hero-quick-fact__top">
                <p className="hero-quick-fact__label">{fact.label}</p>
                <span className="hero-quick-fact__icon" data-testid={`hero-quick-fact-icon-${fact.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  <Icon size={14} />
                </span>
              </div>
              <p className="hero-quick-fact__value">{fact.value}</p>
            </article>
          );
        })}
      </div>
    </aside>
  </div>
);