import {useMemo} from 'react';
import {getSupabaseClient} from "../../store/supabase.ts";

function useSupabase() {
	return useMemo(getSupabaseClient, []);
}

export default useSupabase;
