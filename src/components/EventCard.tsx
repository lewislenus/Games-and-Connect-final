import React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import AnimatedLink from "./AnimatedLink";

interface EventCardProps {
  id?: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
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
  isPast = false,
}) => {
  return (
    <div className="card group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isPast && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Past Event</span>
          </div>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="mb-4 space-y-2 text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary-600" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-primary-600" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary-600" />
            <span>{location}</span>
          </div>
        </div>
        <p className="text-gray-700 mb-4 flex-grow">{description}</p>
        {!isPast && (
          <AnimatedLink
            to={id ? `/events/${id}` : "/events"}
            className="btn btn-primary w-full mt-auto text-center"
          >
            View Details
          </AnimatedLink>
        )}
        {isPast && (
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
