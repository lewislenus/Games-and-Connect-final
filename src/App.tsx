import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import CommunityPage from "./pages/CommunityPage";
import ContactPage from "./pages/ContactPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import VolunteerRegistrationPage from "./pages/VolunteerRegistrationPage";
import VolunteerCTA from "./components/VolunteerCTA";
import GallerySection from "./components/GallerySection";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLayout from "./components/AdminLayout";
import { useAuth } from "./hooks/useAuth";

// Protected route component for admin routes
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:eventId" element={<EventDetailsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/volunteer" element={<VolunteerRegistrationPage />} />

            {/* Admin authentication */}
            <Route path="/login" element={<LoginPage />} />

            {/* Admin routes - protected */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
            </Route>
          </Routes>
        </main>
        <GallerySection />
        <VolunteerCTA />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
