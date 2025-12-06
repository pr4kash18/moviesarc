import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { useMoviesByCategory } from "@/hooks/useMovies";
import { Loader2, Tv } from "lucide-react";

const Series = () => {
  const { data: series = [], isLoading } = useMoviesByCategory("web-series");

  return (
    <>
      <Helmet>
        <title>Web Series - MoviesArc</title>
        <meta name="description" content="Browse all web series on MoviesArc. Find your next binge-worthy series." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-display text-5xl mb-4">Web Series</h1>
              <p className="text-muted-foreground">Browse our collection of web series</p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : series.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {series.map((show) => (
                  <MovieCard key={show.id} movie={show} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Tv className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">No web series available yet.</p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Series;
