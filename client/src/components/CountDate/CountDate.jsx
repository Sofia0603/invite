import React, { useState, useEffect } from 'react';

function CountDate({ targetDate }){
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
        days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }



  return (
    <section className="font-cafeparis bg-bg-pink-light flex justify-around py-2 mb-5" >

      <div className="flex flex-col items-center justify-center ">
        <div className="text-[32px] leading-none">
          {String(timeLeft.weeks ?? 0).padStart(2, '0')}
        </div>
        <p className="text-[18px]">
          недель
        </p>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className="text-[32px] leading-none">
          {String(timeLeft.days ?? 0).padStart(2, '0')}
        </div>
        <p className="text-[18px]">
          дней
        </p>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className="text-[32px] leading-none">
          {String(timeLeft.hours ?? 0).padStart(2, '0')}
        </div>
        <p className="text-[18px]">
          часов
        </p>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className="text-[32px] leading-none">
          {String(timeLeft.minutes ?? 0).padStart(2, '0')}
        </div>
        <p className="text-[18px]">
          минут
        </p>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className="text-[32px] leading-none">
          {String(timeLeft.seconds ?? 0).padStart(2, '0')}
        </div>
        <p className="text-[18px]">
          секунд
        </p>
      </div>

    </section>
  )
}

export default CountDate