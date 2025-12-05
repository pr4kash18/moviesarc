import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Play, Plus, Share2, Star, Clock, Calendar, Crown, ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieRow from "@/components/MovieRow";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useMovie, useAllMovies, useTrendingMovies } from "@/hooks/useMovies";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  const { data: movie, isLoading: movieLoading } = useMovie(id || "");
  const { data: allMovies = [] } = useAllMovies();
  const { data: trendingMovies = [] } = useTrendingMovies();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || movieLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Movie Not Found</h1>
          <Link to="/">
            <Button variant="default">Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const similarMovies = allMovies.filter(
    (m) => m.id !== movie.id && m.category.some((c) => movie.category.includes(c))
  ).slice(0, 10);

  return (
    <>
      <Helmet>
        <title>{movie.title} - Watch on MoviesArc</title>
        <meta name="description" content={movie.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[70vh] md:h-[80vh]">
          <div className="absolute inset-0">
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          </div>

          <div className="relative h-full container mx-auto px-4 flex items-end pb-16">
            <div className="flex flex-col md:flex-row gap-8 w-full">
              {/* Poster */}
              <div className="hidden md:block flex-shrink-0 w-64 -mb-32 z-10">
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                  {movie.isPremium && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full p-2">
                      <Crown className="h-4 w-4 text-background" />
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 slide-up">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>

                {movie.isPremium && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-4">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-500">Premium Content</span>
                  </div>
                )}

                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-shadow mb-4">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-foreground font-semibold">{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{movie.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-secondary rounded-full text-xs font-medium capitalize"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground max-w-2xl mb-8">
                  {movie.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  {movie.isPremium ? (
                    <Link to="/premium">
                      <Button variant="premium" size="xl" className="gap-2">
                        <Crown className="h-5 w-5" />
                        Subscribe to Watch
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="hero" size="xl" className="gap-2">
                      <Play className="h-5 w-5 fill-current" />
                      Watch Now
                    </Button>
                  )}
                  <Button variant="glass" size="xl" className="gap-2">
                    <Plus className="h-5 w-5" />
                    My List
                  </Button>
                  <Button variant="ghost" size="icon" className="h-14 w-14">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Movies */}
        <section className="pt-24 md:pt-16">
          {similarMovies.length > 0 && (
            <MovieRow
              title="You May Also Like"
              movies={similarMovies}
            />
          )}
          {trendingMovies.length > 0 && (
            <MovieRow
              title="Trending Now"
              movies={trendingMovies}
            />
          )}
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MovieDetails;
