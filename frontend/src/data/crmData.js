export const brand = {
  appName: "SignalDeck",
  companyName: "Northforge Systems",
  pageTitle: "Northforge sales command",
  subtitle: "A boardroom-grade read of FY24 pipeline, product strength, sector quality, and team momentum — designed to be understood in a single sweep.",
  kicker: "Editorial revenue atlas",
};

export const sharedPalette = {
  cyan: "#06b6d4",
  green: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  indigo: "#6366f1",
  purple: "#8b5cf6",
  gold: "#fbbf24",
  silver: "#cbd5e1",
  bronze: "#c084fc",
};

export const getThemePalette = (theme) =>
  theme === "light"
    ? {
        text: "#18181b",
        subtext: "#52525b",
        muted: "#a1a1aa",
        border: "rgba(0, 0, 0, 0.08)",
        grid: "rgba(0, 0, 0, 0.06)",
        tooltip: "#ffffff",
        tooltipShadow: "0 28px 60px rgba(15, 23, 42, 0.12)",
        track: "rgba(0, 0, 0, 0.08)",
      }
    : {
        text: "#ededed",
        subtext: "#a1a1aa",
        muted: "#52525b",
        border: "rgba(255, 255, 255, 0.08)",
        grid: "rgba(255, 255, 255, 0.06)",
        tooltip: "#0f1014",
        tooltipShadow: "0 28px 60px rgba(0, 0, 0, 0.42)",
        track: "rgba(255, 255, 255, 0.08)",
      };

export const dateRanges = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Full Year 2024"];

export const userProfile = {
  name: "Chethan S",
  role: "Sales Director",
  initials: "CS",
  avatar:
    "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MHx8fHwxNzcyNjM3MTk2fDA&ixlib=rb-4.1.0&q=85",
};

export const kpiCards = [
  {
    id: "total-revenue",
    label: "Total Revenue",
    value: 10489843,
    displayType: "currency-compact",
    trend: "+12.4%",
    comparison: "vs last quarter",
    accent: sharedPalette.cyan,
    metaLabel: "Won deals",
    metaValue: "4,238",
    sparkline: [687, 745, 923, 856, 1012, 978, 834, 912, 1087, 1145, 876, 429],
  },
  {
    id: "active-deals",
    label: "Active Deals",
    value: 8798,
    displayType: "integer",
    trend: "-3.2%",
    comparison: "vs last quarter",
    accent: sharedPalette.indigo,
    metaLabel: "Pipeline value",
    metaValue: "$8.577M",
    sparkline: [312, 287, 356, 334, 398, 376, 342, 361, 412, 438, 352, 270],
  },
  {
    id: "win-rate",
    label: "Win Rate",
    value: 63.2,
    displayType: "percent",
    trend: "+4.7%",
    comparison: "vs last quarter",
    accent: sharedPalette.amber,
    metaLabel: "Deals lost",
    metaValue: "2,473",
    sparkline: [58, 61, 64, 62, 66, 64, 63, 63, 67, 68, 62, 66],
  },
  {
    id: "average-deal",
    label: "Avg Deal Size",
    value: 2476,
    displayType: "currency",
    trend: "+8.1%",
    comparison: "vs last quarter",
    accent: sharedPalette.green,
    metaLabel: "Best team",
    metaValue: "West · 66%",
    sparkline: [2120, 2340, 2280, 2410, 2540, 2380, 2510, 2470, 2630, 2590, 2480, 2430],
  },
];

export const pipelineStages = [
  { stage: "Prospecting", deals: 1931, value: 3862000, conversion: 100, color: sharedPalette.cyan },
  { stage: "Engaging", deals: 1589, value: 4767000, conversion: 82, color: sharedPalette.indigo },
  { stage: "Qualifying", deals: 987, value: 3948000, conversion: 51, color: sharedPalette.purple },
  { stage: "Won", deals: 4238, value: 10489843, conversion: 48, color: sharedPalette.green },
  { stage: "Lost", deals: 2473, value: 0, conversion: 28, color: sharedPalette.rose },
];

export const revenueByProduct = [
  { product: "GTX Pro", revenue: 3289450, deals: 1247, winRate: 68, color: sharedPalette.cyan },
  { product: "GTX Plus Pro", revenue: 2187320, deals: 876, winRate: 62, color: sharedPalette.indigo },
  { product: "MG Advanced", revenue: 1876540, deals: 1432, winRate: 55, color: sharedPalette.purple },
  { product: "GTX Basic", revenue: 1645230, deals: 1876, winRate: 71, color: sharedPalette.green },
  { product: "MG Special", revenue: 987430, deals: 654, winRate: 48, color: sharedPalette.amber },
  { product: "GTX Plus Basic", revenue: 503873, deals: 713, winRate: 59, color: sharedPalette.rose },
];

export const monthlyTrend = [
  { month: "Jan", revenue: 687420, deals: 312, won: 198, lost: 114 },
  { month: "Feb", revenue: 745830, deals: 287, won: 182, lost: 105 },
  { month: "Mar", revenue: 923150, deals: 356, won: 231, lost: 125 },
  { month: "Apr", revenue: 856740, deals: 334, won: 207, lost: 127 },
  { month: "May", revenue: 1012380, deals: 398, won: 264, lost: 134 },
  { month: "Jun", revenue: 978560, deals: 376, won: 242, lost: 134 },
  { month: "Jul", revenue: 834290, deals: 342, won: 215, lost: 127 },
  { month: "Aug", revenue: 912470, deals: 361, won: 228, lost: 133 },
  { month: "Sep", revenue: 1087340, deals: 412, won: 278, lost: 134 },
  { month: "Oct", revenue: 1145670, deals: 438, won: 297, lost: 141 },
  { month: "Nov", revenue: 876430, deals: 352, won: 218, lost: 134 },
  { month: "Dec", revenue: 429563, deals: 270, won: 178, lost: 92 },
];

export const topAgents = [
  {
    rank: 1,
    name: "Darcel Schlecht",
    team: "West",
    dealsClosed: 87,
    revenue: 1023450,
    winRate: 72,
    trend: "+5.2%",
    gradient: [sharedPalette.gold, "#f97316"],
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
  },
  {
    rank: 2,
    name: "Versie Hillebrand",
    team: "Central",
    dealsClosed: 79,
    revenue: 967230,
    winRate: 69,
    trend: "+3.8%",
    gradient: [sharedPalette.silver, sharedPalette.indigo],
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
  },
  {
    rank: 3,
    name: "Donn Cantwell",
    team: "East",
    dealsClosed: 74,
    revenue: 912870,
    winRate: 71,
    trend: "+2.1%",
    gradient: [sharedPalette.bronze, sharedPalette.purple],
    avatar: "https://images.pexels.com/photos/6572210/pexels-photo-6572210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    rank: 4,
    name: "Kary Hendrixson",
    team: "West",
    dealsClosed: 71,
    revenue: 878340,
    winRate: 67,
    trend: "-1.4%",
    gradient: [sharedPalette.cyan, sharedPalette.indigo],
    avatar:
      "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MHx8fHwxNzcyNjM3MTk2fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    rank: 5,
    name: "Wilburn Farren",
    team: "Central",
    dealsClosed: 68,
    revenue: 834560,
    winRate: 65,
    trend: "+4.6%",
    gradient: [sharedPalette.green, sharedPalette.cyan],
    avatar: "https://images.pexels.com/photos/14589344/pexels-photo-14589344.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export const sectorWinRates = [
  { sector: "Technology", winRate: 67, deals: 2134, revenue: 3245670, color: sharedPalette.cyan },
  { sector: "Software", winRate: 64, deals: 1123, revenue: 1498760, color: sharedPalette.indigo },
  { sector: "Medical", winRate: 61, deals: 1567, revenue: 2187430, color: sharedPalette.green },
  { sector: "Finance", winRate: 58, deals: 1234, revenue: 1876540, color: sharedPalette.amber },
  { sector: "Retail", winRate: 52, deals: 987, revenue: 1234560, color: sharedPalette.purple },
  { sector: "Aerospace", winRate: 45, deals: 453, revenue: 446883, color: sharedPalette.rose },
];

export const salesTeams = [
  { team: "West", manager: "Summer Sewald", revenue: 3124560, deals: 2345, agents: 9, winRate: 66, color: sharedPalette.cyan },
  { team: "Central", manager: "Melvin Marxen", revenue: 2876430, deals: 2187, agents: 8, winRate: 63, color: sharedPalette.indigo },
  { team: "East", manager: "Rocco Neubert", revenue: 2567890, deals: 1987, agents: 9, winRate: 61, color: sharedPalette.green },
  { team: "South", manager: "Celia Rouche", revenue: 1920963, deals: 2279, agents: 9, winRate: 57, color: sharedPalette.amber },
];

export const dealSizeDistribution = [
  { range: "Under $500", count: 1234, percent: 14, countLabel: "1,234 · 14%", color: sharedPalette.cyan },
  { range: "$500–$2K", count: 2876, percent: 33, countLabel: "2,876 · 33%", color: sharedPalette.indigo },
  { range: "$2K–$5K", count: 2345, percent: 27, countLabel: "2,345 · 27%", color: sharedPalette.purple },
  { range: "$5K–$10K", count: 1567, percent: 18, countLabel: "1,567 · 18%", color: sharedPalette.green },
  { range: "Over $10K", count: 776, percent: 8, countLabel: "776 · 8%", color: sharedPalette.amber },
];

export const teamRadarData = [
  { metric: "Win Rate", West: 66, Central: 63, East: 61, South: 57 },
  { metric: "Avg Deal Size", West: 78, Central: 72, East: 68, South: 62 },
  { metric: "Deal Volume", West: 82, Central: 76, East: 71, South: 80 },
  { metric: "Close Speed", West: 71, Central: 68, East: 74, South: 65 },
  { metric: "Client Retention", West: 88, Central: 82, East: 79, South: 74 },
];

export const editorialSignals = [
  {
    label: "October peak",
    value: "$1.15M",
    note: "438 deals closed in the strongest month",
    accent: sharedPalette.cyan,
  },
  {
    label: "Technology leads",
    value: "67% win",
    note: "$3.25M booked across the strongest sector",
    accent: sharedPalette.green,
  },
  {
    label: "Core ticket band",
    value: "60% volume",
    note: "$500–$5K remains the dominant deal range",
    accent: sharedPalette.amber,
  },
];

export const heroQuickFacts = [
  { label: "Active pipeline", value: "$8.577M" },
  { label: "Deals won", value: "4,238" },
  { label: "Deals lost", value: "2,473" },
];

export const executiveHighlights = [
  {
    label: "Active pipeline",
    value: "$8.577M",
    note: "Engaging carries the richest middle-funnel value",
    accent: sharedPalette.cyan,
  },
  {
    label: "Best team",
    value: "West · 66%",
    note: "Summer Sewald's team booked $3.12M in revenue",
    accent: sharedPalette.green,
  },
  {
    label: "Top closer",
    value: "Darcel Schlecht",
    note: "$1.02M revenue with a 72% win rate",
    accent: sharedPalette.amber,
  },
  {
    label: "Risk edge",
    value: "Aerospace · 45%",
    note: "Lowest sector close rate across the portfolio",
    accent: sharedPalette.rose,
  },
];