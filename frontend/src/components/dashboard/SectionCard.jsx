export const SectionCard = ({ action = null, children, className = "", delay = 0, icon: Icon, subtitle, testId, title }) => (
  <section
    className={`section-card staggered ${className}`.trim()}
    data-testid={testId}
    style={{ "--stagger-delay": `${delay}ms` }}
  >
    <header className="section-card__header">
      <div className="section-card__heading">
        <div className="section-card__icon" data-testid={`${testId}-icon`}>
          <Icon size={18} />
        </div>
        <div>
          <h2 className="section-card__title" data-testid={`${testId}-title`}>
            {title}
          </h2>
          <p className="section-card__subtitle" data-testid={`${testId}-subtitle`}>
            {subtitle}
          </p>
        </div>
      </div>

      {action ? <div className="section-card__action">{action}</div> : null}
    </header>

    {children}
  </section>
);