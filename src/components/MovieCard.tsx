import { Link } from "react-router-dom";
import { Play, Crown, Star } from "lucide-react";
import { Movie } from "@/types/movie";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  size?: "small" | "medium" | "large";
}

const MovieCard = ({ movie, size = "medium" }: MovieCardProps) => {
  const sizeClasses = {
    small: "w-32 md:w-40",
    medium: "w-40 md:w-52",
    large: "w-48 md:w-64",
  };

  return (
    <Link to={`/movie/${movie.id}`} className={cn("movie-card flex-shrink-0", sizeClasses[size])}>
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden group">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Play className="h-4 w-4 text-primary fill-primary" />
              <span className="text-xs font-medium">{movie.duration}</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {movie.description}
            </p>
          </div>
        </div>

        {/* Premium Badge */}
        {movie.isPremium && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full p-1.5">
            <Crown className="h-3 w-3 text-background" />
          </div>
        )}

        {/* Rating */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-semibold">{movie.rating}</span>
        </div>
      </div>

      {/* Title */}
      <div className="mt-2 px-1">
        <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
        <p className="text-xs text-muted-foreground">{movie.year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
