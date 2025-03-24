import React from "react";
import { Link } from "react-router-dom";

const VolunteerCTA = () => {
  return (
    <section className="py-24 my-16">
      <div className="container-custom">
        <div className="relative overflow-hidden bg-primary-900 rounded-xl shadow-xl min-h-[500px] border border-primary-800/30">
          <div className="absolute right-0 top-0 h-full w-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80"
              alt="Volunteer"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative py-16 px-8 lg:px-16 lg:w-1/2 z-20">
            <span className="text-yellow-400 font-semibold mb-4 block text-lg">
              Call for Volunteers
            </span>
            <h2 className="text-5xl font-bold text-white mb-6">
              Let's make Game Fiesta possible with you
            </h2>
            <p className="text-gray-300 mb-10 text-xl leading-relaxed">
              Do you love organizing, teamwork, and creating exciting
              experiences? Join us as a volunteer to gain leadership experience,
              network, and be part of an amazing community. Fill out this form
              to apply!
            </p>
            <Link
              to="/volunteer#volunteer-hero"
              className="inline-block bg-yellow-400 text-primary-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Volunteer Now! →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerCTA;
