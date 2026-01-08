import { useState, useEffect } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { MusicPlayer } from './components/MusicPlayer';
import { BirthdayCelebration } from './components/BirthdayCelebration';
import { WaterBackground } from './components/WaterBackground';
import { WaterCursor } from './components/WaterCursor';
import { PasswordGate } from './components/PasswordGate';
import { LoveLetter } from './components/LoveLetter';
import { Sparkles } from 'lucide-react';

// Birthday date: January 10, 2026 00:00:00 WIB (UTC+7)
const BIRTHDAY_DATE = new Date('2026-01-10T00:00:00+07:00');

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showPasswordGate, setShowPasswordGate] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isBirthday, setIsBirthday] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true); // Show start button initially
  const [secretClicks, setSecretClicks] = useState(0);
  const [currentPage, setCurrentPage] = useState<'countdown' | 'password' | 'letter' | 'birthday'>('countdown');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = BIRTHDAY_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setIsBirthday(true);
        setCurrentPage('birthday');
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStartExperience = () => {
    setShowStartButton(false);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowPasswordGate(false);
    setShowLetter(true);
    setCurrentPage('letter');
  };

  const handleContinueFromLetter = () => {
    setShowLetter(false);
    setCurrentPage('countdown');
  };

  const handleSecretClick = () => {
    setSecretClicks(prev => prev + 1);
    if (secretClicks >= 2) {
      setShowPasswordGate(true);
      setCurrentPage('password');
      setSecretClicks(0);
    }
  };

  // Show start button overlay
  if (showStartButton) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex flex-col items-center justify-center p-4">
        <WaterBackground />
        <WaterCursor />
        
        <div className="relative z-10 text-center space-y-8">
          <div className="text-8xl animate-bounce mb-4">🎂</div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Selamat Datang Warga Sumberayu!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Adek Cantik Tolong Klik Tombol 'Start' dibawah yaaaa  ✨
          </p>
          
          <button
            onClick={handleStartExperience}
            className="px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-2xl hover:shadow-pink-300 hover:scale-105 transition-all duration-300 animate-pulse"
          >
            🎵 Start 
          </button>
        </div>
      </div>
    );
  }

  // Render content based on current state
  const renderContent = () => {
    if (showPasswordGate && !isUnlocked) {
      return <PasswordGate onUnlock={handleUnlock} />;
    }

    if (showLetter && isUnlocked) {
      return <LoveLetter onContinue={handleContinueFromLetter} />;
    }

    if (isBirthday) {
      return (
        <>
          <WaterBackground />
          <WaterCursor />
          <BirthdayCelebration />
        </>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <WaterBackground />
        <WaterCursor />
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/4 right-20 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-2000" />
          <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-yellow-200/30 rounded-full blur-3xl animate-pulse delay-3000" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-pink-300/50" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-12 space-y-4">
            <div className="inline-block animate-bounce">
              <div className="text-6xl md:text-8xl">🎂</div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mb-4 animate-pulse">
              Hitung Mundur Ulang Tahun Ila
            </h1>
            
            <p className="text-lg md:text-2xl text-pink-400 font-medium">
              10 Januari 2026 • 00:00 WIB
            </p>
          </div>

          <div className="mb-12">
            <CountdownTimer
              days={timeRemaining.days}
              hours={timeRemaining.hours}
              minutes={timeRemaining.minutes}
              seconds={timeRemaining.seconds}
            />
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pink-200 max-w-2xl mx-auto">
            <div className="text-2xl md:text-3xl mb-6">✨</div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Hitung mundur menuju Perayaan Wanita Menawan akan segera datang ahahaha , alay bgt bjir .
              <span className="font-semibold text-pink-600"> Love</span>, 
              <span className="font-semibold text-rose-600"> Laugt</span>, and 
              <span className="font-semibold text-purple-600"> Leverage Maximum Time was coming</span>! 🎉
            </p>
            <div className="mt-6 flex justify-center gap-3">
              {['🎈', '🎁', '🎊', '💝'].map((emoji, index) => (
                <span
                  key={index}
                  className="text-3xl animate-bounce"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0;
            }
            50% {
              transform: translateY(-50px) rotate(180deg);
              opacity: 1;
            }
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
          .delay-1000 {
            animation-delay: 1s;
          }
          .delay-2000 {
            animation-delay: 2s;
          }
          .delay-3000 {
            animation-delay: 3s;
          }
        `}</style>
      </div>
    );
  };

  return (
    <>
      {renderContent()}

      <MusicPlayer
        isPlaying={isPlaying}
        isBirthday={isBirthday}
        currentPage={currentPage}
        onPlayPause={togglePlayPause}
      />

      <button
        onClick={handleSecretClick}
        className={`fixed bottom-8 left-8 w-12 h-12 rounded-full transition-all duration-300 z-50 ${
          secretClicks > 0 
            ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg scale-110' 
            : 'bg-pink-200/50 hover:bg-pink-300/70'
        }`}
        title="Rahasia: Klik 3 kali untuk membuka konten spesial"
      >
        <span className="text-2xl">
          {secretClicks === 0 && '🎂'}
          {secretClicks === 1 && '🎉'}
          {secretClicks === 2 && '🎊'}
        </span>
      </button>
    </>
  );
}
