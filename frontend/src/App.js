import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUp,
  Briefcase,
  Building2,
  DollarSign,
  GitBranch,
  LayoutDashboard,
  LineChart,
  Package,
  PlugZap,
  Settings,
  Target,
  Zap,
} from "lucide-react";
import "./App.css";
import "./styles/dashboard-redesign.css";
import "./styles/dashboard-luxury-refinement.css";
import "./styles/dashboard-critical-fixes.css";
import { HeaderBar } from "./components/dashboard/HeaderBar";
import { AgentsLeaderboard } from "./components/dashboard/AgentsLeaderboard";
import { DealSizeSection } from "./components/dashboard/DealSizeSection";
import { HeroOverviewSection } from "./components/dashboard/HeroOverviewSection";
import { PipelineSection } from "./components/dashboard/PipelineSection";
import { ProductRevenueSection } from "./components/dashboard/ProductRevenueSection";
import { SectorDonutSection } from "./components/dashboard/SectorDonutSection";
import { Sidebar } from "./components/dashboard/Sidebar";
import { TeamRadarSection } from "./components/dashboard/TeamRadarSection";
import { brand, dateRanges, getThemePalette, heroQuickFacts, kpiCards, userProfile } from "./data/crmData";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

const kpiIconMap = {
  "total-revenue": DollarSign,
  "active-deals": Briefcase,
  "win-rate": Target,
  "average-deal": Zap,
};

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, sectionId: "dashboard" },
  { id: "pipeline", label: "Pipeline", icon: GitBranch, sectionId: "pipeline" },
  { id: "accounts", label: "Accounts", icon: Building2, sectionId: "accounts" },
  { id: "reports", label: "Reports", icon: Package, sectionId: "reports" },
  { id: "analytics", label: "Analytics", icon: Activity, sectionId: "analytics" },
  { id: "forecast", label: "Forecast", icon: LineChart, sectionId: "forecast" },
  { id: "integrations", label: "Integrations", icon: PlugZap, sectionId: "integrations" },
  { id: "settings", label: "Settings", icon: Settings, sectionId: "settings" },
];

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const getInitialSidebarState = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.innerWidth < 1320;
};

function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [theme, setTheme] = useState(getInitialTheme);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(getInitialSidebarState);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [dateRange, setDateRange] = useState(dateRanges[dateRanges.length - 1]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const themePalette = useMemo(() => getThemePalette(theme), [theme]);
  const currentSidebarWidth = sidebarCollapsed ? "5.75rem" : "15rem";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    let attempts = 0;

    const applyBadgeStyle = () => {
      const badge = document.getElementById("emergent-badge");
      if (!badge) {
        return false;
      }

      badge.style.setProperty("width", "128px", "important");
      badge.style.setProperty("height", "30px", "important");
      badge.style.setProperty("padding", "5px 9px", "important");
      badge.style.setProperty("opacity", "0.55", "important");
      badge.style.setProperty("bottom", "10px", "important");
      badge.style.setProperty("right", "10px", "important");
      badge.style.setProperty("left", "auto", "important");
      return true;
    };

    applyBadgeStyle();
    const timer = window.setInterval(() => {
      attempts += 1;
      if (applyBadgeStyle() || attempts > 20) {
        window.clearInterval(timer);
      }
    }, 300);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 900);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (item) => {
    setActiveNav(item.id);
    const section = document.getElementById(item.sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="dashboard-app" data-testid="sales-command-dashboard-app" style={{ "--current-sidebar-width": currentSidebarWidth }}>
      <Sidebar
        activeNav={activeNav}
        brand={brand}
        collapsed={sidebarCollapsed}
        navItems={navigationItems}
        onNavigate={handleNavigation}
        onToggle={() => setSidebarCollapsed((previous) => !previous)}
        user={userProfile}
      />

      <main className="dashboard-main" data-testid="dashboard-main-content">
        <HeaderBar
          brand={brand}
          dateRange={dateRange}
          dateRanges={dateRanges}
          onDateChange={setDateRange}
          onThemeToggle={() => setTheme((previous) => (previous === "dark" ? "light" : "dark"))}
          theme={theme}
        />

        <div className="dashboard-main__content">
          <section className="page-section" id="dashboard">
            <span aria-hidden="true" className="anchor-marker" id="settings" />
            <HeroOverviewSection
              kpiCards={kpiCards}
              kpiIconMap={kpiIconMap}
              quickFacts={heroQuickFacts}
              reducedMotion={reducedMotion}
              theme={theme}
              themePalette={themePalette}
            />
          </section>

          <section className="page-section board-columns" data-testid="dashboard-board-columns">
            <div className="board-row board-row--balanced" data-testid="dashboard-board-row-reports-pipeline">
              <div className="board-row__item" id="reports">
                <ProductRevenueSection delay={720} />
              </div>

              <div className="board-row__item" id="pipeline">
                <PipelineSection delay={820} />
              </div>
            </div>

            <div className="board-row board-row--balanced" data-testid="dashboard-board-row-sector-analytics">
              <div className="board-row__item">
                <SectorDonutSection delay={1020} reducedMotion={reducedMotion} theme={theme} themePalette={themePalette} />
              </div>

              <div className="board-row__item" id="analytics">
                <TeamRadarSection delay={1120} />
              </div>
            </div>

            <div className="board-row board-row--balanced" data-testid="dashboard-board-row-deals-accounts">
              <div className="board-row__item">
                <DealSizeSection delay={1220} />
              </div>

              <div className="board-row__item" id="accounts">
                <AgentsLeaderboard delay={920} />
              </div>
            </div>
          </section>
        </div>

        <button
          className={`back-to-top ${showBackToTop ? "back-to-top--visible" : ""}`.trim()}
          data-testid="back-to-top-button"
          onClick={handleBackToTop}
          type="button"
        >
          <ArrowUp size={14} />
          Back to top
        </button>
      </main>
    </div>
  );
}

export default App;