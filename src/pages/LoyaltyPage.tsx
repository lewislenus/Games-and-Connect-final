import React from "react";
import { Link } from "react-router-dom";
import { Award, Gift, Star, Users, CheckCircle } from "lucide-react";

const LoyaltyPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-primary-700">
        <div className="container-custom text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Loyalty Program & Volunteering
            </h1>
            <p className="text-xl mb-0">
              Earn rewards for your participation and give back to the community
              through volunteering.
            </p>
          </div>
        </div>
      </section>

      {/* Loyalty Program */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
              <Award className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Loyalty Program</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We value our active community members and reward your
              participation through our loyalty program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Earn Points</h3>
              <p className="text-gray-600">
                Earn points by attending events, participating in community
                activities, referring friends, and engaging in our WhatsApp
                group.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Redeem Rewards</h3>
              <p className="text-gray-600">
                Use your points to get discounts on event tickets, exclusive
                merchandise, priority registration, and special experiences.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Achieve Status</h3>
              <p className="text-gray-600">
                Progress through different membership tiers (Bronze, Silver,
                Gold, Platinum) to unlock additional benefits and recognition.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              How to Earn Points
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">50</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Attend a Major Event</h4>
                  <p className="text-gray-600">
                    Earn 50 points for each major event you attend (Games Day,
                    Beach Party, etc.)
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">20</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-1">
                    Participate in Trivia Friday
                  </h4>
                  <p className="text-gray-600">
                    Earn 20 points each time you participate in our weekly
                    trivia sessions
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">100</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Refer a Friend</h4>
                  <p className="text-gray-600">
                    Earn 100 points when you refer a friend who joins the
                    community and attends an event
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">200</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Volunteer at an Event</h4>
                  <p className="text-gray-600">
                    Earn 200 points when you volunteer to help organize or run
                    an event
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Membership Tiers</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              As you accumulate points, you'll progress through different
              membership tiers, each with its own set of benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6 border-t-4 border-gray-400">
              <div className="text-center mb-4">
                <div className="inline-block p-2 bg-gray-100 rounded-full mb-2">
                  <Award className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold">Bronze</h3>
                <p className="text-gray-500">0 - 500 Points</p>
              </div>

              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">Community membership</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">Event participation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">Basic loyalty rewards</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 border-t-4 border-gray-300">
              <div className="text-center mb-4">
                <div className="inline-block p-2 bg-gray-100 rounded-full mb-2">
                  <Award className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold">Silver</h3>
                <p className="text-gray-500">501 - 1500 Points</p>
              </div>

              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">All Bronze benefits</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">5% discount on events</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">
                    Early event notifications
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">Silver member badge</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 border-t-4 border-yellow-400 transform scale-105 shadow-xl z-10">
              <div className="text-center mb-4">
                <div className="inline-block p-2 bg-yellow-50 rounded-full mb-2">
                  <Award className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold">Gold</h3>
                <p className="text-gray-500">1501 - 3000 Points</p>
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-2">
                  Popular
                </span>
              </div>

              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">All Silver benefits</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">10% discount on events</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">Priority registration</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">Exclusive merchandise</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">Gold member badge</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 border-t-4 border-primary-500">
              <div className="text-center mb-4">
                <div className="inline-block p-2 bg-primary-100 rounded-full mb-2">
                  <Award className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold">Platinum</h3>
                <p className="text-gray-500">3001+ Points</p>
              </div>

              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">All Gold benefits</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">15% discount on events</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">VIP access at events</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">Free companion ticket</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">Platinum member badge</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-gray-700">Input on future events</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteering */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Volunteer Opportunities
              </h2>
              <p className="text-gray-600 mb-6">
                Help us create amazing experiences for the community while
                developing your skills and expanding your network. Volunteering
                is a great way to give back and earn substantial loyalty points.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold">Event Coordination</h4>
                    <p className="text-gray-700">
                      Help plan and execute our events, from logistics to
                      on-site management.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold">Community Engagement</h4>
                    <p className="text-gray-700">
                      Assist in managing our WhatsApp community, facilitating
                      discussions, and organizing online activities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold">Content Creation</h4>
                    <p className="text-gray-700">
                      Help create engaging content for our social media channels
                      and website.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold">Photography & Documentation</h4>
                    <p className="text-gray-700">
                      Capture moments at our events to share with the community
                      and for promotional purposes.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/volunteer"
                className="btn btn-primary"
              >
                Apply to Volunteer
              </Link>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Volunteers working together"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-primary-600" />
                  <div>
                    <p className="font-bold">Join Our Team</p>
                    <p className="text-sm text-gray-600">Make an Impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Benefits */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Benefits of Volunteering
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Volunteering with Games & Connect offers numerous personal and
              professional benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Skill Development</h3>
              <p className="text-gray-600">
                Gain practical experience in event management, communication,
                leadership, and other valuable skills that enhance your resume.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Networking</h3>
              <p className="text-gray-600">
                Connect with professionals from various industries and expand
                your personal and professional network in Accra.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Recognition</h3>
              <p className="text-gray-600">
                Receive acknowledgment for your contributions, including special
                mentions at events and in our community communications.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Loyalty Points</h3>
              <p className="text-gray-600">
                Earn substantial loyalty points for your volunteer work, helping
                you progress through membership tiers faster.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Free Event Access</h3>
              <p className="text-gray-600">
                Volunteers receive free access to the events they help organize,
                allowing you to enjoy the experience while contributing.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Personal Fulfillment</h3>
              <p className="text-gray-600">
                Experience the satisfaction of contributing to positive
                experiences for others and building a stronger community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-700 py-16">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Involved?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you want to earn rewards through our loyalty program or
            contribute as a volunteer, there are many ways to get more involved
            with Games & Connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-primary-700 hover:bg-gray-100">
              Join Loyalty Program
            </button>
            <Link
              to="/volunteer"
              className="btn bg-secondary-500 text-white hover:bg-secondary-600"
            >
              Apply to Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoyaltyPage;
