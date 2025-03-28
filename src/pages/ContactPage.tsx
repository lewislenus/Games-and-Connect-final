import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";
import ContactForm from "../components/ContactForm";
import contactImage from "../assets/img/contact.jpg";

const ContactPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img
            src={contactImage}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-secondary-900/80"></div>
        </div>
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl mb-0">
              Have questions or suggestions? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Whether you have questions about our events, want to suggest an
                activity, or are interested in partnerships, we're here to help.
                Fill out the form or reach out to us directly through any of our
                channels.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <MapPin className="text-primary-600" />
                  <span>Accra, Ghana</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-primary-600" />
                  <span>+233 50 123 4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-primary-600" />
                  <span>info@gamesandconnect.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MessageCircle className="text-primary-600" />
                  <span>WhatsApp Community</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-700 py-16">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates about upcoming events
            and community activities.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none"
              />
              <button className="bg-secondary-500 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-secondary-600">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-4 text-primary-200">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;