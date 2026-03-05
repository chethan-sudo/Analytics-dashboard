import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Sidebar = ({ activeNav, brand, collapsed, navItems, onNavigate, onToggle, user }) => (
  <aside
    className={`dashboard-sidebar ${collapsed ? "dashboard-sidebar--collapsed" : ""}`.trim()}
    data-testid="dashboard-sidebar"
  >
    <div className="sidebar-header">
      <div className="sidebar-brand" data-testid="sidebar-brand-block">
        <div className="sidebar-brand__mark" data-testid="sidebar-brand-mark">
          <span>SD</span>
        </div>

        <div className="sidebar-brand__copy">
          <p className="sidebar-brand__label" data-testid="sidebar-brand-company">
            {brand.companyName}
          </p>
          <h1 className="sidebar-brand__title" data-testid="sidebar-brand-title">
            {brand.appName}
          </h1>
          <p className="sidebar-brand__microcopy" data-testid="sidebar-brand-kicker">
            {brand.kicker}
          </p>
        </div>
      </div>

      <button
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="sidebar-toggle"
        data-testid="sidebar-collapse-button"
        onClick={onToggle}
        type="button"
      >
        {collapsed ? <Menu size={18} /> : <X size={18} />}
      </button>
    </div>

    <nav className="sidebar-nav" data-testid="sidebar-navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeNav === item.id;

        return (
          <button
            className={`sidebar-nav__button ${isActive ? "sidebar-nav__button--active" : ""}`.trim()}
            aria-current={isActive ? "page" : undefined}
            data-testid={`sidebar-nav-${item.id}-button`}
            key={item.id}
            onClick={() => onNavigate(item)}
            type="button"
          >
            <span className="sidebar-nav__icon" data-testid={`sidebar-nav-${item.id}-icon`}>
              <Icon size={18} />
            </span>
            <span className="sidebar-nav__label">{item.label}</span>
          </button>
        );
      })}
    </nav>

    <div className="sidebar-profile" data-testid="sidebar-user-profile">
      <Avatar className="dashboard-avatar dashboard-avatar--sidebar" data-testid="sidebar-user-avatar">
        <AvatarImage alt={user.name} src={user.avatar} />
        <AvatarFallback className="dashboard-avatar__fallback dashboard-avatar__fallback--sidebar">{user.initials}</AvatarFallback>
      </Avatar>

      <div className="sidebar-profile__copy">
        <p className="sidebar-profile__name" data-testid="sidebar-user-name">
          {user.name}
        </p>
        <p className="sidebar-profile__role" data-testid="sidebar-user-role">
          {user.role}
        </p>
      </div>
    </div>
  </aside>
);