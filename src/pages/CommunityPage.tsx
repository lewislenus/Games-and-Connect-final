import { Link } from "react-router-dom";
import {
  MessageCircle,
  Users,
  Calendar,
  Award,
  CheckCircle,
  Gift,
  Star,
} from "lucide-react";
import communityImage from "../assets/img/events.jpg";

const CommunityPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img
            src={communityImage}
            alt="Community & Loyalty Program"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-secondary-900/80"></div>
        </div>
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Community & Loyalty Program
            </h1>
            <p className="text-xl mb-6">
              Connect with like-minded individuals, participate in discussions,
              and earn rewards for your active participation.
            </p>
            <a
              href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-primary-700 hover:bg-gray-100"
            >
              Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>

      {/* Community Benefits */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Join Our Community?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Being part of the Games & Connect community comes with numerous
              benefits that enhance your social experience in Accra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Connect with New People
                </h3>
                <p className="text-gray-600">
                  Meet and connect with diverse individuals who share similar
                  interests. Our community is a melting pot of personalities,
                  professions, and backgrounds.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Early Access to Events
                </h3>
                <p className="text-gray-600">
                  Community members get first dibs on event registrations and
                  exclusive access to limited-capacity activities before they're
                  open to the public.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Interactive Discussions
                </h3>
                <p className="text-gray-600">
                  Participate in engaging discussions, from fun trivia to
                  meaningful conversations about life in Ghana and beyond.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Loyalty Program Benefits
                </h3>
                <p className="text-gray-600">
                  Active community members earn points that can be redeemed for
                  discounts on events, exclusive merchandise, and special
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Community */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Our WhatsApp Community
              </h2>
              <p className="text-gray-600 mb-6">
                Our primary community platform is WhatsApp, where we share
                updates, organize impromptu meetups, and foster connections
                between members.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Daily Interactions:</span>{" "}
                    From morning greetings to evening discussions, our community
                    is active throughout the day.
                  </p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Trivia Friday:</span> Every
                    Friday, we host a fun trivia session with prizes for
                    winners.
                  </p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Event Updates:</span> Be the
                    first to know about upcoming events and secure your spot.
                  </p>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-1 mr-3" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Community Support:</span>{" "}
                    Need recommendations in Accra? Our community members are
                    always ready to help.
                  </p>
                </div>
              </div>

              <a
                href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Join WhatsApp Community
              </a>
            </div>

            <div className="relative">
              <img
                src={communityImage}
                alt="Community members interacting"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-8 w-8 text-primary-600" />
                  <div>
                    <p className="font-bold">500+ Members</p>
                    <p className="text-sm text-gray-600">Active Daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Activities */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Regular Community Activities
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Beyond our major events, we organize regular activities to keep
              the community engaged.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Trivia Friday</h3>
              <p className="text-gray-600 mb-4">
                Every Friday at 7 PM, we host a trivia session in our WhatsApp
                group. Topics range from general knowledge to Ghana-specific
                questions.
              </p>
              <p className="text-primary-600 font-semibold">
                Winners receive points and occasional prizes!
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Weekend Meetups</h3>
              <p className="text-gray-600 mb-4">
                Informal gatherings at cafes, restaurants, or parks around
                Accra. A great way to meet community members in a relaxed
                setting.
              </p>
              <p className="text-primary-600 font-semibold">
                Announced weekly based on member availability.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold mb-3">Monthly Challenges</h3>
              <p className="text-gray-600 mb-4">
                From photo contests to fitness challenges, we organize monthly
                activities that members can participate in remotely.
              </p>
              <p className="text-primary-600 font-semibold">
                Participate to earn loyalty points and recognition!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="section bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Community Guidelines
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-6">
                To ensure a positive experience for all members, we have
                established the following guidelines for our community:
              </p>

              <ol className="space-y-4 list-decimal pl-5">
                <li className="text-gray-700">
                  <span className="font-semibold">Respect Everyone:</span> Treat
                  all community members with respect regardless of background,
                  beliefs, or opinions.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Positive Engagement:</span>{" "}
                  Contribute positively to discussions and activities. Avoid
                  negative or harmful content.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">No Spam or Promotions:</span>{" "}
                  Avoid unsolicited advertising or promotional content unless
                  approved by administrators.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Privacy Matters:</span>{" "}
                  Respect the privacy of other members. Do not share personal
                  information without consent.
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Appropriate Content:</span>{" "}
                  Share content that is appropriate for all members. No explicit
                  or offensive material.
                </li>
              </ol>

              <p className="mt-6 text-gray-700">
                Violation of these guidelines may result in removal from the
                community. We aim to create a safe, inclusive, and enjoyable
                environment for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loyalty Program Section */}
      <section id="loyalty" className="section bg-white">
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
            <a
              href="https://chat.whatsapp.com/LT0Zolnz9fMLm7b7aKtQld"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white text-primary-700 hover:bg-gray-100"
            >
              Join WhatsApp Community
            </a>
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

export default CommunityPage;
