import { supabase } from "../supabase";
import { Provider } from "@supabase/supabase-js";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export const authService = {
  async signUp(email: string, password: string, username: string) {
    // Check if the email domain is allowed for admin signup
    if (!email.endsWith("@admin.gamesandconnect.com")) {
      throw new Error("Only authorized admin emails are allowed to sign up.");
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Create profile after successful signup with admin role
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          username,
          full_name: username,
          role: "admin",
        },
      ]);

      if (profileError) throw profileError;
    }

    return authData;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Check if the user has admin role
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile?.role !== "admin") {
        await supabase.auth.signOut();
        throw new Error("Access denied. Only administrators can log in.");
      }
    }

    return { data, error };
  },

  async signInWithGoogle() {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  async getProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("No user logged in");

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(updates: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  }) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("No user logged in");

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
