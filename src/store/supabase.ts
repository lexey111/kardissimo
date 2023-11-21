// Create a single supabase client for interacting with your database
import {createClient} from "@supabase/supabase-js";

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_APP,
	import.meta.env.VITE_SUPABASE_KEY
);
