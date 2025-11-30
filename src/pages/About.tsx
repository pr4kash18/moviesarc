import { Helmet } from "react-helmet";
import { Film, Users, Globe, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const stats = [
    { icon: Film, value: "10,000+", label: "Movies & Shows" },
    { icon: Users, value: "1M+", label: "Happy Users" },
    { icon: Globe, value: "50+", label: "Countries" },
    { icon: Award, value: "99.9%", label: "Uptime" },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - MoviesArc</title>
        <meta
          name="description"
          content="Learn about MoviesArc, your ultimate destination for streaming movies and web series."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="font-display text-5xl md:text-6xl mb-6">
                About MoviesArc
              </h1>
              <p className="text-xl text-muted-foreground">
                Your ultimate destination for movies and web series. We're passionate about bringing the best entertainment directly to you.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="h-8 w-8 mx-auto text-primary mb-3" />
                  <div className="font-display text-3xl mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Mission */}
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At MoviesArc, we believe everyone deserves access to great entertainment. Our mission is to create a platform that makes discovering and watching movies and web series an enjoyable, seamless experience.
              </p>
              <p className="text-muted-foreground mb-6">
                We curate the best content from around the world, bringing you everything from blockbuster hits to hidden gems. Whether you're in the mood for action, romance, comedy, or thriller, MoviesArc has something for everyone.
              </p>
              <p className="text-muted-foreground">
                Our team is dedicated to continuously improving the platform, adding new features, and expanding our library to ensure you always have fresh content to explore.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
