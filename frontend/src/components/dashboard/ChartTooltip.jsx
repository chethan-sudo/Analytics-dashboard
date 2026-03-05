export const ChartTooltip = ({ active, label, labelFormatter, payload, themePalette, valueFormatter }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const resolvedLabel = label ?? payload[0]?.name ?? payload[0]?.payload?.sector ?? payload[0]?.payload?.product;

  return (
    <div
      className="chart-tooltip"
      data-testid="chart-tooltip"
      style={{
        background: themePalette.tooltip,
        borderColor: themePalette.border,
        boxShadow: themePalette.tooltipShadow,
      }}
    >
      <p className="chart-tooltip__label" data-testid="chart-tooltip-label">
        {labelFormatter ? labelFormatter(resolvedLabel) : resolvedLabel}
      </p>

      <div className="chart-tooltip__list">
        {payload.map((entry) => (
          <div className="chart-tooltip__row" data-testid={`chart-tooltip-row-${entry.dataKey}`} key={`${entry.dataKey}-${entry.value}`}>
            <span className="chart-tooltip__key">
              <span className="chart-tooltip__dot" style={{ background: entry.color || entry.payload?.color }} />
              {entry.name || entry.dataKey}
            </span>
            <span className="chart-tooltip__value">{valueFormatter(entry.value, entry.name, entry.payload)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};