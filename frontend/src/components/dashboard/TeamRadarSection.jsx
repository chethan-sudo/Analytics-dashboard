import { Fragment } from "react";
import { Users } from "lucide-react";
import { salesTeams, teamRadarData } from "../../data/crmData";
import { formatCompactCurrency, formatCompactInteger } from "../../utils/formatters";
import { SectionCard } from "./SectionCard";

export const TeamRadarSection = ({ delay }) => (
  <SectionCard
    action={
      <div className="section-badge" data-testid="team-radar-leading-team-badge">
        West leads the overall scorecard
      </div>
    }
    delay={delay}
    icon={Users}
    subtitle="A score matrix replaces overlapping bars, making every team/metric comparison legible at first glance."
    testId="team-radar-section-card"
    title="Team performance matrix"
  >
    <div className="team-matrix" data-testid="team-radar-chart-panel">
      <div className="team-matrix__header team-matrix__header--blank" data-testid="team-matrix-header-metric">
        <span>Metric</span>
      </div>
      {salesTeams.map((team) => (
        <div className="team-matrix__header" data-testid={`team-matrix-header-${team.team.toLowerCase()}`} key={team.team} style={{ "--team-color": team.color }}>
          <span className="team-matrix__header-dot" style={{ background: team.color }} />
          <span>{team.team}</span>
        </div>
      ))}

      {teamRadarData.map((row) => (
        <Fragment key={row.metric}>
          <div className="team-matrix__metric-name" data-testid={`team-matrix-metric-${row.metric.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={`${row.metric}-label`}>
            {row.metric}
          </div>

          {salesTeams.map((team) => {
            const score = row[team.team];

            return (
              <div className="team-matrix__cell" data-testid={`team-matrix-cell-${row.metric.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${team.team.toLowerCase()}`} key={`${row.metric}-${team.team}`} style={{ "--cell-color": team.color, "--cell-progress": `${score}%` }}>
                <span className="team-matrix__cell-value">{score}</span>
                <span className="team-matrix__cell-bar" />
              </div>
            );
          })}
        </Fragment>
      ))}
    </div>

    <div className="team-summary-grid" data-testid="team-summary-grid">
      {salesTeams.map((team) => (
        <article className="team-summary-card" data-testid={`team-summary-${team.team.toLowerCase()}`} key={team.team} style={{ "--team-color": team.color }}>
          <div className="team-summary-card__top">
            <div>
              <p className="team-summary-card__title">{team.team}</p>
              <p className="team-summary-card__caption">Manager · {team.manager}</p>
            </div>
            <span className="team-summary-card__badge">
              {team.winRate}% win
            </span>
          </div>

          <div className="team-summary-card__metrics">
            <div className="team-summary-card__metric">
              <span className="team-summary-card__metric-label">Revenue</span>
              <span className="team-summary-card__metric-value">{formatCompactCurrency(team.revenue)}</span>
            </div>
            <div className="team-summary-card__metric">
              <span className="team-summary-card__metric-label">Deals</span>
              <span className="team-summary-card__metric-value">{formatCompactInteger(team.deals)}</span>
            </div>
            <div className="team-summary-card__metric">
              <span className="team-summary-card__metric-label">Agents</span>
              <span className="team-summary-card__metric-value">{team.agents}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  </SectionCard>
);