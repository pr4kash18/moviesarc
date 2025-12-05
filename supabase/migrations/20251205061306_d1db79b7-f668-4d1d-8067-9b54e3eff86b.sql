-- Make the movies bucket public for reading
UPDATE storage.buckets 
SET public = true 
WHERE id = 'movies';

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view movie files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload movie files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update movie files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete movie files" ON storage.objects;

-- Allow anyone to view files in the movies bucket
CREATE POLICY "Anyone can view movie files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'movies');

-- Allow admins to upload files
CREATE POLICY "Admins can upload movie files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'movies' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to update files
CREATE POLICY "Admins can update movie files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'movies' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admins to delete files
CREATE POLICY "Admins can delete movie files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'movies' 
  AND public.has_role(auth.uid(), 'admin')
);