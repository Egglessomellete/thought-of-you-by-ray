import React from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  currentView: 'home' | 'arrange' | 'note' | 'unwrap' | 'about';
  onNavigate: (view: 'home' | 'arrange' | 'note' | 'unwrap' | 'about') => void;
  onOpenAbout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenAbout }) => {
  if (currentView === 'unwrap') {
    return null; // Immersive recipient experience
  }

  if (currentView === 'about') {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0_1px_8px_rgba(2,33,60,0.03)] border-b border-[#02213c]/5">
        <div className="h-20 w-full max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-[#43474d] hover:text-[#1e1c00] transition-colors font-sans text-sm font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Home</span>
          </button>
          
          <button
            onClick={() => onNavigate('home')}
            className="font-serif italic text-3xl md:text-4xl text-[#000816] tracking-tight hover:opacity-90 transition-opacity cursor-pointer text-center"
          >
            Thought of You
          </button>

          <button
            onClick={() => onNavigate('arrange')}
            className="inline-flex items-center justify-center h-10 px-5 md:px-6 rounded-full bg-[#02213c] text-white font-sans text-sm tracking-wide shadow-[0_12px_24px_-6px_rgba(2,33,60,0.12)] hover:bg-[#02213c]/90 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Create Bouquet
          </button>
        </div>
      </header>
    );
  }

  if (currentView === 'note') {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0_1px_8px_rgba(2,33,60,0.03)] border-b border-[#02213c]/5">
        <div className="h-20 w-full max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
          <button
            onClick={() => onNavigate('arrange')}
            className="inline-flex items-center gap-1.5 text-[#43474d] hover:text-[#1e1c00] transition-colors font-sans text-sm font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back</span>
          </button>
          
          <button
            onClick={() => onNavigate('home')}
            className="font-serif italic text-3xl md:text-4xl text-[#000816] tracking-tight hover:opacity-90 transition-opacity cursor-pointer text-center"
          >
            Thought of You
          </button>

          <button
            onClick={() => onNavigate('arrange')}
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#74777e] hover:text-[#02213c] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            <span className="hidden sm:inline">Edit Bouquet</span>
          </button>
        </div>
      </header>
    );
  }

  if (currentView === 'arrange') {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0_1px_8px_rgba(2,33,60,0.03)] border-b border-[#02213c]/5">
        <div className="h-20 max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-[#43474d] hover:text-[#1e1c00] transition-colors font-sans text-sm font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Home</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="font-serif italic text-3xl md:text-4xl text-[#000816] tracking-tight hover:opacity-90 transition-opacity cursor-pointer"
          >
            Thought of You
          </button>

          <button
            onClick={() => onNavigate('note')}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#02213c]/10 text-[#02213c] hover:bg-[#02213c] hover:text-white transition-all cursor-pointer"
          >
            <span>Write Note</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </header>
    );
  }

  // Home View
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0_1px_8px_rgba(2,33,60,0.03)] border-b border-[#02213c]/5">
      <div className="h-20 max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="font-serif text-2xl md:text-3xl italic text-[#02213c] tracking-tight">
            Thought of You
          </span>
        </button>

        <div className="flex items-center gap-6 md:gap-8">
          <nav className="flex items-center gap-6">
            <motion.button
              onClick={() => {
                if (onOpenAbout) {
                  onOpenAbout();
                } else {
                  onNavigate('about');
                }
              }}
              whileHover={{ scale: 1.08, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="font-sans text-sm text-[#43474d] hover:text-[#1e1c00] transition-colors duration-200 cursor-pointer origin-center inline-block"
            >
              About
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
};

