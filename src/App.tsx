import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import CommunityPage from "./pages/CommunityPage";
import ContactPage from "./pages/ContactPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLayout from "./components/AdminLayout";
import Animations from "./components/Animations";

// Layout component that conditionally renders footer based on route
const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      <Animations />
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
          {/* Admin authentication */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin routes - no longer protected */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
          </Route>
        </Routes>
      </main>
      
      {/* Footer is shown on all pages */}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppLayout />
      </Router>
    </HelmetProvider>
  );
};

export default App;
