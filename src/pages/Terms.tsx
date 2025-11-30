import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - MoviesArc</title>
        <meta
          name="description"
          content="Read MoviesArc's terms of service to understand the rules and guidelines for using our platform."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-invert">
              <h1 className="font-display text-5xl mb-8">Terms of Service</h1>
              <p className="text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="font-display text-2xl mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using MoviesArc, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl mb-4">2. Subscription and Payment</h2>
                <p className="text-muted-foreground mb-4">
                  Some content on MoviesArc requires a premium subscription. By subscribing, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Pay the subscription fee as specified</li>
                  <li>Automatic renewal unless cancelled</li>
                  <li>Non-refundable payments except as required by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl mb-4">3. User Conduct</h2>
                <p className="text-muted-foreground mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Share your account credentials with others</li>
                  <li>Download or redistribute content</li>
                  <li>Use VPNs to bypass geographic restrictions</li>
                  <li>Attempt to circumvent our security measures</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl mb-4">4. Content Availability</h2>
                <p className="text-muted-foreground">
                  Content available on MoviesArc may change from time to time. We do not guarantee that any particular content will be available at all times.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl mb-4">5. Termination</h2>
                <p className="text-muted-foreground">
                  We reserve the right to terminate or suspend your account at any time for violations of these terms or for any other reason at our discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl mb-4">6. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms, please contact us at legal@moviesarc.com.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Terms;
