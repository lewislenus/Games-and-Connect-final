import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  // Redirect to home page after a short delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login No Longer Required
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've simplified our platform! You can now register for events
            without creating an account.
          </p>
          <p className="mt-4 text-center text-sm text-gray-600">
            You will be redirected to the home page in a few seconds...
          </p>
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Return to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
