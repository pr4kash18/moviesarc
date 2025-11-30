import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { 
  Film, Users, CreditCard, BarChart3, Settings, 
  Plus, Search, Trash2, Edit, Eye, LogOut, Loader2,
  TrendingUp, DollarSign, Crown, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type TabType = "dashboard" | "movies" | "users" | "ads" | "payments" | "settings";

interface Movie {
  id: string;
  title: string;
  year: number | null;
  rating: number | null;
  is_premium: boolean;
  is_trending: boolean;
  created_at: string;
}

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  is_premium: boolean | null;
  created_at: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/login");
      } else if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate("/");
      } else {
        fetchData();
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [moviesRes, usersRes] = await Promise.all([
        supabase.from("movies").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      ]);

      if (moviesRes.data) setMovies(moviesRes.data);
      if (usersRes.data) setUsers(usersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const handleDeleteMovie = async (id: string) => {
    const { error } = await supabase.from("movies").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete movie.", variant: "destructive" });
    } else {
      setMovies(movies.filter((m) => m.id !== id));
      toast({ title: "Success", description: "Movie deleted successfully." });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = {
    totalMovies: movies.length,
    premiumMovies: movies.filter((m) => m.is_premium).length,
    totalUsers: users.length,
    premiumUsers: users.filter((u) => u.is_premium).length,
  };

  const sidebarItems = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: BarChart3 },
    { id: "movies" as TabType, label: "Movies", icon: Film },
    { id: "users" as TabType, label: "Users", icon: Users },
    { id: "ads" as TabType, label: "Ads", icon: Play },
    { id: "payments" as TabType, label: "Payments", icon: CreditCard },
    { id: "settings" as TabType, label: "Settings", icon: Settings },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - MoviesArc</title>
      </Helmet>

      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h1 className="font-display text-2xl text-primary">MOVIESARC</h1>
            <p className="text-sm text-muted-foreground">Admin Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <h2 className="font-display text-3xl">Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Movies</p>
                      <p className="text-3xl font-bold">{stats.totalMovies}</p>
                    </div>
                    <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Film className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Premium Content</p>
                      <p className="text-3xl font-bold">{stats.premiumMovies}</p>
                    </div>
                    <div className="h-12 w-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Crown className="h-6 w-6 text-yellow-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-3xl font-bold">{stats.totalUsers}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Premium Users</p>
                      <p className="text-3xl font-bold">{stats.premiumUsers}</p>
                    </div>
                    <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "movies" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-3xl">Movies</h2>
                <Button variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Movie
                </Button>
              </div>

              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Title</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Year</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Rating</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {movies
                      .filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((movie) => (
                        <tr key={movie.id} className="hover:bg-secondary/50">
                          <td className="px-6 py-4">{movie.title}</td>
                          <td className="px-6 py-4">{movie.year || "N/A"}</td>
                          <td className="px-6 py-4">{movie.rating || "N/A"}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                movie.is_premium
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-green-500/20 text-green-500"
                              }`}
                            >
                              {movie.is_premium ? "Premium" : "Free"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteMovie(movie.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {movies.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          No movies found. Add your first movie!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl">Users</h2>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Email</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((profile) => (
                      <tr key={profile.id} className="hover:bg-secondary/50">
                        <td className="px-6 py-4">{profile.email || "N/A"}</td>
                        <td className="px-6 py-4">{profile.full_name || "N/A"}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              profile.is_premium
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-blue-500/20 text-blue-500"
                            }`}
                          >
                            {profile.is_premium ? "Premium" : "Free"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "ads" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-3xl">Ads Management</h2>
                <Button variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Ad
                </Button>
              </div>
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No ads configured yet.</p>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl">Payments</h2>
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No payment records yet.</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl">Settings</h2>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <p className="text-muted-foreground">Admin settings will be available here.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Admin;
