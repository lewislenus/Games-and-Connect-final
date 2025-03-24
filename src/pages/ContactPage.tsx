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

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Location</h3>
                    <p className="text-gray-600">Accra, Ghana</p>
                    <p className="text-gray-600">
                      Events held at various locations throughout the city
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <p className="text-gray-600">info@gamesandconnect.com</p>
                    <p className="text-gray-600">events@gamesandconnect.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Phone</h3>
                    <p className="text-gray-600">+233 20 123 4567</p>
                    <p className="text-gray-600">
                      Available Monday-Friday, 9AM-5PM
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors"
                  >
                    <Instagram className="h-6 w-6 text-primary-600" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors"
                  >
                    <Twitter className="h-6 w-6 text-primary-600" />
                  </a>
                  <a
                    href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors"
                  >
                    <MessageCircle className="h-6 w-6 text-primary-600" />
                  </a>
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

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our events and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                How do I join the community?
              </h3>
              <p className="text-gray-600">
                You can join our WhatsApp community by clicking the "Join
                Community" button on our website or by contacting us directly.
                We'll add you to our group.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                How much do events cost?
              </h3>
              <p className="text-gray-600">
                Event costs vary depending on the type and duration. Prices
                typically range from GHS 50-300. Some community activities are
                free for members.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                Can I bring friends to events?
              </h3>
              <p className="text-gray-600">
                Absolutely! We encourage members to bring friends. Some events
                offer discounts for group registrations, and you earn loyalty
                points for referrals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                How often do you organize events?
              </h3>
              <p className="text-gray-600">
                We typically organize 2-3 major events per month, plus weekly
                activities like Trivia Friday and occasional spontaneous
                meetups.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                Do you offer refunds for events?
              </h3>
              <p className="text-gray-600">
                We offer full refunds up to 7 days before an event. Within 7
                days, you can transfer your ticket to another person or receive
                a partial refund.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">
                How can I suggest an event idea?
              </h3>
              <p className="text-gray-600">
                We welcome suggestions! You can submit event ideas through our
                contact form, in the WhatsApp group, or by emailing us directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Our Events</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We organize events at various locations throughout Accra and
              occasionally beyond.
            </p>
          </div>

          <div className="bg-gray-200 rounded-xl h-96 overflow-hidden">
            {/* In a real implementation, this would be a Google Maps embed */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-600 text-lg">
                Interactive Map of Accra, Ghana
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Our events take place at various venues across Accra, including
              beaches, parks, community centers, and partner locations. Specific
              event locations are always provided in the event details.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-700 py-16">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates on upcoming events
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
