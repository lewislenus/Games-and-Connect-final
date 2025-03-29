import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";
import logoWhite from "../assets/img/logo white.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img
                src={logoWhite}
                alt="Games & Connect Logo"
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-4">
              Creating unforgettable experiences and building a vibrant
              community in Accra, Ghana.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/games_connect_gh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/GamesConnect_gh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@games_and_connect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 014.07-4.07v-3.45a6.37 6.37 0 00-3.35 11.8 6.37 6.37 0 008.24-6.1V9.41a8.33 8.33 0 005.37 1.91v-3.45a4.85 4.85 0 01-1.91-1.18z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/gamesandconnect/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-primary-400"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-gray-400 hover:text-primary-400"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary-400"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Events</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-primary-400"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-primary-400"
                >
                  Games Day
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-primary-400"
                >
                  Beach Parties
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-primary-400"
                >
                  Trivia Nights
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-primary-400"
                >
                  Past Events
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Accra, Ghana</p>
            <p className="text-gray-400 mb-2">info@gamesandconnect.com</p>
            <p className="text-gray-400 mb-4">+233 20 123 4567</p>
            <Link to="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Games & Connect. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
