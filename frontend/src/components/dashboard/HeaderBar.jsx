import { Bell, Calendar, ChevronDown, Moon, Search, Sun } from "lucide-react";

const toSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const HeaderBar = ({ brand, dateRange, dateRanges, onDateChange, onThemeToggle, theme }) => (
  <header className="dashboard-header-compact staggered" data-testid="dashboard-header" style={{ "--stagger-delay": "120ms" }}>
    <div className="dashboard-header-compact__copy">
      <div className="dashboard-header-compact__eyebrow-row">
        <p className="dashboard-header-compact__eyebrow" data-testid="header-company-label">
          {brand.companyName}
        </p>
        <span className="dashboard-header-compact__divider" data-testid="header-kicker-divider">
          ·
        </span>
        <p className="dashboard-header-compact__kicker" data-testid="header-kicker">
          {brand.kicker}
        </p>
      </div>

      <h1 className="dashboard-header-compact__title" data-testid="header-title">
        {brand.pageTitle}
      </h1>

      <p className="dashboard-header-compact__subtitle" data-testid="header-subtitle">
        {brand.subtitle}
      </p>
    </div>

    <div className="dashboard-header-compact__toolbar" data-testid="header-toolbar">
      <label className="dashboard-header-compact__search" data-testid="header-search-shell">
        <Search className="dashboard-header-compact__search-icon" size={16} />
        <input
          className="dashboard-header-compact__search-input"
          data-testid="header-search-input"
          placeholder="Search dashboard"
          type="search"
        />
      </label>

      <div className="dashboard-header-compact__utility" data-testid="header-utility-group">
        <label className="dashboard-header-compact__control dashboard-header-compact__control--select" data-testid="header-date-range-shell">
          <Calendar size={16} />
          <select
            className="dashboard-header-compact__select"
            data-testid="header-date-range-select"
            onChange={(event) => onDateChange(event.target.value)}
            value={dateRange}
          >
            {dateRanges.map((range) => (
              <option data-testid={`header-date-range-option-${toSlug(range)}`} key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <ChevronDown className="dashboard-header-compact__chevron" size={16} />
        </label>

        <button aria-label="Open notifications" className="dashboard-header-compact__icon-button" data-testid="header-notification-button" type="button">
          <Bell size={17} />
          <span aria-hidden="true" className="dashboard-header-compact__icon-badge" />
        </button>

        <button
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="theme-switch"
          data-testid="header-theme-toggle-button"
          onClick={onThemeToggle}
          type="button"
        >
          <span className="theme-switch__label">{theme === "dark" ? "Night" : "Day"}</span>
          <span className="theme-switch__track">
            <span className={`theme-switch__icon theme-switch__icon--night ${theme === "dark" ? "theme-switch__icon--active" : ""}`.trim()}>
              <Moon size={14} />
            </span>
            <span className={`theme-switch__icon theme-switch__icon--day ${theme === "light" ? "theme-switch__icon--active" : ""}`.trim()}>
              <Sun size={14} />
            </span>
            <span aria-hidden="true" className={`theme-switch__thumb theme-switch__thumb--${theme}`} />
          </span>
        </button>
      </div>

    </div>
  </header>
);