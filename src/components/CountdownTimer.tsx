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
    <div className="bg-primary-900/60 backdrop-blur-md rounded-lg px-6 py-4 text-center inline-block">
      <div className="flex flex-col gap-3">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{eventTitle}</h3>
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <div className="text-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{days}</span>
            <span className="text-gray-300 text-xs ml-0.5 block">days</span>
          </div>
          <span className="text-xl md:text-2xl text-white">:</span>
          <div className="text-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{hours}</span>
            <span className="text-gray-300 text-xs ml-0.5 block">hours</span>
          </div>
          <span className="text-xl md:text-2xl text-white">:</span>
          <div className="text-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{minutes}</span>
            <span className="text-gray-300 text-xs ml-0.5 block">mins</span>
          </div>
          <span className="text-xl md:text-2xl text-white">:</span>
          <div className="text-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{seconds}</span>
            <span className="text-gray-300 text-xs ml-0.5 block">secs</span>
          </div>
        </div>
        <Link 
          to={`/events/${eventId}`} 
          className="btn btn-primary px-5 py-2 text-sm sm:text-base whitespace-nowrap mt-1"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default CountdownTimer;