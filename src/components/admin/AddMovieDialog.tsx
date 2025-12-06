import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Link, HardDrive, FileUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ChunkedUpload from "./ChunkedUpload";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const movieSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(2000).optional(),
  year: z.coerce.number().min(1900).max(new Date().getFullYear() + 5).optional(),
  duration: z.string().max(50).optional(),
  rating: z.coerce.number().min(0).max(10).optional(),
  category_id: z.string().min(1, "Please select a category"),
  is_premium: z.boolean().default(false),
  is_trending: z.boolean().default(false),
  video_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  trailer_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  poster_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type MovieFormData = z.infer<typeof movieSchema>;

interface AddMovieDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

type UploadSource = "link" | "gdrive" | "local";

const AddMovieDialog = ({ open, onOpenChange, onSuccess }: AddMovieDialogProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadSource, setUploadSource] = useState<UploadSource>("link");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const form = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      description: "",
      year: undefined,
      duration: "",
      rating: undefined,
      category_id: "",
      is_premium: false,
      is_trending: false,
      video_url: "",
      trailer_url: "",
      poster_url: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleFileUpload = async (file: File, field: "video_url" | "poster_url" | "trailer_url") => {
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${field === "poster_url" ? "posters" : "videos"}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("movies")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("movies")
        .getPublicUrl(filePath);

      form.setValue(field, publicUrl);
      toast({ title: "Upload successful", description: "File uploaded successfully." });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: MovieFormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("movies").insert({
        title: data.title,
        description: data.description || null,
        year: data.year || null,
        duration: data.duration || null,
        rating: data.rating || null,
        category_id: data.category_id,
        is_premium: data.is_premium,
        is_trending: data.is_trending,
        video_url: data.video_url || null,
        trailer_url: data.trailer_url || null,
        poster_url: data.poster_url || null,
      });

      if (error) throw error;

      toast({ title: "Success", description: "Movie added successfully!" });
      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add movie.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Add New Movie</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter movie title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter movie description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2024"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="2h 30m" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (0-10)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        placeholder="8.5"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card border-border z-50">
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status Toggles */}
            <div className="flex flex-wrap gap-6 p-4 bg-secondary/50 rounded-lg">
              <FormField
                control={form.control}
                name="is_premium"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label className="cursor-pointer">Premium Movie</Label>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_trending"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label className="cursor-pointer">Trending</Label>
                  </FormItem>
                )}
              />
            </div>

            {/* Upload Source Selection */}
            <div className="space-y-4">
              <Label>Video Source</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={uploadSource === "link" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUploadSource("link")}
                >
                  <Link className="h-4 w-4 mr-2" />
                  Direct Link
                </Button>
                <Button
                  type="button"
                  variant={uploadSource === "gdrive" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUploadSource("gdrive")}
                >
                  <HardDrive className="h-4 w-4 mr-2" />
                  Google Drive
                </Button>
                <Button
                  type="button"
                  variant={uploadSource === "local" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUploadSource("local")}
                >
                  <FileUp className="h-4 w-4 mr-2" />
                  Local Upload
                </Button>
              </div>
            </div>

            {/* Video URL Fields */}
            <div className="space-y-4">
              {uploadSource === "link" && (
                <>
                  <FormField
                    control={form.control}
                    name="video_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/movie.mp4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="trailer_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trailer URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {uploadSource === "gdrive" && (
                <>
                  <FormField
                    control={form.control}
                    name="video_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Drive Video Link</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://drive.google.com/file/d/..." 
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Make sure the file is shared publicly or "Anyone with link"
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="trailer_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trailer Link (Google Drive or YouTube)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://drive.google.com/file/d/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {uploadSource === "local" && (
                <div className="space-y-4">
                  <ChunkedUpload
                    label="Upload Video File"
                    accept="video/*"
                    folder="videos"
                    onUploadComplete={(url) => form.setValue("video_url", url)}
                  />
                  <ChunkedUpload
                    label="Upload Trailer File"
                    accept="video/*"
                    folder="videos"
                    onUploadComplete={(url) => form.setValue("trailer_url", url)}
                  />
                </div>
              )}
            </div>

            {/* Poster URL */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="poster_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poster Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/poster.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ChunkedUpload
                label="Or Upload Poster"
                accept="image/*"
                folder="posters"
                onUploadComplete={(url) => form.setValue("poster_url", url)}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading || uploading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Add Movie
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;
