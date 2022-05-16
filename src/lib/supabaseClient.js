import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const auth = supabase.auth;
export const storage = supabase.storage

export const from = (table) => supabase.from(table)
export const fromBucket = (bucket) => supabase.storage.from(bucket)
