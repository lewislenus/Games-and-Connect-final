import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";
import AnimatedLink from "./AnimatedLink";

interface EventCardProps {
  id?: string | number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  price?: string;
  capacity?: string;
  isPast?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  time,
  location,
  description,
  image,
  price,
  capacity,
  isPast = false,
}) => {
  return (
    <div className="card group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
            console.log(`Image failed to load for event: ${title}`);
          }}
        />
        {/* Status badge overlay */}
        {isPast ? (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Past Event</span>
          </div>
        ) : (
          <div className="absolute top-2 right-2">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Upcoming
            </span>
          </div>
        )}
      </div>
      <div
        className={`p-5 flex-grow flex flex-col ${
          isPast ? "bg-gray-50" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          {/* Status indicator */}
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              isPast
                ? "bg-gray-200 text-gray-700"
                : "bg-green-100 text-green-800"
            }`}
          >
            {isPast ? "Past" : "Upcoming"}
          </span>
        </div>
        <div className="mb-4 space-y-2 text-gray-600">
          <div className="flex items-center">
            <Calendar
              className={`h-4 w-4 mr-2 ${
                isPast ? "text-gray-500" : "text-primary-600"
              }`}
            />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock
              className={`h-4 w-4 mr-2 ${
                isPast ? "text-gray-500" : "text-primary-600"
              }`}
            />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <MapPin
              className={`h-4 w-4 mr-2 ${
                isPast ? "text-gray-500" : "text-primary-600"
              }`}
            />
            <span>{location}</span>
          </div>
          {price && (
            <div className="flex items-center">
              <span
                className={`font-semibold ${
                  isPast ? "text-gray-600" : "text-primary-600"
                }`}
              >
                {price}
              </span>
            </div>
          )}
          {capacity && (
            <div className="flex items-center text-sm">
              <span>{capacity}</span>
            </div>
          )}
        </div>
        <p className="text-gray-700 mb-4 flex-grow">{description}</p>
        {!isPast ? (
          <AnimatedLink
            to={id ? `/events/${id}` : "/events"}
            className="btn btn-primary w-full mt-auto text-center"
          >
            View Details
          </AnimatedLink>
        ) : (
          <Link
            to={id ? `/events/${id}` : "/events"}
            className="btn btn-outline w-full mt-auto text-center"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;
