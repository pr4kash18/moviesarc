import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryPills from "@/components/CategoryPills";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import {
  useAllMovies,
  useTrendingMovies,
  usePremiumMovies,
  useFeaturedMovie,
  useCategories,
} from "@/hooks/useMovies";
import { featuredMovie as mockFeatured } from "@/data/mockData";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: allMovies = [], isLoading: loadingAll } = useAllMovies();
  const { data: trendingMovies = [] } = useTrendingMovies();
  const { data: premiumMovies = [] } = usePremiumMovies();
  const { data: featuredMovie } = useFeaturedMovie();
  const { data: categories = [] } = useCategories();

  // Filter movies by category
  const getMoviesByCategory = (slug: string) => {
    return allMovies.filter((m) => m.category.includes(slug));
  };

  const actionMovies = getMoviesByCategory("action");
  const thrillerMovies = getMoviesByCategory("thriller");
  const romanceMovies = getMoviesByCategory("romance");
  const comedyMovies = getMoviesByCategory("comedy");
  const horrorMovies = getMoviesByCategory("horror");
  const webSeries = getMoviesByCategory("web-series");
  const hindiMovies = getMoviesByCategory("hindi");
  const englishMovies = getMoviesByCategory("english");

  // Use featured from DB or fallback to mock
  const heroMovie = featuredMovie || mockFeatured;

  if (loadingAll) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
          <HeroSection movie={heroMovie} />
          <CategoryPills />

          {trendingMovies.length > 0 && (
            <MovieRow
              title="🔥 Trending Now"
              movies={trendingMovies}
              showAll="/category/trending"
              size="large"
            />
          )}

          {premiumMovies.length > 0 && (
            <MovieRow
              title="⭐ Premium Collection"
              movies={premiumMovies}
              showAll="/premium"
            />
          )}

          {allMovies.length > 0 && (
            <MovieRow
              title="🎬 Latest Uploads"
              movies={allMovies.slice(0, 10)}
              showAll="/category/all"
            />
          )}

          {actionMovies.length > 0 && (
            <MovieRow
              title="💥 Action & Adventure"
              movies={actionMovies}
              showAll="/category/action"
            />
          )}

          {thrillerMovies.length > 0 && (
            <MovieRow
              title="🎬 Thriller & Suspense"
              movies={thrillerMovies}
              showAll="/category/thriller"
            />
          )}

          {romanceMovies.length > 0 && (
            <MovieRow
              title="💕 Romance"
              movies={romanceMovies}
              showAll="/category/romance"
            />
          )}

          {comedyMovies.length > 0 && (
            <MovieRow
              title="😂 Comedy"
              movies={comedyMovies}
              showAll="/category/comedy"
            />
          )}

          {horrorMovies.length > 0 && (
            <MovieRow
              title="👻 Horror"
              movies={horrorMovies}
              showAll="/category/horror"
            />
          )}

          {hindiMovies.length > 0 && (
            <MovieRow
              title="🇮🇳 Hindi Movies"
              movies={hindiMovies}
              showAll="/category/hindi"
            />
          )}

          {englishMovies.length > 0 && (
            <MovieRow
              title="🌍 English Movies"
              movies={englishMovies}
              showAll="/category/english"
            />
          )}

          {webSeries.length > 0 && (
            <MovieRow
              title="📺 Web Series"
              movies={webSeries}
              showAll="/series"
            />
          )}

          {/* Show message if no movies */}
          {allMovies.length === 0 && (
            <div className="px-6 py-20 text-center">
              <p className="text-muted-foreground text-lg">
                No movies available yet. Check back soon!
              </p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
