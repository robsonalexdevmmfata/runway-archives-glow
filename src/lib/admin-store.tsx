import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { categories as defaultCategories, type Category, type Nominee } from "./vs-data";

// Dados editáveis do site
type SiteConfig = {
  siteName: string;
  siteTagline: string;
  logoText: string;
  logoImage: string;
  headerImage: string;
  faviconImage: string;
  headerButtons: { label: string; action: string }[];
  footerText: string;
  
  // Conteúdos da Home
  heroSection: {
    topText: string;
    mainTitle: string;
    bottomText: string;
    backgroundImage: string;
  };
  
  statsSection: {
    stats: Array<{ n: string; label: string }>;
  };
  
  // Ticker (barra de ranking)
  ticker: {
    title: string;
    subtitle: string;
    items: Array<{
      pos: string;
      pct: string;
      cat: string;
      name: string;
      sub: string;
    }>;
  };
  
  colors: {
    // Cores principais
    primary: string;
    secondary: string;
    accent: string;
    
    // Cores douradas (marca)
    gold: string;
    goldSoft: string;
    
    // Cores rosa/pink
    pinkGlow: string;
    pinkHover: string;
    
    // Background e superfícies
    background: string;
    panel: string;
    card: string;
    sidebar: string;
    
    // Texto
    foreground: string;
    muted: string;
    
    // Bordas
    border: string;
    
    // Header/Footer
    headerBg: string;
    headerText: string;
    footerBg: string;
    footerText: string;
    
    // Botões
    buttonPrimary: string;
    buttonSecondary: string;
    buttonHover: string;
    
    // Estados
    success: string;
    warning: string;
    error: string;
    info: string;
  };
};

type AdminState = {
  categories: Category[];
  siteConfig: SiteConfig;
  updateCategory: (slug: string, updates: Partial<Category>) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (slug: string) => void;
  addNominee: (slug: string, nominee: Nominee) => void;
  updateNominee: (slug: string, nomineeIndex: number, updates: Partial<Nominee>) => void;
  deleteNominee: (slug: string, nomineeIndex: number) => void;
  updateSiteConfig: (updates: Partial<SiteConfig>) => void;
  updateTickerItem: (index: number, updates: Partial<SiteConfig["ticker"]["items"][0]>) => void;
  addTickerItem: (item: SiteConfig["ticker"]["items"][0]) => void;
  deleteTickerItem: (index: number) => void;
  updateStat: (index: number, updates: Partial<SiteConfig["statsSection"]["stats"][0]>) => void;
  addStat: (stat: SiteConfig["statsSection"]["stats"][0]) => void;
  deleteStat: (index: number) => void;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
};

const defaultSiteConfig: SiteConfig = {
  siteName: "RUNWAY WAVY",
  siteTagline: "VICTORIA'S SECRET 2026",
  logoText: "RUNWAY WAVY",
  logoImage: "",
  headerImage: "",
  faviconImage: "",
  headerButtons: [
    { label: "ENTRAR", action: "login" },
    { label: "REGISTRAR", action: "register" },
  ],
  footerText: "Runway Wavy — arquivo não oficial dedicado à história dos desfiles da Victoria's Secret.",
  
  heroSection: {
    topText: "VICTORIA'S SECRET • 1963 — 2026",
    mainTitle: "MELHOR DESFILE",
    bottomText: "RANKING DA HISTÓRIA",
    backgroundImage: "/assets/hero-runway.jpg",
  },
  
  statsSection: {
    stats: [
      { n: "31", label: "DESFILES REALIZADOS" },
      { n: "63", label: "ANOS DE HISTÓRIA" },
      { n: "42", label: "ANGELS OFICIAIS" },
      { n: "28", label: "FANTASY BRAS" },
    ],
  },
  
  ticker: {
    title: "QUEM É A MAIOR ANGEL?",
    subtitle: "VOTAÇÃO POPULAR (GLOBAL)",
    items: [
      { pos: "1º", pct: "71%", cat: "MELHOR ANGEL", name: "ADRIANA LIMA", sub: "1999 — 2018" },
      { pos: "2º", pct: "65%", cat: "MELHOR ABERTURA", name: "GISELE BÜNDCHEN", sub: '"SEXY SANTA" 2000' },
      { pos: "3º", pct: "60%", cat: "MELHOR TRILHA", name: "RIHANNA", sub: '"DIAMONDS" 2012' },
      { pos: "4º", pct: "58%", cat: "FANTASY BRA", name: "HEIDI KLUM", sub: '"RED HOT" 2001' },
      { pos: "5º", pct: "57%", cat: "MELHOR RETORNO", name: "ASHLEY GRAHAM", sub: "SHOW 2024" },
    ],
  },
  
  colors: {
    // Cores principais
    primary: "oklch(0.7 0.25 350)",
    secondary: "oklch(0.65 0.2 280)",
    accent: "oklch(0.82 0.15 85)",
    
    // Cores douradas (marca)
    gold: "oklch(0.85 0.12 85)",
    goldSoft: "oklch(0.82 0.09 80)",
    
    // Cores rosa/pink
    pinkGlow: "oklch(0.75 0.28 350)",
    pinkHover: "oklch(0.7 0.25 350)",
    
    // Background e superfícies
    background: "oklch(0.15 0.01 270)",
    panel: "oklch(0.18 0.01 270)",
    card: "oklch(0.20 0.01 270)",
    sidebar: "oklch(0.17 0.01 270)",
    
    // Texto
    foreground: "oklch(0.98 0 0)",
    muted: "oklch(0.65 0.01 270)",
    
    // Bordas
    border: "oklch(0.30 0.02 270)",
    
    // Header/Footer
    headerBg: "oklch(0.7 0.25 350)",
    headerText: "oklch(0.98 0 0)",
    footerBg: "oklch(0.18 0.01 270)",
    footerText: "oklch(0.65 0.01 270)",
    
    // Botões
    buttonPrimary: "oklch(0.7 0.25 350)",
    buttonSecondary: "oklch(0.85 0.12 85)",
    buttonHover: "oklch(0.65 0.28 350)",
    
    // Estados
    success: "oklch(0.65 0.2 145)",
    warning: "oklch(0.75 0.15 85)",
    error: "oklch(0.65 0.25 25)",
    info: "oklch(0.65 0.2 240)",
  },
};

const AdminContext = createContext<AdminState | null>(null);

const STORAGE_KEY = "runway_wavy_admin_data";

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window === "undefined") return defaultCategories;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultCategories;
    try {
      const parsed = JSON.parse(stored);
      return parsed.categories || defaultCategories;
    } catch {
      return defaultCategories;
    }
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    if (typeof window === "undefined") return defaultSiteConfig;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultSiteConfig;
    try {
      const parsed = JSON.parse(stored);
      const config = parsed.siteConfig || defaultSiteConfig;
      
      // Migração automática: validar se tem heroSection
      if (!config.heroSection) {
        console.log("Migrando dados antigos...");
        return defaultSiteConfig;
      }
      
      return config;
    } catch {
      return defaultSiteConfig;
    }
  });

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ categories, siteConfig })
      );
    }
  }, [categories, siteConfig]);

  const updateCategory = (slug: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.slug === slug ? { ...cat, ...updates } : cat))
    );
  };

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  const deleteCategory = (slug: string) => {
    setCategories((prev) => prev.filter((cat) => cat.slug !== slug));
  };

  const addNominee = (slug: string, nominee: Nominee) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.slug === slug
          ? { ...cat, nominees: [...cat.nominees, nominee] }
          : cat
      )
    );
  };

  const updateNominee = (slug: string, nomineeIndex: number, updates: Partial<Nominee>) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.slug === slug
          ? {
              ...cat,
              nominees: cat.nominees.map((nom, idx) =>
                idx === nomineeIndex ? { ...nom, ...updates } : nom
              ),
            }
          : cat
      )
    );
  };

  const deleteNominee = (slug: string, nomineeIndex: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.slug === slug
          ? {
              ...cat,
              nominees: cat.nominees.filter((_, idx) => idx !== nomineeIndex),
            }
          : cat
      )
    );
  };

  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...updates }));
  };

  const updateTickerItem = (index: number, updates: Partial<SiteConfig["ticker"]["items"][0]>) => {
    setSiteConfig((prev) => ({
      ...prev,
      ticker: {
        ...prev.ticker,
        items: prev.ticker.items.map((item, idx) =>
          idx === index ? { ...item, ...updates } : item
        ),
      },
    }));
  };

  const addTickerItem = (item: SiteConfig["ticker"]["items"][0]) => {
    setSiteConfig((prev) => ({
      ...prev,
      ticker: {
        ...prev.ticker,
        items: [...prev.ticker.items, item],
      },
    }));
  };

  const deleteTickerItem = (index: number) => {
    setSiteConfig((prev) => ({
      ...prev,
      ticker: {
        ...prev.ticker,
        items: prev.ticker.items.filter((_, idx) => idx !== index),
      },
    }));
  };

  const updateStat = (index: number, updates: Partial<SiteConfig["statsSection"]["stats"][0]>) => {
    setSiteConfig((prev) => ({
      ...prev,
      statsSection: {
        ...prev.statsSection,
        stats: prev.statsSection.stats.map((stat, idx) =>
          idx === index ? { ...stat, ...updates } : stat
        ),
      },
    }));
  };

  const addStat = (stat: SiteConfig["statsSection"]["stats"][0]) => {
    setSiteConfig((prev) => ({
      ...prev,
      statsSection: {
        ...prev.statsSection,
        stats: [...prev.statsSection.stats, stat],
      },
    }));
  };

  const deleteStat = (index: number) => {
    setSiteConfig((prev) => ({
      ...prev,
      statsSection: {
        ...prev.statsSection,
        stats: prev.statsSection.stats.filter((_, idx) => idx !== index),
      },
    }));
  };

  const resetToDefaults = () => {
    setCategories(defaultCategories);
    setSiteConfig(defaultSiteConfig);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const exportData = () => {
    return JSON.stringify({ categories, siteConfig }, null, 2);
  };

  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.categories && Array.isArray(parsed.categories)) {
        setCategories(parsed.categories);
      }
      if (parsed.siteConfig) {
        setSiteConfig(parsed.siteConfig);
      }
      return true;
    } catch {
      return false;
    }
  };

  const value: AdminState = {
    categories,
    siteConfig,
    updateCategory,
    addCategory,
    deleteCategory,
    addNominee,
    updateNominee,
    deleteNominee,
    updateSiteConfig,
    updateTickerItem,
    addTickerItem,
    deleteTickerItem,
    updateStat,
    addStat,
    deleteStat,
    resetToDefaults,
    exportData,
    importData,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdminStore() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminStore must be used within AdminStoreProvider");
  }
  return context;
}
