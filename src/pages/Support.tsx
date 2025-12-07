import { Helmet } from "react-helmet";
import { MessageCircle, Mail, Clock, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Link } from "react-router-dom";

const Support = () => {
  const { settings } = useSiteSettings();

  return (
    <>
      <Helmet>
        <title>Support - {settings.siteName}</title>
        <meta
          name="description"
          content={`Get help and support for ${settings.siteName}. Contact our team for assistance.`}
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="font-display text-4xl md:text-5xl mb-4">
                How can we help?
              </h1>
              <p className="text-muted-foreground text-lg">
                We're here to help you with any questions or issues you may have.
              </p>
            </div>

            {/* Support Options */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <a
                  href={`mailto:${settings.supportEmail}`}
                  className="text-primary hover:underline"
                >
                  {settings.supportEmail}
                </a>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl mb-2">Contact Form</h3>
                <p className="text-muted-foreground mb-4">
                  Fill out our contact form for detailed inquiries.
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="sm">
                    Go to Contact Page
                  </Button>
                </Link>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl mb-2">Response Time</h3>
                <p className="text-muted-foreground">
                  We typically respond within 24-48 hours during business days.
                  Premium members get priority support.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl mb-2">FAQ</h3>
                <p className="text-muted-foreground mb-4">
                  Find answers to commonly asked questions.
                </p>
                <Link to="/about">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Common Issues */}
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl mb-6 text-center">Common Issues</h2>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Video not playing?</h4>
                  <p className="text-sm text-muted-foreground">
                    Try refreshing the page or clearing your browser cache. If the issue persists, check your internet connection.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Can't access premium content?</h4>
                  <p className="text-sm text-muted-foreground">
                    Make sure you're logged in and have an active premium subscription. Contact us if the issue persists.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Account issues?</h4>
                  <p className="text-sm text-muted-foreground">
                    For password resets or account-related queries, please use the contact form or email us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Support;
