import React, { useState } from 'react';
import { Lock, Heart, Sparkles, Gift, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';

interface PasswordGateProps {
  onUnlock: () => void;
}

export function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === 'fiqru') {
      // Correct password - unlock with animation
      onUnlock();
    } else {
      // Wrong password - show error
      setError(true);
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setError(false);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Heart className="w-4 h-4 text-pink-300" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-pink-200">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="relative inline-block mb-6">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl shadow-2xl"
              >
                <Gift className="w-12 h-12 text-white" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg"
              >
                <Lock className="w-5 h-5 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mb-3">
              Hadiah Spesial untuk Ila
            </h1>
            
            <p className="text-pink-400 text-sm md:text-base mb-1">
              💝 Seseorang yang spesial punya kejutan untukmu!
            </p>
            
            <div className="flex items-center justify-center gap-2 text-rose-400 mt-4">
              <KeyRound className="w-4 h-4 animate-pulse" />
              <p className="text-sm italic">Masukkan kata ajaib untuk membuka...</p>
            </div>
          </motion.div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <motion.input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                animate={shaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`w-full px-6 py-4 rounded-2xl border-2 ${
                  error 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50'
                } focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 text-center text-xl font-medium placeholder:text-pink-300`}
                placeholder="✨ Kata ajaib..."
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 text-center flex items-center justify-center gap-2"
                >
                  <span>💔</span>
                  <span>Oops! Kata yang kamu masukkan salah...</span>
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg"
            >
              <Gift className="w-6 h-6" />
              <span>Buka Hadiahku</span>
              <Sparkles className="w-6 h-6" />
            </motion.button>
          </form>

          {/* Hint */}
          <div className="mt-8 text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">💡</span>
              <p className="text-sm text-gray-500 italic">
                Petunjuk: Nama seseorang yang kamu kenal...
              </p>
            </div>
            <div className="text-xs text-pink-300 font-medium">
              (5 huruf, dimulai dengan 'F')
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-pink-300/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-300/30 rounded-full blur-2xl animate-pulse delay-1000" />
      </motion.div>
    </div>
  );
}