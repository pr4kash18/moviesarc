import { Helmet } from "react-helmet";
import { Check, Crown, Zap, Film, Shield, Star, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieRow from "@/components/MovieRow";
import { Button } from "@/components/ui/button";
import { usePremiumMovies } from "@/hooks/useMovies";

const Premium = () => {
  const { data: premiumMovies = [], isLoading } = usePremiumMovies();

  const features = [
    { icon: Film, text: "Unlimited access to all Premium content" },
    { icon: Zap, text: "Ad-free streaming experience" },
    { icon: Shield, text: "HD & 4K quality available" },
    { icon: Star, text: "Early access to new releases" },
  ];

  return (
    <>
      <Helmet>
        <title>Go Premium - MoviesArc</title>
        <meta
          name="description"
          content="Upgrade to MoviesArc Premium for unlimited ad-free streaming, exclusive content, and HD quality."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 hero-gradient opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1),transparent_70%)]" />
            
            <div className="relative container mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border border-yellow-500/30 rounded-full px-6 py-2 mb-6">
                <Crown className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-yellow-500">Premium Membership</span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl mb-6">
                Unlimited Entertainment
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Get access to exclusive premium content, ad-free streaming, and the best viewing experience.
              </p>

              {/* Pricing Card */}
              <div className="max-w-md mx-auto">
                <div className="relative bg-gradient-to-b from-card to-background border border-border rounded-2xl p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-600" />
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold">$1.11</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cancel anytime. No commitments.
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8 text-left">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <feature.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="premium" size="xl" className="w-full gap-2">
                    <Crown className="h-5 w-5" />
                    Subscribe Now
                  </Button>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Secure payment powered by Razorpay
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-card/50">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
                Why Go Premium?
              </h2>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl mb-2">No Ads</h3>
                  <p className="text-sm text-muted-foreground">
                    Enjoy uninterrupted streaming without any advertisements
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Film className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl mb-2">Exclusive Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Access premium-only movies and web series
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl mb-2">HD Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Stream in HD and 4K for the best experience
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Premium Content Preview */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : premiumMovies.length > 0 ? (
            <MovieRow
              title="Premium Content"
              movies={premiumMovies}
              size="large"
            />
          ) : (
            <section className="py-12">
              <div className="container mx-auto px-4 text-center">
                <Film className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No premium content available yet.</p>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Premium;
