import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  MessageSquare,
  Menu,
  X,
  Settings,
} from "lucide-react";
import logo from "../assets/img/logo.png";
import AnimatedLink from "./AnimatedLink"; // Added import statement
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const isAdmin = !!user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Games & Connect Logo"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <AnimatedLink
              to="/"
              className="nav-link flex items-center space-x-1 text-gray-700 hover:text-primary-600"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </AnimatedLink>
            <AnimatedLink
              to="/events"
              className="nav-link flex items-center space-x-1 text-gray-700 hover:text-primary-600"
            >
              <Calendar className="h-4 w-4" />
              <span>Events</span>
            </AnimatedLink>
            <AnimatedLink
              to="/community"
              className="nav-link flex items-center space-x-1 text-gray-700 hover:text-primary-600"
            >
              <Users className="h-4 w-4" />
              <span>Community</span>
            </AnimatedLink>
            <AnimatedLink
              to="/contact"
              className="nav-link flex items-center space-x-1 text-gray-700 hover:text-primary-600"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Contact</span>
            </AnimatedLink>
            {isAdmin && (
              <AnimatedLink
                to="/admin"
                className="nav-link flex items-center space-x-1 text-gray-700 hover:text-primary-600"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </AnimatedLink>
            )}
          </div>

          <a
            href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block btn btn-primary"
          >
            Join Community
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="nav-link flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                to="/events"
                className="nav-link flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
              >
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </Link>
              <Link
                to="/community"
                className="nav-link flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
              >
                <Users className="h-5 w-5" />
                <span>Community</span>
              </Link>
              <Link
                to="/contact"
                className="nav-link flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Contact</span>
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="nav-link flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
                >
                  <Settings className="h-5 w-5" />
                  <span>Admin</span>
                </Link>
              )}
              <a
                href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full text-center"
              >
                Join Community
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
