import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { StationeryTone, TypefaceStyle } from '../types/bouquet';

interface AboutViewProps {
  onStart?: () => void;
  onBack?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = () => {
  const [authorMessage, setAuthorMessage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('thought_of_you_curator_message');
      if (saved) return saved;
    }
    return `Welcome to Thought of You.\n\nIn a world where most communication is instant and quickly forgotten, we wanted to build something quiet and intentional. Here, flowers don't fade, and kind words can be unboxed as if opening a physical letter from an old friend.\n\nTake your time. Pick each stem with care, tie it with warm kraft paper, and send a little warmth to someone who crossed your mind today.\n\nWarmly,\nThe Atelier`;
  });

  const [tone, setTone] = useState<StationeryTone>('chiffon');
  const [typeface, setTypeface] = useState<TypefaceStyle>('script');
  const [savedBadge, setSavedBadge] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('thought_of_you_curator_message', authorMessage);
      setSavedBadge(true);
      const timer = setTimeout(() => setSavedBadge(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [authorMessage]);

  const toneClasses: Record<StationeryTone, string> = {
    chiffon: 'bg-[#fcf6bd]',
    pink: 'bg-[#eccbff]',
    mint: 'bg-[#c7ebd5]',
    sky: 'bg-[#d1e4ff]',
    wisteria: 'bg-[#f3daff]'
  };

  const fontClasses: Record<TypefaceStyle, string> = {
    script: 'font-serif text-lg md:text-xl leading-relaxed',
    sans: 'font-sans text-base md:text-lg leading-relaxed',
    mono: 'font-mono text-sm md:text-base leading-relaxed'
  };

  const handleCopyMessage = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(authorMessage).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] px-5 md:px-12 py-10 max-w-5xl mx-auto flex flex-col items-center">
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#02213c] leading-tight tracking-tight">
          Thought of You
        </h1>
      </section>

      {/* Interactive Letter / Message Section */}
      <section className="w-full max-w-3xl mb-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="font-serif text-2xl text-[#000816] font-medium tracking-tight">
              A Message from the Curator
            </h2>
            <p className="font-mono text-xs text-[#74777e] tracking-wide mt-0.5">
              Write and personalize your message here · Auto-saves to your atelier
            </p>
          </div>

          {/* Tone & Font Controls */}
          <div className="flex items-center gap-4">
            {/* Tone Selector */}
            <div className="flex items-center gap-1.5 bg-white/70 px-2 py-1.5 rounded-full border border-[#02213c]/10 shadow-xs">
              {(['chiffon', 'pink', 'mint', 'sky', 'wisteria'] as StationeryTone[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`w-5 h-5 rounded-full transition-transform hover:scale-110 cursor-pointer ${
                    t === 'chiffon' ? 'bg-[#fcf6bd]' :
                    t === 'pink' ? 'bg-[#eccbff]' :
                    t === 'mint' ? 'bg-[#c7ebd5]' :
                    t === 'sky' ? 'bg-[#d1e4ff]' : 'bg-[#f3daff]'
                  } ${tone === t ? 'ring-2 ring-[#02213c] ring-offset-1' : ''}`}
                  title={t}
                />
              ))}
            </div>

            {/* Typography Selector */}
            <div className="inline-flex p-1 bg-white/70 rounded-full border border-[#02213c]/10 text-xs shadow-xs">
              <button
                type="button"
                onClick={() => setTypeface('script')}
                className={`font-serif px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  typeface === 'script' ? 'bg-[#000816] text-white' : 'text-[#43474d]'
                }`}
              >
                Serif
              </button>
              <button
                type="button"
                onClick={() => setTypeface('sans')}
                className={`font-sans px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  typeface === 'sans' ? 'bg-[#000816] text-white' : 'text-[#43474d]'
                }`}
              >
                Clean
              </button>
              <button
                type="button"
                onClick={() => setTypeface('mono')}
                className={`font-mono px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  typeface === 'mono' ? 'bg-[#000816] text-white' : 'text-[#43474d]'
                }`}
              >
                Mono
              </button>
            </div>
          </div>
        </div>

        {/* The Tactile Note Sheet */}
        <div
          className={`relative rounded-3xl p-6 sm:p-10 shadow-lg border border-[#02213c]/10 transition-colors duration-300 flex flex-col justify-between min-h-[380px] ${toneClasses[tone]}`}
        >
          {/* Note Header */}
          <div className="flex items-center justify-between border-b border-[#02213c]/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#02213c] text-sm">edit_note</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#02213c] font-semibold">
                Your Atelier Message
              </span>
            </div>

            <div className="flex items-center gap-3">
              {savedBadge && (
                <span className="font-mono text-[11px] text-[#042518] bg-[#c7ebd5] px-2 py-0.5 rounded-full animate-in fade-in">
                  Saved
                </span>
              )}
              <span className="font-mono text-[10px] text-[#43474d]/75">
                {authorMessage.length} characters
              </span>
            </div>
          </div>

          {/* Editable Text Area */}
          <textarea
            value={authorMessage}
            onChange={(e) => setAuthorMessage(e.target.value)}
            rows={9}
            placeholder="Write your personal atelier note or letter here..."
            className={`w-full bg-transparent resize-none border-0 outline-none focus:outline-none focus:ring-0 text-[#000816] placeholder:text-[#43474d]/40 ${fontClasses[typeface]}`}
          />

          {/* Note Footer with Wax Seal stamp */}
          <div className="pt-4 mt-4 border-t border-[#02213c]/10 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#43474d]/70 tracking-widest uppercase">
              Thought of You · Digital Keepsake
            </span>

            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={handleCopyMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 hover:bg-white text-xs font-mono text-[#02213c] border border-[#02213c]/10 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </motion.button>

              <div
                className="w-8 h-8 rounded-full bg-[#02213c] shadow-sm flex items-center justify-center text-white"
                title="Prussian Wax Seal"
              >
                <span className="material-symbols-outlined text-[16px]">spa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars of Thought of You */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="bg-[#fcf6bd]/60 p-6 rounded-2xl border border-[#02213c]/5">
          <div className="w-9 h-9 rounded-full bg-[#eccbff] flex items-center justify-center text-[#6e5380] mb-3">
            <span className="material-symbols-outlined text-[18px]">brush</span>
          </div>
          <h3 className="font-serif text-lg text-[#000816] mb-1 font-medium">Handcrafted Botanical Stems</h3>
          <p className="font-sans text-xs text-[#43474d] leading-relaxed">
            Every petal, stem, and stamen is drawn as vector artwork with subtle color gradients, creating organic life on your screen.
          </p>
        </div>

        <div className="bg-[#fcf6bd]/60 p-6 rounded-2xl border border-[#02213c]/5">
          <div className="w-9 h-9 rounded-full bg-[#c7ebd5] flex items-center justify-center text-[#012114] mb-3">
            <span className="material-symbols-outlined text-[18px]">lock</span>
          </div>
          <h3 className="font-serif text-lg text-[#000816] mb-1 font-medium">Private Unlisted Link</h3>
          <p className="font-sans text-xs text-[#43474d] leading-relaxed">
            No advertisements or accounts required. Your arrangement and letter exist exclusively at a private unboxing URL for your recipient.
          </p>
        </div>

        <div className="bg-[#fcf6bd]/60 p-6 rounded-2xl border border-[#02213c]/5">
          <div className="w-9 h-9 rounded-full bg-[#d1e4ff] flex items-center justify-center text-[#001d36] mb-3">
            <span className="material-symbols-outlined text-[18px]">eco</span>
          </div>
          <h3 className="font-serif text-lg text-[#000816] mb-1 font-medium">Never Withers</h3>
          <p className="font-sans text-xs text-[#43474d] leading-relaxed">
            Unlike cut flowers that fade within a week, this digital bouquet blooms indefinitely whenever reopened in any browser.
          </p>
        </div>
      </section>
    </div>
  );
};
