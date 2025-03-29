import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface CountdownTimerProps {
  targetDate: Date;
  eventTitle: string;
  eventId: string; // Added eventId prop
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, eventTitle, eventId }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
      <h3 className="text-2xl font-bold text-primary-600 mb-4">{eventTitle}</h3>
      <div className="flex justify-center items-center gap-4 mb-6">
        <div className="text-center">
          <span className="text-3xl font-bold text-primary-600">{days}</span>
          <span className="text-gray-600 text-sm ml-1">d</span>
        </div>
        <span className="text-2xl text-primary-600">:</span>
        <div className="text-center">
          <span className="text-3xl font-bold text-primary-600">{hours}</span>
          <span className="text-gray-600 text-sm ml-1">h</span>
        </div>
        <span className="text-2xl text-primary-600">:</span>
        <div className="text-center">
          <span className="text-3xl font-bold text-primary-600">{minutes}</span>
          <span className="text-gray-600 text-sm ml-1">m</span>
        </div>
        <span className="text-2xl text-primary-600">:</span>
        <div className="text-center">
          <span className="text-3xl font-bold text-primary-600">{seconds}</span>
          <span className="text-gray-600 text-sm ml-1">s</span>
        </div>
      </div>
      <Link 
        to={`/events/${eventId}`} 
        className="btn btn-primary px-8 py-2"
      >
        Register Now
      </Link>
    </div>
  );
};

export default CountdownTimer;