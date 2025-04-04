import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, Users, Calendar, CheckCircle } from "lucide-react";
import { registrationService } from "../api/services/registrationService"; // Assuming this service handles Supabase interaction

// Using the VolunteerData interface from volunteerService.  This should be updated to reflect the Supabase schema.
type FormData = {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string[];
  experience?: string;
  message: string;
};


const VolunteerRegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Send the form data to the backend using the volunteer service
      await registrationService.createVolunteerRegistration(data);

      alert(
        "Thank you for your interest in volunteering! We'll contact you soon."
      );
      reset();
    } catch (error) {
      console.error("Error submitting volunteer form:", error);
      setSubmitError(
        "There was an error submitting your application. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section id="volunteer-hero" className="relative py-20 bg-primary-700">
        <div className="container-custom text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Volunteer Registration</h1>
            <p className="text-xl mb-0">
              Join our team of dedicated volunteers and help create amazing
              experiences for our community.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Apply to Volunteer</h2>
              <p className="text-gray-600 mb-8">
                Thank you for your interest in volunteering with Games &
                Connect! Please fill out the form below to let us know how you'd
                like to contribute. Our team will review your application and
                contact you soon.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Join Our Team</h3>
                    <p className="text-gray-600">
                      Become part of a vibrant community dedicated to creating
                      fun and engaging experiences in Accra.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">
                      Flexible Commitment
                    </h3>
                    <p className="text-gray-600">
                      Volunteer for specific events or on a regular basis,
                      depending on your availability and interests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">
                      Earn Loyalty Points
                    </h3>
                    <p className="text-gray-600">
                      Volunteers earn 200 loyalty points for each event they
                      help with, accelerating your progress through our
                      membership tiers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {submitError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {submitError}
                </div>
              )}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 card p-8"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your phone number"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Interest *
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="event-coordination"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        value="Event Coordination"
                        {...register("interests", {
                          required:
                            "Please select at least one area of interest",
                        })}
                      />
                      <label
                        htmlFor="event-coordination"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Event Coordination
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="community-engagement"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        value="Community Engagement"
                        {...register("interests")}
                      />
                      <label
                        htmlFor="community-engagement"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Community Engagement
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="content-creation"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        value="Content Creation"
                        {...register("interests")}
                      />
                      <label
                        htmlFor="content-creation"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Content Creation
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="photography"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        value="Photography & Documentation"
                        {...register("interests")}
                      />
                      <label
                        htmlFor="photography"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Photography & Documentation
                      </label>
                    </div>
                  </div>
                  {errors.interests && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.interests.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability *
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="weekdays"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        value="Weekdays"
                        {...register("availability", {
                          required: "Please select your availability",
                        })}
                      />
                      <label
                        htmlFor="weekdays"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Weekdays
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="weekends"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        value="Weekends"
                        {...register("availability")}
                      />
                      <label
                        htmlFor="weekends"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Weekends
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="evenings"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        value="Evenings"
                        {...register("availability")}
                      />
                      <label
                        htmlFor="evenings"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Evenings
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="specific-events"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        value="Specific Events Only"
                        {...register("availability")}
                      />
                      <label
                        htmlFor="specific-events"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Specific Events Only
                      </label>
                    </div>
                  </div>
                  {errors.availability && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.availability.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Relevant Experience
                  </label>
                  <textarea
                    id="experience"
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border-gray-300"
                    placeholder="Tell us about any relevant experience you have (optional)"
                    {...register("experience")}
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Why do you want to volunteer with us?
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Tell us why you're interested in volunteering with Games & Connect"
                    {...register("message", {
                      required: "Please tell us why you want to volunteer",
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerRegistrationPage;