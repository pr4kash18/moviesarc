import { useState, useEffect } from "react";
import { Save, Globe, Bell, Shield, Share2, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const AdminSettings = () => {
  const { settings, updateSettings, loading } = useSiteSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(localSettings);
      toast({ title: "Success", description: "Settings saved successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
              value={localSettings.siteName}
              onChange={(e) => setLocalSettings({ ...localSettings, siteName: e.target.value })}
              placeholder="MoviesArc"
            />
          </div>

          <div className="space-y-2">
            <Label>Support Email</Label>
            <Input
              type="email"
              value={localSettings.supportEmail}
              onChange={(e) => setLocalSettings({ ...localSettings, supportEmail: e.target.value })}
              placeholder="support@example.com"
            />
          </div>

          <div className="space-y-2 col-span-full">
            <Label>Site Description</Label>
            <Textarea
              value={localSettings.siteDescription}
              onChange={(e) => setLocalSettings({ ...localSettings, siteDescription: e.target.value })}
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
              checked={localSettings.enableRegistration}
              onCheckedChange={(checked) => setLocalSettings({ ...localSettings, enableRegistration: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <Label className="text-base">Premium Content</Label>
              <p className="text-sm text-muted-foreground">Enable premium subscription features</p>
            </div>
            <Switch
              checked={localSettings.enablePremiumContent}
              onCheckedChange={(checked) => setLocalSettings({ ...localSettings, enablePremiumContent: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <Label className="text-base">Advertisements</Label>
              <p className="text-sm text-muted-foreground">Show ads to free users</p>
            </div>
            <Switch
              checked={localSettings.enableAds}
              onCheckedChange={(checked) => setLocalSettings({ ...localSettings, enableAds: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <Label className="text-base">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Temporarily disable site access</p>
            </div>
            <Switch
              checked={localSettings.maintenanceMode}
              onCheckedChange={(checked) => setLocalSettings({ ...localSettings, maintenanceMode: checked })}
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Share2 className="h-5 w-5 text-primary" />
          <h3 className="font-display text-xl">Social Links</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input
              value={localSettings.instagram}
              onChange={(e) => setLocalSettings({ ...localSettings, instagram: e.target.value })}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input
              value={localSettings.linkedin}
              onChange={(e) => setLocalSettings({ ...localSettings, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div className="space-y-2">
            <Label>GitHub</Label>
            <Input
              value={localSettings.github}
              onChange={(e) => setLocalSettings({ ...localSettings, github: e.target.value })}
              placeholder="https://github.com/..."
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
              <p className="text-sm text-muted-foreground">{localSettings.supportEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
