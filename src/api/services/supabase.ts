import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "your-supabase-url";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const registerEvent = async (eventData: Record<string, any>) => {
  try {
    const { data, error } = await supabase
      .from("event_registrations")
      .insert([eventData]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error registering event:", error);
    throw error;
  }
};

export const registerVolunteer = async (volunteerData: Record<string, any>) => {
  try {
    const { data, error } = await supabase
      .from("volunteer_registrations")
      .insert([volunteerData]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error registering volunteer:", error);
    throw error;
  }
};
