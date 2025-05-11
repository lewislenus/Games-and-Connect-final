import { supabase } from "../supabase";
import { Provider } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: hashedPassword,
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

      // Log successful login attempt
      await supabase.from("login_attempts").insert([
        {
          user_id: data.user.id,
          success: true,
          timestamp: new Date().toISOString(),
          ip_address: "{{request.ip}}", // Placeholder for actual IP
        },
      ]);
    }

    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    // Log sign out attempt
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("login_attempts").insert([
        {
          user_id: user.id,
          success: false,
          timestamp: new Date().toISOString(),
          ip_address: "{{request.ip}}", // Placeholder for actual IP
        },
      ]);
    }

    return { error };
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) throw error;

    // Log password reset attempt
    await supabase.from("login_attempts").insert([
      {
        email,
        success: true,
        timestamp: new Date().toISOString(),
        ip_address: "{{request.ip}}", // Placeholder for actual IP
      },
    ]);

    return { error };
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
