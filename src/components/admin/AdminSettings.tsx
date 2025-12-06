import { useState, useEffect } from "react";
import { Save, Globe, Bell, Shield, Palette, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  supportEmail: string;
  enableRegistration: boolean;
  enablePremiumContent: boolean;
  enableAds: boolean;
  maintenanceMode: boolean;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "MoviesArc",
    siteDescription: "Your ultimate destination for movies and web series",
    supportEmail: "cpr4kash18@gmail.com",
    enableRegistration: true,
    enablePremiumContent: true,
    enableAds: true,
    maintenanceMode: false,
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("moviesarc_settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save to localStorage (in production, this would save to database)
      localStorage.setItem("moviesarc_settings", JSON.stringify(settings));
      toast({ title: "Success", description: "Settings saved successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl">Settings</h2>
        <Button variant="hero" onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      {/* General Settings */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="font-display text-xl">General Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Site Name</Label>
            <Input
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              placeholder="MoviesArc"
            />
          </div>

          <div className="space-y-2">
            <Label>Support Email</Label>
            <Input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              placeholder="support@example.com"
            />
          </div>

          <div className="space-y-2 col-span-full">
            <Label>Site Description</Label>
            <Textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              placeholder="Your site description..."
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-display text-xl">Feature Toggles</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <Label className="text-base">User Registration</Label>
              <p className="text-sm text-muted-foreground">Allow new users to register</p>
            </div>
            <Switch
              checked={settings.enableRegistration}
              onCheckedChange={(checked) => setSettings({ ...settings, enableRegistration: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <Label className="text-base">Premium Content</Label>
              <p className="text-sm text-muted-foreground">Enable premium subscription features</p>
            </div>
            <Switch
              checked={settings.enablePremiumContent}
              onCheckedChange={(checked) => setSettings({ ...settings, enablePremiumContent: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <Label className="text-base">Advertisements</Label>
              <p className="text-sm text-muted-foreground">Show ads to free users</p>
            </div>
            <Switch
              checked={settings.enableAds}
              onCheckedChange={(checked) => setSettings({ ...settings, enableAds: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <Label className="text-base">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Temporarily disable site access</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="h-5 w-5 text-primary" />
          <h3 className="font-display text-xl">Social Links</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Facebook</Label>
            <Input
              value={settings.socialLinks.facebook}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, facebook: e.target.value }
              })}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label>Twitter / X</Label>
            <Input
              value={settings.socialLinks.twitter}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, twitter: e.target.value }
              })}
              placeholder="https://twitter.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input
              value={settings.socialLinks.instagram}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, instagram: e.target.value }
              })}
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-display text-xl">Email Notifications</h3>
        </div>

        <div className="p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Contact form notifications sent to:</p>
              <p className="text-sm text-muted-foreground">{settings.supportEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
