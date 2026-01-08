import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  isBirthday: boolean;
  currentPage: 'countdown' | 'password' | 'letter' | 'birthday';
  onPlayPause: () => void;
}

export function MusicPlayer({ isPlaying, isBirthday, currentPage, onPlayPause }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  // Only 2 music files
  const music1Url = "/music/music1.mp3"; // For countdown, password pages
  const playLoveUrl = "/music/musicbirtday.mp3"; // For letter and birthday pages

  // Get current music based on page
  const getCurrentMusicUrl = () => {
    // Use playlove for letter and birthday, music1 for everything else
    if (currentPage === 'letter' || currentPage === 'birthday') {
      return playLoveUrl;
    }
    return music1Url;
  };

  useEffect(() => {
    if (audioRef.current) {
      const newMusicUrl = getCurrentMusicUrl();
      
      // Only change source if it's different from current
      const currentSrc = audioRef.current.src;
      const newSrc = window.location.origin + newMusicUrl;
      
      if (currentSrc !== newSrc) {
        audioRef.current.src = newMusicUrl;
        audioRef.current.loop = true;
        audioRef.current.volume = isMuted ? 0 : volume;
        
        // Auto-play when source changes
        if (isPlaying) {
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
      } else {
        // Source is the same, just update play/pause state
        audioRef.current.volume = isMuted ? 0 : volume;
        
        if (isPlaying) {
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        } else {
          audioRef.current.pause();
        }
      }
    }
  }, [currentPage, isPlaying, isMuted, volume]);

  // Auto-start music on component mount
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  // Get music label based on current page
  const getMusicLabel = () => {
    if (currentPage === 'letter' || currentPage === 'birthday') {
      return '💕 Play Love Music';
    }
    return '🎵 Ambient Music';
  };

  return (
    <div className="fixed bottom-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 border-2 border-pink-200 z-50">
      <audio ref={audioRef} />
      
      <div className="flex items-center gap-4">
        <button
          onClick={onPlayPause}
          className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-pink-100 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-pink-500" /> : <Volume2 className="w-5 h-5 text-pink-500" />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 accent-pink-500"
          aria-label="Volume control"
        />
      </div>

      <div className="mt-2 text-xs text-center text-pink-600">
        {getMusicLabel()}
      </div>
    </div>
  );
}
