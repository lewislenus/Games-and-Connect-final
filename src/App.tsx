import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import CommunityPage from "./pages/CommunityPage";
import ContactPage from "./pages/ContactPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import VolunteerRegistrationPage from "./pages/VolunteerRegistrationPage";
import VolunteerCTA from "./components/VolunteerCTA";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLayout from "./components/AdminLayout";

// Layout component that conditionally renders footer based on route
const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
          <Route path="/team/:teamId" element={<TeamDetailsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/volunteer" element={<VolunteerRegistrationPage />} />

          {/* Admin authentication */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin routes - no longer protected */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
          </Route>
        </Routes>
      </main>
      
      {/* Only show VolunteerCTA on non-homepage routes */}
      {!isHomePage && <VolunteerCTA />}
      
      {/* Footer is shown on all pages */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
