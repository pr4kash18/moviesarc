import { useState } from "react";
import { Helmet } from "react-helmet";
import { Mail, MessageSquare, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - MoviesArc</title>
        <meta
          name="description"
          content="Get in touch with the MoviesArc team. We're here to help with any questions or feedback."
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
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <Mail className="h-8 w-8 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-muted-foreground text-sm">support@moviesarc.com</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <MessageSquare className="h-8 w-8 mx-auto text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-muted-foreground text-sm">Available 24/7</p>
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

export default Contact;
