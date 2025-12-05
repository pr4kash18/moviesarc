import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DatabaseMovie {
  id: string;
  title: string;
  description: string | null;
  poster_url: string | null;
  year: number | null;
  duration: string | null;
  rating: number | null;
  is_premium: boolean | null;
  is_trending: boolean | null;
  video_url: string | null;
  trailer_url: string | null;
  category_id: string | null;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  year: number;
  duration: string;
  rating: number;
  category: string[];
  isPremium: boolean;
  trailerUrl?: string;
  videoUrl?: string;
}

// Transform database movie to frontend movie format
export const transformMovie = (dbMovie: DatabaseMovie): Movie => ({
  id: dbMovie.id,
  title: dbMovie.title,
  description: dbMovie.description || "",
  poster: dbMovie.poster_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  backdrop: dbMovie.poster_url || "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop",
  year: dbMovie.year || new Date().getFullYear(),
  duration: dbMovie.duration || "N/A",
  rating: Number(dbMovie.rating) || 0,
  category: dbMovie.categories ? [dbMovie.categories.slug] : [],
  isPremium: dbMovie.is_premium || false,
  trailerUrl: dbMovie.trailer_url || undefined,
  videoUrl: dbMovie.video_url || undefined,
});

export const useAllMovies = () => {
  return useQuery({
    queryKey: ["movies", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select(`*, categories(id, name, slug)`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map(transformMovie);
    },
  });
};

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ["movies", "trending"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select(`*, categories(id, name, slug)`)
        .eq("is_trending", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map(transformMovie);
    },
  });
};

export const usePremiumMovies = () => {
  return useQuery({
    queryKey: ["movies", "premium"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select(`*, categories(id, name, slug)`)
        .eq("is_premium", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map(transformMovie);
    },
  });
};

export const useMoviesByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ["movies", "category", categorySlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select(`*, categories!inner(id, name, slug)`)
        .eq("categories.slug", categorySlug)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map(transformMovie);
    },
    enabled: !!categorySlug,
  });
};

export const useMovie = (id: string) => {
  return useQuery({
    queryKey: ["movies", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select(`*, categories(id, name, slug)`)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      return transformMovie(data);
    },
    enabled: !!id,
  });
};

export const useFeaturedMovie = () => {
  return useQuery({
    queryKey: ["movies", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select(`*, categories(id, name, slug)`)
        .eq("is_trending", true)
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        // Fallback to any movie if no trending
        const { data: anyMovie } = await supabase
          .from("movies")
          .select(`*, categories(id, name, slug)`)
          .limit(1)
          .maybeSingle();
        if (anyMovie) return transformMovie(anyMovie);
        return null;
      }
      return transformMovie(data);
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data || [];
    },
  });
};
