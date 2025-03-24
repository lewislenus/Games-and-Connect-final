import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CountdownTimerProps {
  targetDate: Date;
  eventTitle: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  eventTitle,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg flex flex-col items-center gap-8">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-primary-700">
            {eventTitle}
          </h3>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800">
              {formatNumber(timeLeft.days)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Days</div>
          </div>
          <div className="text-4xl font-bold text-gray-400">:</div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800">
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Hours</div>
          </div>
          <div className="text-4xl font-bold text-gray-400">:</div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800">
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Minutes</div>
          </div>
          <div className="text-4xl font-bold text-gray-400">:</div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800">
              {formatNumber(timeLeft.seconds)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Seconds</div>
          </div>
        </div>
        <div className="text-center">
          <Link
            to="/events"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Book Now →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
