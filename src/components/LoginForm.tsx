import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../api/services/authService";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Added username state
  const [username, setUsername] = useState("");

  // Validation functions
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "Invalid email format";
    if (!email.endsWith("@admin.gamesandconnect.com")) {
      return "Only authorized admin emails allowed";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Password needs one uppercase letter";
    if (!/[0-9]/.test(password)) return "Password needs one number";
    return "";
  };

  // Updated handleSubmit with validation
  const handleSubmit = async (e: React.FormEvent, isSignUp = false) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = isSignUp
        ? await signUp(email, password, username) // Added username
        : await signIn(email, password);

      // If there's an error from Supabase, throw it to be caught below.
      if ('error' in result && result.error) {
        throw result?.error; // Throw the original AuthError with optional chaining
      }

      // If no error, assume success
      setEmail("");
      setPassword("");
      setError("");
    } catch (err: any) {
      // Catch AuthError or other errors
      let errorMessage = "An unexpected error occurred."; // Default

      // Check if it's an AuthError from Supabase or similar error with a message
      if (err?.message) {
        errorMessage = err.message;

        // Refine error messages based on context (sign up/sign in) and content
        if (isSignUp) {
          if (
            errorMessage.includes("already exists") ||
            errorMessage.includes("unique constraint")
          ) {
            // Check for common sign-up errors
            errorMessage = "Email already registered.";
          }
        } else {
          // Sign In
          if (errorMessage.includes("Invalid login credentials")) {
            errorMessage = "Invalid email or password.";
          }
        }
        // General check (could apply to both)
        if (errorMessage.includes("admin")) {
          // This check might be redundant if email validation catches it first
          errorMessage = "Only authorized admin emails are allowed.";
        }
      } else if (typeof err === "string") {
        // Handle cases where a string was thrown
        errorMessage = err;
      }
      // else: Keep the default "An unexpected error occurred."

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please provide your email address.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { error } = await authService.resetPassword(email);
      if (error) throw error;
      setError("");
      alert("Password reset email sent! Please check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full p-2 border rounded"
        required
        disabled={isLoading}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          disabled={isLoading}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={handlePasswordReset}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};
