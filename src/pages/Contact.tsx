import { useState } from "react";
import { Helmet } from "react-helmet";
import { Mail, MessageSquare, Send, Loader2, Instagram, Linkedin, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { settings } = useSiteSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, message },
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - {settings.siteName}</title>
        <meta
          name="description"
          content={`Get in touch with the ${settings.siteName} team. We're here to help with any questions or feedback.`}
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="font-display text-5xl mb-4">Contact Us</h1>
                <p className="text-muted-foreground">
                  Have questions or feedback? We'd love to hear from you.
                </p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 bg-secondary"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-secondary"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[150px] bg-secondary"
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full gap-2" disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <Mail className="h-8 w-8 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <a 
                    href={`mailto:${settings.supportEmail}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {settings.supportEmail}
                  </a>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-muted-foreground text-sm">Available 24/7</p>
                </div>
              </div>

              {/* Social Links */}
              {(settings.instagram || settings.linkedin || settings.github) && (
                <div className="mt-12 text-center">
                  <h3 className="font-semibold mb-4">Follow Us</h3>
                  <div className="flex items-center justify-center gap-6">
                    {settings.instagram && (
                      <a
                        href={settings.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Instagram className="h-6 w-6" />
                        <span>Instagram</span>
                      </a>
                    )}
                    {settings.linkedin && (
                      <a
                        href={settings.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-6 w-6" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {settings.github && (
                      <a
                        href={settings.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="h-6 w-6" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
