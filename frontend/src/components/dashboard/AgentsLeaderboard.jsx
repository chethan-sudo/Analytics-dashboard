import { ArrowDownRight, ArrowUpRight, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { topAgents } from "../../data/crmData";
import { formatCompactCurrency, formatCompactInteger, formatFullCurrency, getInitials } from "../../utils/formatters";
import { SectionCard } from "./SectionCard";

const getRankClassName = (rank) => {
  if (rank === 1) {
    return "leaderboard-rank--gold";
  }

  if (rank === 2) {
    return "leaderboard-rank--silver";
  }

  if (rank === 3) {
    return "leaderboard-rank--bronze";
  }

  return "leaderboard-rank--plain";
};

const podiumAgents = topAgents.slice(0, 2);
const remainingAgents = topAgents.slice(2);

export const AgentsLeaderboard = ({ delay }) => (
  <SectionCard
    action={
      <div className="section-badge" data-testid="agents-top-badge">
        Top closer · {topAgents[0].name}
      </div>
    }
    delay={delay}
    icon={Award}
    subtitle="Top performers highlighted first, with remaining reps in a compact ranked list."
    testId="agents-section-card"
    title="Top 5 sales agents"
  >
    <div className="leaderboard-podium" data-testid="agents-podium-grid">
      {podiumAgents.map((agent) => {
        const isPositive = agent.trend.startsWith("+");

        return (
          <article className={`leaderboard-podium-card ${agent.rank === 1 ? "leaderboard-podium-card--primary" : ""}`.trim()} data-testid={`agent-podium-${agent.rank}`} key={agent.name}>
            <div className="leaderboard-podium-card__top">
              <div className={`leaderboard-rank ${getRankClassName(agent.rank)}`}>{`#${agent.rank}`}</div>

              <div className={`leaderboard-podium-card__trend ${isPositive ? "leaderboard-podium-card__trend--positive" : "leaderboard-podium-card__trend--negative"}`.trim()}>
                {isPositive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                {agent.trend}
              </div>
            </div>

            <div className="leaderboard-podium-card__profile">
              <Avatar className="dashboard-avatar dashboard-avatar--featured">
                <AvatarImage alt={agent.name} src={agent.avatar} />
                <AvatarFallback
                  className="dashboard-avatar__fallback dashboard-avatar__fallback--agent"
                  style={{ background: `linear-gradient(135deg, ${agent.gradient[0]}, ${agent.gradient[1]})` }}
                >
                  {getInitials(agent.name)}
                </AvatarFallback>
              </Avatar>

              <div className="leaderboard-podium-card__copy">
                <p className="leaderboard-podium-card__name">{agent.name}</p>
                <p className="leaderboard-podium-card__team">{agent.team} team · {agent.winRate}% win</p>
              </div>
            </div>

            <div className="leaderboard-podium-card__metrics">
              <div className="leaderboard-podium-card__metric">
                <span className="leaderboard-podium-card__metric-label">Revenue</span>
                <span className="leaderboard-podium-card__metric-value">{formatFullCurrency(agent.revenue)}</span>
              </div>
              <div className="leaderboard-podium-card__metric">
                <span className="leaderboard-podium-card__metric-label">Deals closed</span>
                <span className="leaderboard-podium-card__metric-value">{formatCompactInteger(agent.dealsClosed)}</span>
              </div>
            </div>
          </article>
        );
      })}
    </div>

    <div className="leaderboard-list" data-testid="agents-leaderboard-list">
      {remainingAgents.map((agent) => {
        const isPositive = agent.trend.startsWith("+");

        return (
          <article className="leaderboard-row" data-testid={`agent-row-${agent.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={agent.name}>
            <div className="leaderboard-row__identity">
              <div className={`leaderboard-rank ${getRankClassName(agent.rank)}`}>{`#${agent.rank}`}</div>

              <Avatar className="dashboard-avatar dashboard-avatar--agent">
                <AvatarImage alt={agent.name} src={agent.avatar} />
                <AvatarFallback
                  className="dashboard-avatar__fallback dashboard-avatar__fallback--agent"
                  style={{ background: `linear-gradient(135deg, ${agent.gradient[0]}, ${agent.gradient[1]})` }}
                >
                  {getInitials(agent.name)}
                </AvatarFallback>
              </Avatar>

              <div className="leaderboard-row__copy">
                <p className="leaderboard-row__name">{agent.name}</p>
                <p className="leaderboard-row__team">{agent.team} · {agent.winRate}% win</p>
              </div>
            </div>

            <div className="leaderboard-row__stats">
              <span className="leaderboard-row__stat-pill">{formatCompactInteger(agent.dealsClosed)} deals</span>
              <span className="leaderboard-row__stat-pill">{formatCompactCurrency(agent.revenue)}</span>
            </div>

            <div className={`leaderboard-row__trend ${isPositive ? "leaderboard-row__trend--positive" : "leaderboard-row__trend--negative"}`.trim()}>
              {isPositive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
              {agent.trend}
            </div>
          </article>
        );
      })}
    </div>
  </SectionCard>
);