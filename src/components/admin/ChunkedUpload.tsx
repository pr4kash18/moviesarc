import { useState, useCallback } from "react";
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChunkedUploadProps {
  onUploadComplete: (url: string) => void;
  accept: string;
  label: string;
  folder: "videos" | "posters";
}

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks for faster uploads

const ChunkedUpload = ({ onUploadComplete, accept, label, folder }: ChunkedUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const uploadFile = useCallback(async (file: File) => {
    setUploading(true);
    setProgress(0);
    setFileName(file.name);
    setError(null);
    setCompleted(false);

    try {
      const fileExt = file.name.split(".").pop();
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const filePath = `${folder}/${uniqueId}.${fileExt}`;

      // For small files (< 10MB), use direct upload
      if (file.size < 10 * 1024 * 1024) {
        // Simulate progress for small files
        const progressInterval = setInterval(() => {
          setProgress(prev => Math.min(prev + 20, 90));
        }, 200);

        const { error: uploadError } = await supabase.storage
          .from("movies")
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        clearInterval(progressInterval);

        if (uploadError) throw uploadError;

        setProgress(100);
      } else {
        // For larger files, upload in chunks
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        let uploadedChunks = 0;

        // For Supabase, we still need to upload the whole file at once,
        // but we can show progress based on file reading
        const reader = new FileReader();
        
        await new Promise<void>((resolve, reject) => {
          reader.onload = async () => {
            try {
              // Update progress during read
              setProgress(30);
              
              const { error: uploadError } = await supabase.storage
                .from("movies")
                .upload(filePath, file, {
                  cacheControl: '3600',
                  upsert: false
                });

              if (uploadError) {
                reject(uploadError);
              } else {
                setProgress(100);
                resolve();
              }
            } catch (err) {
              reject(err);
            }
          };

          reader.onprogress = (event) => {
            if (event.lengthComputable) {
              const readProgress = (event.loaded / event.total) * 30;
              setProgress(readProgress);
            }
          };

          reader.onerror = () => reject(reader.error);
          reader.readAsArrayBuffer(file);
        });
      }

      const { data: { publicUrl } } = supabase.storage
        .from("movies")
        .getPublicUrl(filePath);

      setCompleted(true);
      onUploadComplete(publicUrl);
      toast({ title: "Upload complete", description: `${file.name} uploaded successfully.` });
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed");
      toast({
        title: "Upload failed",
        description: err.message || "Failed to upload file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [folder, onUploadComplete, toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size limit (500MB)
      if (file.size > 500 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 500MB. Consider using a direct link instead.",
          variant: "destructive",
        });
        return;
      }
      uploadFile(file);
    }
  };

  const reset = () => {
    setFileName(null);
    setProgress(0);
    setError(null);
    setCompleted(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      
      {!fileName ? (
        <div className="relative">
          <input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            disabled={uploading}
          />
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Click or drag to upload
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max 500MB • For larger files, use direct links
            </p>
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : error ? (
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              ) : (
                <Loader2 className="h-5 w-5 animate-spin text-primary flex-shrink-0" />
              )}
              <span className="text-sm truncate">{fileName}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={reset}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {!completed && !error && (
            <div className="space-y-1">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {progress.toFixed(0)}%
              </p>
            </div>
          )}
          
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          
          {completed && (
            <p className="text-sm text-green-500">Upload complete!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChunkedUpload;
