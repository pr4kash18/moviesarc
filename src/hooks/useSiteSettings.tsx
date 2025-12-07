import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  supportEmail: string;
  enableRegistration: boolean;
  enablePremiumContent: boolean;
  enableAds: boolean;
  maintenanceMode: boolean;
  instagram: string;
  linkedin: string;
  github: string;
}

const defaultSettings: SiteSettings = {
  siteName: "MoviesArc",
  siteDescription: "Your ultimate destination for movies and web series",
  supportEmail: "cpr4kash18@gmail.com",
  enableRegistration: true,
  enablePremiumContent: true,
  enableAds: true,
  maintenanceMode: false,
  instagram: "",
  linkedin: "",
  github: "",
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) throw error;

      if (data) {
        const settingsMap: Record<string, string> = {};
        data.forEach((item: { key: string; value: string | null }) => {
          settingsMap[item.key] = item.value || "";
        });

        setSettings({
          siteName: settingsMap.siteName || defaultSettings.siteName,
          siteDescription: settingsMap.siteDescription || defaultSettings.siteDescription,
          supportEmail: settingsMap.supportEmail || defaultSettings.supportEmail,
          enableRegistration: settingsMap.enableRegistration === "true",
          enablePremiumContent: settingsMap.enablePremiumContent === "true",
          enableAds: settingsMap.enableAds === "true",
          maintenanceMode: settingsMap.maintenanceMode === "true",
          instagram: settingsMap.instagram || "",
          linkedin: settingsMap.linkedin || "",
          github: settingsMap.github || "",
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const updates = Object.entries(newSettings).map(([key, value]) => ({
        key,
        value: typeof value === "boolean" ? String(value) : value,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .update({ value: update.value })
          .eq("key", update.key);

        if (error) throw error;
      }

      setSettings((prev) => ({ ...prev, ...newSettings }));
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  };

  const refreshSettings = async () => {
    await fetchSettings();
  };

  useEffect(() => {
    fetchSettings();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("site_settings_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        () => {
          fetchSettings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, updateSettings, refreshSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    // Return default settings if used outside provider (graceful fallback)
    return {
      settings: defaultSettings,
      loading: false,
      updateSettings: async () => {},
      refreshSettings: async () => {},
    };
  }
  return context;
};
