import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { useAllMovies } from "@/hooks/useMovies";
import { Loader2, Film } from "lucide-react";

const Movies = () => {
  const { data: movies = [], isLoading } = useAllMovies();

  // Filter only movies (not web series) - category is string[] or string
  const moviesList = movies.filter(m => {
    const cats = Array.isArray(m.category) ? m.category : [m.category];
    return !cats.some(c => c?.toLowerCase().includes('series'));
  });

  return (
    <>
      <Helmet>
        <title>Movies - MoviesArc</title>
        <meta name="description" content="Browse all movies on MoviesArc. Find your next favorite movie to watch." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-display text-5xl mb-4">All Movies</h1>
              <p className="text-muted-foreground">Browse our complete collection of movies</p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : moviesList.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {moviesList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Film className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">No movies available yet.</p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Movies;
