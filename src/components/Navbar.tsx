import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const isAdmin = !!user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#0a1a2f] text-white z-50 sticky top-0">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold">Games & Connect</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-primary-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-white hover:text-primary-400 transition-colors"
            >
              Events
            </Link>
            <Link
              to="/community"
              className="text-white hover:text-primary-400 transition-colors"
            >
              Community
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-primary-400 transition-colors"
            >
              Contact
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-white hover:text-primary-400 transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          <a
            href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-medium border border-white text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all"
          >
            Join Community
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none p-2 touch-manipulation"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a1a2f] border-t border-gray-800 z-50 p-6">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-white hover:text-primary-400 transition-colors py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/events"
                className="text-white hover:text-primary-400 transition-colors py-2"
                onClick={toggleMenu}
              >
                Events
              </Link>
              <Link
                to="/community"
                className="text-white hover:text-primary-400 transition-colors py-2"
                onClick={toggleMenu}
              >
                Community
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-primary-400 transition-colors py-2"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-white hover:text-primary-400 transition-colors py-2"
                  onClick={toggleMenu}
                >
                  Admin
                </Link>
              )}
              <a
                href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-full mt-2"
              >
                Join Community
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
