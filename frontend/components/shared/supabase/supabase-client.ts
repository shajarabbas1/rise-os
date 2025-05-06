// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // For public URL
// const { data } = supabase.storage
//   .from('your-bucket-name')
//   .getPublicUrl('uploads/filename.jpg')

// // For signed URL
// const { data, error } = await supabase.storage
//   .from('your-bucket-name')
//   .createSignedUrl('uploads/filename.jpg', 60) // 60 seconds
