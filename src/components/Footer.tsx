import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, MessageCircle } from "lucide-react";
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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400"
              >
                <Twitter className="h-6 w-6" />
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
