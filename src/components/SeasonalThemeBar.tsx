import React from 'react';
import { motion } from 'motion/react';
import { SeasonalThemeId, PaperTextureId } from '../types/bouquet';
import { SEASONAL_THEMES, PAPER_TEXTURES } from '../data/seasonalThemes';
import { sounds } from '../utils/audio';

interface SeasonalThemeBarProps {
  currentSeason: SeasonalThemeId;
  currentTexture: PaperTextureId;
  onSelectSeason: (season: SeasonalThemeId) => void;
  onSelectTexture: (texture: PaperTextureId) => void;
  compact?: boolean;
}

export const SeasonalThemeBar: React.FC<SeasonalThemeBarProps> = ({
  currentSeason,
  currentTexture,
  onSelectSeason,
  onSelectTexture,
  compact = false,
}) => {
  const activeTheme = SEASONAL_THEMES[currentSeason];

  return (
    <div className={`w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/70 backdrop-blur-md rounded-2xl p-3 sm:px-4 shadow-xs border border-[#02213c]/10 transition-colors ${compact ? 'text-xs' : ''}`}>
      {/* Seasons Selector */}
      <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#74777e] font-semibold whitespace-nowrap pl-1">
          Season:
        </span>
        <div className="flex items-center gap-1.5">
          {(Object.keys(SEASONAL_THEMES) as SeasonalThemeId[]).map((seasonId) => {
            const theme = SEASONAL_THEMES[seasonId];
            const isSelected = currentSeason === seasonId;

            return (
              <motion.button
                key={seasonId}
                type="button"
                onClick={() => {
                  sounds.playAdd();
                  onSelectSeason(seasonId);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                  isSelected
                    ? 'bg-[#02213c] text-white font-medium shadow-xs ring-1 ring-[#02213c]'
                    : 'bg-white/80 hover:bg-white text-[#43474d] border border-[#02213c]/5'
                }`}
                title={theme.tagline}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/15 shrink-0"
                  style={{ backgroundColor: theme.cardHex }}
                />
                <span className="material-symbols-outlined text-[14px]">
                  {theme.icon}
                </span>
                <span>{theme.seasonLabel}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Paper Texture Selector */}
      <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end overflow-x-auto pb-1 sm:pb-0">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#74777e] font-semibold whitespace-nowrap pl-1">
          Paper:
        </span>
        <div className="inline-flex p-0.5 bg-white/80 rounded-full border border-[#02213c]/10 text-xs">
          {PAPER_TEXTURES.map((tex) => {
            const isSelected = currentTexture === tex.id;

            return (
              <button
                key={tex.id}
                type="button"
                onClick={() => {
                  sounds.playAdd();
                  onSelectTexture(tex.id);
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#02213c] text-white font-medium'
                    : 'text-[#43474d] hover:text-[#000816]'
                }`}
                title={tex.description}
              >
                {tex.preview}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
