-- Create function to update timestamps if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create site_settings table to store global settings
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view settings (for public display)
CREATE POLICY "Anyone can view settings" 
ON public.site_settings 
FOR SELECT 
USING (true);

-- Only admins can manage settings
CREATE POLICY "Admins can manage settings" 
ON public.site_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.site_settings (key, value) VALUES
('siteName', 'MoviesArc'),
('siteDescription', 'Your ultimate destination for movies and web series'),
('supportEmail', 'cpr4kash18@gmail.com'),
('enableRegistration', 'true'),
('enablePremiumContent', 'true'),
('enableAds', 'true'),
('maintenanceMode', 'false'),
('instagram', ''),
('linkedin', ''),
('github', '');