
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeComponents = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8 my-12" data-aos="fade-up" data-aos-delay="400">
      {timeComponents.map((component, index) => (
        <div key={index} className="flex flex-col items-center justify-center bg-white/50 w-20 h-20 md:w-28 md:h-28 rounded-lg shadow-md border border-accent/20">
          <span className="font-playfair text-3xl md:text-5xl text-accent">{String(component.value).padStart(2, '0')}</span>
          <span className="text-xs md:text-sm text-text-secondary">{component.label}</span>
        </div>
      ))}
    </div>
  );
};
