import React, { useState } from 'react';
import { BouquetState } from '../types/bouquet';
import { BouquetCanvas } from './BouquetCanvas';
import { SEASONAL_THEMES, getPaperTextureStyle } from '../data/seasonalThemes';
import { sounds } from '../utils/audio';

interface UnwrapViewProps {
  bouquetState: BouquetState;
  onSendBack: () => void;
  onClose?: () => void;
}

export const UnwrapView: React.FC<UnwrapViewProps> = ({ bouquetState, onSendBack, onClose }) => {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [selectedBloom, setSelectedBloom] = useState<{ name: string; meaning?: string } | null>(null);

  const season = bouquetState.season || 'summer';
  const texture = bouquetState.texture || 'parchment';
  const currentTheme = SEASONAL_THEMES[season] || SEASONAL_THEMES.summer;
  const textureStyle = getPaperTextureStyle(texture);

  const handleBreakSeal = () => {
    sounds.playWaxBreak();
    setIsUnwrapped(true);
  };

  const getSealBg = () => {
    switch (bouquetState.seal) {
      case 'wisteria':
        return '#6f5481';
      case 'rose':
        return '#f06292';
      case 'sage':
        return '#4a7c59';
      case 'prussian':
      default:
        return '#02213c';
    }
  };

  const toneClasses = {
    chiffon: 'bg-[#fcf6bd]',
    pink: 'bg-[#eccbff]',
    mint: 'bg-[#c7ebd5]',
    sky: 'bg-[#d1e4ff]',
    wisteria: 'bg-[#f3daff]'
  };

  const fontClasses = {
    script: 'font-serif text-lg md:text-xl leading-relaxed',
    sans: 'font-sans text-base md:text-lg leading-relaxed',
    mono: 'font-mono text-sm md:text-base leading-relaxed'
  };

  return (
    <div
      style={{ backgroundColor: currentTheme.bgHex }}
      className="min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 relative overflow-hidden select-none transition-colors duration-700"
    >
      {/* Soft Ambient Glows matching Season */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-700"
        style={{ backgroundColor: `${currentTheme.ambientGlow1}45` }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[500px] h-[350px] rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-700"
        style={{ backgroundColor: `${currentTheme.ambientGlow2}35` }}
      />

      {/* Top Header Bar */}
      <header className="w-full max-w-4xl flex items-center justify-between z-30 pt-2 pb-4">
        {onClose ? (
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#43474d] hover:text-[#000816] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Editor</span>
          </button>
        ) : (
          <div className="w-20" />
        )}

        <div className="flex flex-col items-center">
          <h1 className="font-serif italic text-2xl sm:text-3xl text-[#02213c] tracking-tight">
            Thought of You
          </h1>
          <span className="font-mono text-[10px] text-[#74777e] uppercase tracking-wider">
            {currentTheme.name}
          </span>
        </div>

        <div className="w-20 flex justify-end">
          <button
            onClick={onSendBack}
            className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#02213c] hover:underline cursor-pointer"
          >
            <span>Send a Flower</span>
          </button>
        </div>
      </header>

      {/* Main Experience Viewport */}
      <main className="w-full max-w-3xl flex-grow flex flex-col items-center justify-center my-4 relative">
        {!isUnwrapped ? (
          /* STATE 1: Sealed Parcel Waiting to be Broken */
          <div className="w-full max-w-md flex flex-col items-center text-center animate-in fade-in duration-500">
            <p className="font-mono text-xs uppercase tracking-widest text-[#43474d] mb-4">
              A private digital bouquet has arrived for you
            </p>

            {/* Sealed Parcel Graphic with Paper Texture */}
            <div
              style={{ ...textureStyle, backgroundColor: currentTheme.cardHex }}
              className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-3xl shadow-xl border border-[#02213c]/10 flex flex-col items-center justify-center p-6 transform transition-transform hover:scale-102"
            >
              {/* Crossed parchment wrapping ribbons */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-[#e4cbb0] opacity-80 pointer-events-none" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-[#e4cbb0] opacity-80 pointer-events-none" />

              {/* Gift Parcel Tag */}
              <div className="relative z-10 bg-white/90 px-4 py-2 rounded-lg shadow-sm border border-[#02213c]/10 mb-6 transform -rotate-2">
                <span className="font-mono text-xs text-[#02213c] tracking-wider uppercase font-semibold">
                  {bouquetState.title || 'FOR YOU'}
                </span>
              </div>

              {/* The Wax Seal Button */}
              <button
                type="button"
                onClick={handleBreakSeal}
                className="relative z-20 group cursor-pointer flex flex-col items-center"
                title="Click to break seal & unwrap"
              >
                <div
                  className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white transition-all transform group-hover:scale-110 group-active:scale-95 animate-pulse"
                  style={{ backgroundColor: getSealBg() }}
                >
                  <span className="material-symbols-outlined text-[28px]">spa</span>
                </div>

                <div className="mt-4 px-3 py-1 rounded-full bg-white/95 text-[#02213c] font-mono text-[10px] uppercase tracking-wider shadow-xs group-hover:bg-[#02213c] group-hover:text-white transition-colors">
                  Tap seal to unwrap
                </div>
              </button>
            </div>

            <p className="font-sans text-xs text-[#74777e] mt-6">
              Hand-tied botanical stems sealed with warm wax
            </p>
          </div>
        ) : (
          /* STATE 2: Unwrapped Bouquet & Heartfelt Letter */
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 animate-in fade-in zoom-in-95 duration-700">
            {/* Left: The Handcrafted Bouquet */}
            <div className="w-full max-w-sm flex flex-col items-center">
              <div className="w-full bg-white/60 rounded-3xl p-4 shadow-sm border border-[#02213c]/5">
                <BouquetCanvas
                  stems={bouquetState.stems}
                  wrap={bouquetState.wrap}
                  season={season}
                  texture={texture}
                  interactive={true}
                  onRemoveStem={(uid) => {
                    const found = bouquetState.stems.find(s => s.uid === uid);
                    if (found) {
                      setSelectedBloom({ name: found.data.name, meaning: found.data.meaning });
                    }
                  }}
                  tagText={bouquetState.title || 'FOR YOU'}
                  className="h-[380px] sm:h-[420px]"
                />
              </div>

              {/* Selected Bloom Meaning Tooltip */}
              {selectedBloom && (
                <div className="mt-3 px-4 py-2 rounded-full bg-white shadow-xs border border-[#02213c]/10 text-center animate-in fade-in duration-200">
                  <span className="font-serif text-xs font-semibold text-[#02213c]">{selectedBloom.name}</span>
                  {selectedBloom.meaning && (
                    <span className="font-sans text-xs text-[#43474d] ml-1.5 italic">
                      · "{selectedBloom.meaning}"
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Right: The Handwritten Stationery Note with Paper Texture */}
            <div className="w-full max-w-md flex flex-col gap-4">
              <div
                style={textureStyle}
                className={`relative rounded-3xl p-6 sm:p-8 shadow-lg border border-[#02213c]/10 min-h-[340px] flex flex-col justify-between transition-all duration-300 ${
                  toneClasses[bouquetState.tone]
                }`}
              >
                {/* Note Header */}
                <div className="flex items-center justify-between border-b border-[#02213c]/10 pb-3 mb-4">
                  <span className="font-serif italic text-sm text-[#02213c] font-medium">
                    {bouquetState.title || 'Thought of You'}
                  </span>
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: getSealBg() }}
                  >
                    <span className="material-symbols-outlined text-[12px]">spa</span>
                  </div>
                </div>

                {/* Message Prose */}
                <div className="w-full flex-grow my-2 whitespace-pre-wrap text-[#000816]">
                  <p className={fontClasses[bouquetState.typeface]}>
                    {bouquetState.message}
                  </p>
                </div>

                {/* Wax Stamp Seal at Bottom */}
                <div className="pt-4 border-t border-[#02213c]/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#43474d]/70 tracking-widest uppercase">
                    Delivered with care · {currentTheme.seasonLabel}
                  </span>

                  <div
                    className="w-7 h-7 rounded-full shadow-sm flex items-center justify-center text-white"
                    style={{ backgroundColor: getSealBg() }}
                  >
                    <span className="material-symbols-outlined text-[16px]">spa</span>
                  </div>
                </div>
              </div>

              {/* Recipient Action Row */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onSendBack}
                  className="px-6 py-2.5 rounded-full bg-[#02213c] text-white font-sans text-xs font-medium hover:bg-[#02213c]/90 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                  <span>Send a Bouquet Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsUnwrapped(false)}
                  className="px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-[#02213c] font-sans text-xs border border-[#02213c]/10 transition-all cursor-pointer"
                >
                  Re-wrap
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-3 z-30">
        <p className="font-mono text-[11px] text-[#43474d]/70 uppercase tracking-widest">
          Thought of You • Handcrafted digital flowers that never wither
        </p>
      </footer>
    </div>
  );
};
