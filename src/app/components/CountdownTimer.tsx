import React from 'react';

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center">
      <TimeUnit value={days} label="Days" />
      <Separator />
      <TimeUnit value={hours} label="Hours" />
      <Separator />
      <TimeUnit value={minutes} label="Minutes" />
      <Separator />
      <TimeUnit value={seconds} label="Seconds" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-4 md:p-8 shadow-2xl border-2 border-pink-200 min-w-[80px] md:min-w-[120px]">
        <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-3 text-sm md:text-lg font-medium text-pink-300 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-3xl md:text-5xl font-bold text-pink-300 mb-8">:</div>
  );
}
