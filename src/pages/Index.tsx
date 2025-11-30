import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryPills from "@/components/CategoryPills";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import {
  featuredMovie,
  trendingMovies,
  actionMovies,
  romanceMovies,
  thrillerMovies,
  comedyMovies,
  webSeries,
  premiumMovies,
} from "@/data/mockData";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>MoviesArc - Stream Movies & Web Series Online</title>
        <meta
          name="description"
          content="Watch unlimited movies and web series on MoviesArc. Stream the latest blockbusters, trending shows, and exclusive premium content."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection movie={featuredMovie} />
          <CategoryPills />
          
          <MovieRow
            title="🔥 Trending Now"
            movies={trendingMovies}
            showAll="/category/trending"
            size="large"
          />
          
          <MovieRow
            title="⭐ Premium Collection"
            movies={premiumMovies}
            showAll="/premium"
          />
          
          <MovieRow
            title="💥 Action & Adventure"
            movies={actionMovies}
            showAll="/category/action"
          />
          
          <MovieRow
            title="🎬 Thriller & Suspense"
            movies={thrillerMovies}
            showAll="/category/thriller"
          />
          
          <MovieRow
            title="💕 Romance"
            movies={romanceMovies}
            showAll="/category/romance"
          />
          
          <MovieRow
            title="😂 Comedy"
            movies={comedyMovies}
            showAll="/category/comedy"
          />
          
          <MovieRow
            title="📺 Web Series"
            movies={webSeries}
            showAll="/series"
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
