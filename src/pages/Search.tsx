import { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Search as SearchIcon, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { Input } from "@/components/ui/input";
import { movies, categories } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Search = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredMovies = useMemo(() => {
    let results = movies;

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        (movie) =>
          movie.title.toLowerCase().includes(lowerQuery) ||
          movie.description.toLowerCase().includes(lowerQuery)
      );
    }

    if (activeCategory) {
      results = results.filter((movie) =>
        movie.category.includes(activeCategory)
      );
    }

    return results;
  }, [query, activeCategory]);

  return (
    <>
      <Helmet>
        <title>Search Movies & Series - MoviesArc</title>
        <meta
          name="description"
          content="Search for your favorite movies and web series on MoviesArc."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Search Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl mb-4">
                Search MoviesArc
              </h1>
              <p className="text-muted-foreground mb-8">
                Find your favorite movies and web series
              </p>

              {/* Search Input */}
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for movies, series, genres..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 pr-12 h-14 text-lg bg-card border-border focus:border-primary"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "category-pill",
                  !activeCategory && "active"
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.slug)}
                  className={cn(
                    "category-pill",
                    activeCategory === category.slug && "active"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Results */}
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {filteredMovies.map((movie, index) => (
                  <div
                    key={movie.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="font-display text-2xl mb-2">No Results Found</h2>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Search;
