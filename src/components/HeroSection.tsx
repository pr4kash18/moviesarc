import { Play, Info, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie";

interface HeroSectionProps {
  movie: Movie;
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl slide-up">
          {/* Premium Badge */}
          {movie.isPremium && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-4">
              <Crown className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-500">Premium</span>
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-shadow mb-4">
            {movie.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="text-primary font-semibold">{movie.rating}/10</span>
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
            <span className="capitalize">{movie.category[0]}</span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-base md:text-lg mb-8 line-clamp-3">
            {movie.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Link to={`/movie/${movie.id}`}>
              <Button variant="hero" size="xl" className="gap-2">
                <Play className="h-5 w-5 fill-current" />
                Watch Now
              </Button>
            </Link>
            <Link to={`/movie/${movie.id}`}>
              <Button variant="glass" size="xl" className="gap-2">
                <Info className="h-5 w-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
