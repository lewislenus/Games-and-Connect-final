import { Link } from "react-router-dom";
import { Instagram, Twitter, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 bg-[#0a1a2f] text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-2">Games & Connect</h2>
            <p className="text-gray-400">Bringing people together through fun</p>
          </div>
          <div className="mt-6 md:mt-0 flex flex-col md:flex-row gap-6 md:gap-12">
            <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
            <Link to="/events" className="hover:text-primary-400 transition-colors">Events</Link>
            <Link to="/community" className="hover:text-primary-400 transition-colors">Community</Link>
            <Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 border-t-2 border-white pt-4">Connect With Us</h3>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.instagram.com/games_connect_gh/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/GamesConnect_gh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@games_and_connect"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 014.07-4.07v-3.45a6.37 6.37 0 00-3.35 11.8 6.37 6.37 0 008.24-6.1V9.41a8.33 8.33 0 005.37 1.91v-3.45a4.85 4.85 0 01-1.91-1.18z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/gamesandconnect/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-t-2 border-white pt-4">Contact Information</h3>
            <p className="text-gray-300 mb-2">Accra, Ghana</p>
            <p className="text-gray-300 mb-2">info@gamesandconnect.com</p>
            <p className="text-gray-300 mb-4">+233 20 123 4567</p>
            <Link 
              to="/contact" 
              className="group inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:border-primary-400 hover:text-primary-400 transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-t-2 border-white pt-4">Join Our Community</h3>
            <p className="text-gray-300 mb-4">Stay updated with our latest events and connect with like-minded individuals.</p>
            <a
              href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Join WhatsApp Group
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-center">&copy; {new Date().getFullYear()} Games & Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
