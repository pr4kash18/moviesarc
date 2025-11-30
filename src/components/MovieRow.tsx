import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Movie } from "@/types/movie";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  showAll?: string;
  size?: "small" | "medium" | "large";
}

const MovieRow = ({ title, movies, showAll, size = "medium" }: MovieRowProps) => {
  if (movies.length === 0) return null;

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl md:text-2xl tracking-wide">{title}</h2>
          {showAll && (
            <Link
              to={showAll}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              See All
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="scroll-container">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <MovieCard movie={movie} size={size} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;
