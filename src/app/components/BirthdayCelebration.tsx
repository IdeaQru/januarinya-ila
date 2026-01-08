import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Cake, Gift, PartyPopper, Heart, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function BirthdayCelebration() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const balloons = [
    { color: 'from-pink-400 to-pink-600', delay: 0 },
    { color: 'from-rose-400 to-rose-600', delay: 0.2 },
    { color: 'from-purple-400 to-purple-600', delay: 0.4 },
    { color: 'from-yellow-400 to-yellow-600', delay: 0.6 },
    { color: 'from-blue-400 to-blue-600', delay: 0.8 },
  ];

  const floatingIcons = [
    { Icon: Star, delay: 0, x: -100, y: -50 },
    { Icon: Heart, delay: 0.3, x: 100, y: -30 },
    { Icon: Sparkles, delay: 0.6, x: -80, y: -70 },
    { Icon: Gift, delay: 0.9, x: 80, y: -40 },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Confetti */}
      <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        recycle={true}
        numberOfPieces={500}
        colors={['#FF69B4', '#FFB6C1', '#FFC0CB', '#FFD700', '#FFA500', '#FF1493']}
      />

      {/* Background Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {balloons.map((balloon, index) => (
          <motion.div
            key={index}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '-120%', opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 8,
              delay: balloon.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`absolute bg-gradient-to-b ${balloon.color} w-12 h-16 rounded-full`}
            style={{ left: `${20 + index * 15}%` }}
          >
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b ${balloon.color}`} />
          </motion.div>
        ))}
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0],
            x: [0, item.x, item.x * 1.5],
            y: [0, item.y, item.y * 2],
          }}
          transition={{
            duration: 3,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute top-1/2 left-1/2"
        >
          <item.Icon className="w-8 h-8 text-yellow-400" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        >
          <PartyPopper className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 text-pink-500" />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          className="text-6xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-pink-500 to-rose-500 bg-clip-text text-transparent"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          Ila!
        </motion.h2>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Cake className="w-20 h-20 md:w-28 md:h-28 mx-auto text-pink-400" />
        </motion.div>

        <motion.p
          className="mt-8 text-xl md:text-3xl text-pink-300 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Wishing you a day filled with love, joy, and wonderful memories! 🎂✨
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {['🎈', '🎁', '🎊', '🎉', '💝', '🌟'].map((emoji, index) => (
            <motion.span
              key={index}
              className="text-4xl md:text-6xl"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
