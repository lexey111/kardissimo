import {useMemo} from 'react';
import {getSupabaseClient} from "./supabase.ts";

function useSupabase() {
	return useMemo(getSupabaseClient, []);
}

export default useSupabase;
