-- Create event_images table to store images associated with events
CREATE TABLE IF NOT EXISTS event_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Create index for faster queries by event_id
CREATE INDEX IF NOT EXISTS idx_event_images_event_id ON event_images(event_id);

-- Add RLS policies
ALTER TABLE event_images ENABLE ROW LEVEL SECURITY;

-- Policy for selecting images (anyone can view)
CREATE POLICY "Anyone can view event images" 
ON event_images FOR SELECT 
USING (true);

-- Policy for inserting images (authenticated users only)
CREATE POLICY "Authenticated users can upload event images" 
ON event_images FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Policy for deleting images (only event organizers or admins)
CREATE POLICY "Event organizers can delete event images" 
ON event_images FOR DELETE 
USING (
  auth.uid() IN (
    SELECT organizer_id FROM events WHERE id = event_id
  ) OR 
  auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  )
);