import React from 'react';
import { BouquetCanvas } from './BouquetCanvas';
import { StemItem } from '../types/bouquet';

interface LandingViewProps {
  onStart: () => void;
  sampleStems: StemItem[];
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart, sampleStems }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Subtle ambient pastel glow behind hero */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#eccbff]/35 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-48 right-1/4 w-[380px] h-[280px] bg-[#fcf6bd]/80 rounded-full blur-2xl pointer-events-none -z-10" />

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-5 md:px-12 pt-8 md:pt-14 pb-12 flex flex-col items-center text-center">
          {/* Overline Sub-header */}
          <p className="font-mono text-[11px] md:text-xs text-[#43474d]/85 uppercase tracking-[0.24em] mb-3">
            Beautiful Flowers Delivered Digitally
          </p>

          {/* Grand Editorial Title */}
          <h1 className="font-serif italic text-5xl sm:text-6xl md:text-7xl text-[#02213c] leading-none tracking-tight mb-4 max-w-2xl">
            Thought of You
          </h1>

          {/* Pure Poetic Subtitle */}
          <p className="font-sans text-base sm:text-lg text-[#43474d] max-w-lg mb-8 font-light leading-relaxed">
            Pick flowers for your better half,family,parents,friends and loved ones, and write a heartfelt note. Send a private link for them to unwrap.
          </p>
          <p className="font-sans text-base sm:text-lg text-[#43474d] max-w-lg mb-8 font-light leading-relaxed">~from someone who identify as a serial gifter</p>

          {/* Primary Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onStart}
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#02213c] text-white font-sans text-sm tracking-wide shadow-md hover:bg-[#02213c]/90 transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Build a Bouquet</span>
              <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
            </button>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#fcf6bd] text-[#02213c] font-sans text-sm shadow-sm hover:bg-[#f6f0b7] hover:shadow transition-all duration-200 cursor-pointer"
            >
              How It Works
            </a>
          </div>
        </section>
      </div>

      {/* Interactive Bouquet Showcase Viewport */}
      <section className="max-w-4xl mx-auto px-5 md:px-12 py-4 w-full flex flex-col items-center">
        <div
          onClick={onStart}
          className="w-full max-w-xl bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-[#02213c]/5 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
          title="Click to customize this bouquet"
        >
          <div className="absolute top-4 right-4 z-30">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#02213c] text-white font-mono text-[11px] tracking-wide shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[14px]">touch_app</span>
              <span>Tap to Customize</span>
            </span>
          </div>

          <BouquetCanvas
            stems={sampleStems}
            wrap="kraft"
            interactive={false}
            tagText="FOR YOU"
            className="h-[380px] sm:h-[420px]"
          />
        </div>
      </section>

      {/* 3-Step Journey */}
      <section className="max-w-6xl mx-auto px-5 md:px-12 py-16 w-full" id="how-it-works">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="font-mono text-xs text-[#43474d]/80 uppercase tracking-widest">
            The Gentle Ritual
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#02213c] tracking-tight mt-1.5">
            Three simple steps to say everything
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 01 */}
          <div className="bg-[#fcf6bd]/60 p-8 rounded-3xl shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:bg-[#fcf6bd] border border-[#02213c]/5">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-base font-bold text-[#02213c]">01</span>
                <div className="w-10 h-10 rounded-full bg-[#eccbff] flex items-center justify-center text-[#6e5380]">
                  <span className="material-symbols-outlined text-[20px]">filter_vintage</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl text-[#02213c] mb-2 font-medium">Pick Blooms</h3>
              <p className="font-sans text-sm text-[#43474d] leading-relaxed">
                Choose from an intimate collection of seasonal, hand-painted botanical stems. From velvet peonies to fragrant sweet pea.
              </p>
            </div>
            <div className="pt-6">
              <span className="inline-block px-3 py-1 rounded-full bg-[#fffadf] font-mono text-[11px] text-[#43474d] tracking-wide border border-[#02213c]/5">
                6–10 stems curated
              </span>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-[#fcf6bd]/60 p-8 rounded-3xl shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:bg-[#fcf6bd] border border-[#02213c]/5">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-base font-bold text-[#02213c]">02</span>
                <div className="w-10 h-10 rounded-full bg-[#c7ebd5] flex items-center justify-center text-[#012114]">
                  <span className="material-symbols-outlined text-[20px]">gesture</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl text-[#02213c] mb-2 font-medium">Hand-Tie & Wrap</h3>
              <p className="font-sans text-sm text-[#43474d] leading-relaxed">
                Adjust stem heights, rotate angles, and gather them into a parcel wrap of warm kraft paper or textured French linen.
              </p>
            </div>
            <div className="pt-6">
              <span className="inline-block px-3 py-1 rounded-full bg-[#fffadf] font-mono text-[11px] text-[#43474d] tracking-wide border border-[#02213c]/5">
                Custom ribbons & wrap
              </span>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-[#fcf6bd]/60 p-8 rounded-3xl shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:bg-[#fcf6bd] border border-[#02213c]/5">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-base font-bold text-[#02213c]">03</span>
                <div className="w-10 h-10 rounded-full bg-[#d1e4ff] flex items-center justify-center text-[#001d36]">
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </div>
              </div>
              <h3 className="font-serif text-2xl text-[#02213c] mb-2 font-medium">Write & Send</h3>
              <p className="font-sans text-sm text-[#43474d] leading-relaxed">
                Pen an honest, thoughtful note sealed with a digital wax stamp. Delivered via an unlisted link they can keep forever.
              </p>
            </div>
            <div className="pt-6">
              <span className="inline-block px-3 py-1 rounded-full bg-[#fffadf] font-mono text-[11px] text-[#43474d] tracking-wide border border-[#02213c]/5">
                Never withers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gentle Bottom Warmth CTA */}
      <section className="max-w-3xl mx-auto px-5 md:px-12 py-12 text-center w-full">
        <div className="bg-[#f0eab2]/60 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden border border-[#02213c]/5">
          <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-[#fffadf] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[#02213c] text-[20px]">yard</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#02213c] tracking-tight mb-2">
            Ready to send a little warmth?
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#43474d] max-w-md mx-auto mb-6">
            No account required. Build your arrangement in moments and share a gift that blooms on their screen.
          </p>

          <button
            onClick={onStart}
            className="inline-flex items-center justify-center h-12 px-9 rounded-full bg-[#02213c] text-white font-sans text-sm tracking-wide shadow-md hover:bg-[#02213c]/90 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Start Arranging</span>
            <span className="material-symbols-outlined ml-2 text-[18px]">spa</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#fffadf] py-10 mt-auto border-t border-[#02213c]/5">
        <div className="max-w-7xl mx-auto px-5 md:px-12 text-center">
          <p className="font-mono text-xs text-[#43474d]/75 tracking-wider uppercase">
            Thought of You • Handcrafted digital flowers delivered with care
          </p>
        </div>
      </footer>
    </div>
  );
};
