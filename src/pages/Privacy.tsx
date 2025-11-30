import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - MoviesArc</title>
        <meta
          name="description"
          content="Read MoviesArc's privacy policy to understand how we collect, use, and protect your data."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-invert">
              <h1 className="font-display text-5xl mb-8">Privacy Policy</h1>
              <p className="text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="font-display text-2xl mb-4">Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect information you provide directly to us, such as when you create an account, subscribe to our service, or contact us for support.
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Account information (name, email, password)</li>
                  <li>Payment information</li>
                  <li>Viewing history and preferences</li>
                  <li>Device and usage information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect to provide, maintain, and improve our services, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Processing your subscription and payments</li>
                  <li>Personalizing your content recommendations</li>
                  <li>Sending you updates and promotional content</li>
                  <li>Improving our platform and user experience</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-2xl mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at privacy@moviesarc.com.
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

export default Privacy;
