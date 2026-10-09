import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StemItem, WrapStyle, SeasonalThemeId, PaperTextureId } from '../types/bouquet';
import { SEASONAL_THEMES, getPaperTextureStyle } from '../data/seasonalThemes';

interface BouquetCanvasProps {
  stems: StemItem[];
  wrap?: WrapStyle;
  season?: SeasonalThemeId;
  texture?: PaperTextureId;
  interactive?: boolean;
  onRemoveStem?: (uid: string) => void;
  className?: string;
  tagText?: string;
  staggerAnimation?: boolean;
}

export const BouquetCanvas: React.FC<BouquetCanvasProps> = ({
  stems,
  wrap = 'kraft',
  season = 'summer',
  texture = 'parchment',
  interactive = true,
  onRemoveStem,
  className = '',
  tagText = 'FOR YOU',
  staggerAnimation = true,
}) => {
  const currentTheme = SEASONAL_THEMES[season] || SEASONAL_THEMES.summer;
  const textureStyle = getPaperTextureStyle(texture);

  const getWrapColors = (style: WrapStyle) => {
    switch (style) {
      case 'linen':
        return {
          main: '#D8D4C8',
          shadow: '#C5C0B2',
          stitch: '#A8A294',
          tagBg: '#FAF7EE'
        };
      case 'blush':
        return {
          main: '#F2D3DC',
          shadow: '#E2BDC8',
          stitch: '#C89BA9',
          tagBg: '#FFF0F5'
        };
      case 'sage':
        return {
          main: '#CBE0D1',
          shadow: '#B5CFBD',
          stitch: '#8FA897',
          tagBg: '#F0F7F2'
        };
      case 'kraft':
      default:
        return {
          main: '#E4CBB0',
          shadow: '#D8BEA1',
          stitch: '#C2A484',
          tagBg: currentTheme.badgeBg || '#FCF6BD'
        };
    }
  };

  const colors = getWrapColors(wrap);

  return (
    <div
      style={textureStyle}
      className={`relative w-full h-[460px] sm:h-[500px] flex flex-col items-center justify-end overflow-hidden transition-colors duration-500 ${className}`}
    >
      {/* Soft ambient background glow matching season */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${currentTheme.ambientGlow1}35 0%, ${currentTheme.ambientGlow2}20 50%, transparent 80%)`,
        }}
      />

      {/* Back Kraft Wrap Layer (behind stems) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-64 sm:w-76 h-64 sm:h-72 pointer-events-none z-0">
        <svg className="w-full h-full drop-shadow-sm opacity-50" viewBox="0 0 280 320" fill="none">
          <path
            d="M30 60 L140 310 L250 60 C250 60 190 40 140 40 C90 40 30 60 30 60 Z"
            fill={colors.shadow}
          />
        </svg>
      </div>

      {/* Dynamic Botanical Stems Container with Staggered Framer Motion Growth Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {stems.map((stem, index) => {
            const delayTime = staggerAnimation ? Math.min((index % 10) * 0.065, 0.45) : 0;

            return (
              <motion.div
                key={stem.uid}
                layout
                initial={{
                  opacity: 0,
                  scaleY: 0,
                  scaleX: 0.6,
                  y: 50,
                  rotate: stem.rotation,
                  x: `calc(-50% + ${stem.offsetX}px)`
                }}
                animate={{
                  opacity: 1,
                  scaleY: 1,
                  scaleX: 1,
                  y: 0,
                  rotate: stem.rotation,
                  x: `calc(-50% + ${stem.offsetX}px)`
                }}
                exit={{
                  opacity: 0,
                  scaleY: 0,
                  scaleX: 0.4,
                  y: 30,
                  transition: { duration: 0.22, ease: 'easeIn' }
                }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 22,
                  mass: 0.8,
                  delay: delayTime
                }}
                style={{
                  position: 'absolute',
                  bottom: '8rem',
                  left: '50%',
                  originY: 1,
                  transformOrigin: 'bottom center',
                  height: `${stem.height}px`,
                  zIndex: stem.zIndex || 10
                }}
                className={`flex flex-col items-center ${
                  interactive ? 'pointer-events-auto cursor-pointer group' : 'pointer-events-none'
                }`}
                onClick={(e) => {
                  if (interactive && onRemoveStem) {
                    e.stopPropagation();
                    onRemoveStem(stem.uid);
                  }
                }}
                title={interactive ? `${stem.data.name} (Tap to prune)` : stem.data.name}
              >
                {/* Prune micro-badge */}
                {interactive && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow z-30">
                    <span className="material-symbols-outlined text-[12px] leading-none">close</span>
                  </div>
                )}

                {/* Bloom flower SVG with gentle blossoming bounce */}
                <motion.div
                  initial={{ scale: 0.15, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 18,
                    delay: delayTime + 0.1
                  }}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 -mb-2 group-hover:scale-110 transition-transform duration-200 select-none"
                  dangerouslySetInnerHTML={{ __html: stem.data.svg }}
                />

                {/* Natural botanical stem stalk that grows from the base */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                    delay: delayTime
                  }}
                  style={{ originY: 1 }}
                  className="w-1.5 flex-1 bg-gradient-to-b from-[#4A7c59] to-[#3A5A40] rounded-full shadow-inner relative"
                >
                  {/* Delicate leaf node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    transition={{
                      delay: delayTime + 0.18,
                      duration: 0.2
                    }}
                    className="absolute top-1/3 -left-1.5 w-2 h-4 bg-[#4A7c59] rounded-full transform -rotate-30"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Front Kraft Parcel Wrapper & Ribbon (In front of stems) */}
      <div className="relative z-20 w-60 sm:w-72 h-64 sm:h-72 pointer-events-none flex items-end justify-center pb-2">
        <svg className="w-full h-full drop-shadow-md" fill="none" viewBox="0 0 280 320" xmlns="http://www.w3.org/2000/svg">
          {/* Main Cone Wrap */}
          <path
            d="M40 80 L140 310 L240 80 C240 80 190 120 140 120 C90 120 40 80 40 80 Z"
            fill={colors.main}
          />
          {/* Left shading fold */}
          <path
            d="M40 80 L140 310 L140 120 C90 120 40 80 40 80 Z"
            fill={colors.shadow}
            opacity="0.5"
          />
          {/* Decorative craft dashed stitch */}
          <path
            d="M40 80 Q140 125 240 80"
            stroke={colors.stitch}
            strokeDasharray="3 3"
            strokeWidth="1.5"
          />
          <path d="M40 80 L140 310" stroke={colors.stitch} strokeWidth="1" opacity="0.6" />
          <path d="M240 80 L140 310" stroke={colors.stitch} strokeWidth="1" opacity="0.6" />

          {/* Kraft Gift Tag */}
          <rect
            x="108"
            y="210"
            width="64"
            height="28"
            rx="3"
            transform="rotate(-3 140 224)"
            fill={colors.tagBg}
            stroke="#02213C"
            strokeWidth="0.8"
          />
          <text
            x="140"
            y="228"
            fill="#02213C"
            fontFamily="'Space Mono', monospace"
            fontSize="8"
            letterSpacing="1.8"
            textAnchor="middle"
            fontWeight="500"
          >
            {tagText.slice(0, 10).toUpperCase()}
          </text>

          {/* Twine knot & hanging cords */}
          <path d="M115 198 C135 204 145 204 165 198" stroke="#4A3B32" strokeLinecap="round" strokeWidth="2.5" />
          <path d="M140 201 C135 210 130 226 128 238" stroke="#4A3B32" strokeLinecap="round" strokeWidth="2" />
          <path d="M140 201 C146 211 150 228 152 239" stroke="#4A3B32" strokeLinecap="round" strokeWidth="2" />
          <circle cx="140" cy="201" r="3.5" fill="#4A3B32" />
        </svg>

        {/* Empty Canvas Guidance */}
        {stems.length === 0 && (
          <div className="absolute top-10 flex flex-col items-center pointer-events-none transition-opacity duration-300">
            <span className="material-symbols-outlined text-[#02213c] text-xl animate-bounce">arrow_downward</span>
            <span className="font-mono text-xs text-[#02213c] font-medium tracking-wide">ARRANGE HERE</span>
          </div>
        )}
      </div>
    </div>
  );
};
