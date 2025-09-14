import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://ifnpvaatswduxxtaymtp.supabase.co';

const supabaseKEY = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseURL, supabaseKEY)

