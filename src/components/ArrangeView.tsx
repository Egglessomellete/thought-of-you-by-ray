import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { FLORAL_DATABASE } from '../data/flowers';
import { FlowerData, StemItem, WrapStyle, SeasonalThemeId, PaperTextureId } from '../types/bouquet';
import { SEASONAL_THEMES, getPaperTextureStyle } from '../data/seasonalThemes';
import { BouquetCanvas } from './BouquetCanvas';
import { FlowerCraftModal } from './FlowerCraftModal';
import { SeasonalThemeBar } from './SeasonalThemeBar';
import { sounds } from '../utils/audio';

interface ArrangeViewProps {
  bouquet: StemItem[];
  wrap: WrapStyle;
  season?: SeasonalThemeId;
  texture?: PaperTextureId;
  customFlowers?: FlowerData[];
  onAddFlower: (flowerId: string) => void;
  onRemoveStem: (uid: string) => void;
  onShuffle: () => void;
  onClear: () => void;
  onNext: () => void;
  onSetWrap?: (wrap: WrapStyle) => void;
  onSelectSeason?: (season: SeasonalThemeId) => void;
  onSelectTexture?: (texture: PaperTextureId) => void;
  onSaveCustomFlower?: (flower: FlowerData) => void;
  onDeleteCustomFlower?: (flowerId: string) => void;
}

export const ArrangeView: React.FC<ArrangeViewProps> = ({
  bouquet,
  wrap,
  season = 'summer',
  texture = 'parchment',
  customFlowers = [],
  onAddFlower,
  onRemoveStem,
  onShuffle,
  onClear,
  onNext,
  onSelectSeason,
  onSelectTexture,
  onSaveCustomFlower,
  onDeleteCustomFlower,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCraftModalOpen, setIsCraftModalOpen] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shelfRef = useRef<HTMLDivElement>(null);

  const MAX_BLOOMS = 10;
  const MIN_BLOOMS = 6;

  const allFlowers = [...customFlowers, ...FLORAL_DATABASE];
  const currentTheme = SEASONAL_THEMES[season] || SEASONAL_THEMES.summer;
  const textureStyle = getPaperTextureStyle(texture);

  const showToast = (text: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(text);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleAdd = (flowerId: string) => {
    if (bouquet.length >= MAX_BLOOMS) {
      showToast('Maximum of 10 stems reached');
      return;
    }
    const flower = allFlowers.find(f => f.id === flowerId);
    if (flower) {
      sounds.playAdd();
      onAddFlower(flowerId);
      showToast(`Added ${flower.name}`);
    }
  };

  const handleRemove = (uid: string) => {
    const stem = bouquet.find(s => s.uid === uid);
    if (stem) {
      sounds.playPrune();
      onRemoveStem(uid);
      showToast(`Pruned ${stem.data.name}`);
    }
  };

  const handleShuffle = () => {
    if (bouquet.length === 0) return;
    sounds.playAdd();
    onShuffle();
    showToast('Re-arranged stems');
  };

  const handleClear = () => {
    if (bouquet.length === 0) return;
    onClear();
    showToast('Bouquet cleared');
  };

  const handleDragStart = (e: React.DragEvent, flowerId: string) => {
    e.dataTransfer.setData('text/plain', flowerId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const flowerId = e.dataTransfer.getData('text/plain');
    if (flowerId) {
      handleAdd(flowerId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const canProceed = bouquet.length >= MIN_BLOOMS;

  return (
    <div className="w-full min-h-[calc(100vh-80px)] px-3 sm:px-6 md:px-12 py-6 flex flex-col items-center select-none max-w-6xl mx-auto">
      {/* Editorial Header */}
      <header className="text-center flex flex-col items-center gap-1 mb-6">
        <h1 className="font-serif italic text-4xl sm:text-5xl text-[#000816] leading-none tracking-tight">
          Thought of You
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <p className="font-mono text-xs tracking-widest uppercase text-[#43474d]">
            Curate 6 to 10 stems
          </p>
          <span className="text-[#43474d]/50">·</span>
          <button
            onClick={() => setIsCraftModalOpen(true)}
            className="font-mono text-xs text-[#02213c] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">palette</span>
            <span>+ Craft Handmade Stem</span>
          </button>
        </div>
      </header>

      {/* Flower Shelf Carousel */}
      <section className="w-full mb-6 relative">
        <div
          ref={shelfRef}
          className="w-full flex items-center justify-start lg:justify-center gap-3 sm:gap-4 overflow-x-auto pb-3 pt-1 px-2 scrollbar-none snap-x cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Handmade Flower Atelier Card */}
          <motion.div
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsCraftModalOpen(true)}
            className="flex-shrink-0 flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#fcf6bd]/70 hover:bg-[#fcf6bd] border-2 border-dashed border-[#02213c]/30 hover:border-[#02213c] transition-all duration-200 cursor-pointer snap-start w-20 sm:w-24 group shadow-xs"
            title="Design or paste your own handmade flower"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex flex-col items-center justify-center rounded-full bg-white/80 group-hover:bg-white text-[#02213c] transition-colors shadow-xs">
              <span className="material-symbols-outlined text-[24px] group-hover:rotate-45 transition-transform duration-300">
                palette
              </span>
            </div>

            <span className="font-serif text-[11px] font-medium leading-tight text-[#000816] text-center mt-2 truncate w-full">
              Craft Stem
            </span>

            <span className="font-mono text-[9px] uppercase tracking-wider text-[#02213c] font-bold mt-1">
              + Handmade
            </span>
          </motion.div>

          {/* All Floral Stems (Custom + Curated Database) */}
          {allFlowers.map((flower) => {
            const isCustom = flower.id.startsWith('custom-');

            return (
              <div
                key={flower.id}
                draggable
                onDragStart={(e) => handleDragStart(e, flower.id)}
                className="flex-shrink-0 snap-start"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAdd(flower.id)}
                  className={`flex flex-col items-center p-2.5 rounded-2xl transition-all duration-200 cursor-pointer group w-20 sm:w-24 relative ${
                    isCustom
                      ? 'bg-[#fff9e6] hover:bg-white hover:shadow-md border border-[#02213c]/20'
                      : 'bg-white/80 hover:bg-white hover:shadow-md border border-[#02213c]/5'
                  }`}
                  title={`Add ${flower.name} (${flower.meaning || ''})`}
                >
                {/* Custom Flower indicator */}
                {isCustom && (
                  <span className="absolute -top-1.5 -right-1 bg-[#02213c] text-white text-[8px] font-mono px-1.5 py-0.5 rounded-full shadow-xs">
                    Maker
                  </span>
                )}

                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-[#f6f0b7]/30 group-hover:scale-110 transition-transform duration-300">
                  <div
                    className="w-full h-full p-1"
                    dangerouslySetInnerHTML={{ __html: flower.svg }}
                  />
                </div>

                <span className="font-serif text-[11px] font-medium leading-tight text-[#000816] text-center mt-2 truncate w-full">
                  {flower.name}
                </span>

                <span className="font-mono text-[9px] uppercase tracking-wider text-[#74777e] group-hover:text-[#02213c] font-semibold mt-1">
                  + Add
                </span>
              </motion.div>
            </div>
            );
          })}
        </div>
      </section>

      {/* Seasonal Paper Texture & Background Theme Bar */}
      {onSelectSeason && onSelectTexture && (
        <div className="w-full max-w-2xl mb-4">
          <SeasonalThemeBar
            currentSeason={season}
            currentTexture={texture}
            onSelectSeason={onSelectSeason}
            onSelectTexture={onSelectTexture}
          />
        </div>
      )}

      {/* Main Arrangement Staging Canvas */}
      <section
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          backgroundColor: `${currentTheme.cardHex}B3`,
          ...textureStyle
        }}
        className="relative w-full max-w-2xl h-[460px] sm:h-[500px] flex flex-col items-center justify-end rounded-3xl backdrop-blur-md p-4 sm:p-6 shadow-sm border border-[#02213c]/10 overflow-hidden mb-6 transition-all duration-500"
      >
        {/* Top-Left Counters & Prune instruction */}
        <div className="absolute top-4 left-4 z-30 flex flex-col gap-1.5 items-start">
          <div
            style={{ backgroundColor: `${currentTheme.badgeBg}EE` }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[#000816] shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px] leading-none">local_florist</span>
            <span className="font-mono text-xs tracking-wider font-semibold uppercase">
              BLOOMS: {bouquet.length} / {MAX_BLOOMS}
            </span>
          </div>

          <span className="font-mono text-[10px] text-[#43474d]/85 pl-1 tracking-wider uppercase font-medium">
            TAP STEM TO PRUNE
          </span>
        </div>

        {/* Top-Right Canvas Actions: Shuffle & Clear */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={handleShuffle}
            title="Re-jig Bouquet Stems"
            style={{ backgroundColor: `${currentTheme.badgeBg}D9` }}
            className="w-9 h-9 rounded-full hover:brightness-105 text-[#000816] transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">casino</span>
          </button>

          <button
            onClick={handleClear}
            title="Clear Canvas"
            style={{ backgroundColor: `${currentTheme.badgeBg}D9` }}
            className="w-9 h-9 rounded-full hover:brightness-105 text-[#000816] transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          </button>
        </div>

        {/* Dynamic Bouquet Canvas */}
        <BouquetCanvas
          stems={bouquet}
          wrap={wrap}
          season={season}
          texture={texture}
          interactive={true}
          onRemoveStem={handleRemove}
          tagText="FOR YOU"
          className="h-[460px] sm:h-[500px]"
        />
      </section>

      {/* Footer Stepper Controls */}
      <footer className="w-full flex flex-col items-center gap-3">
        <p className="font-mono text-xs text-center transition-colors">
          {bouquet.length < MIN_BLOOMS ? (
            <span className="text-[#43474d]">
              Curate {MIN_BLOOMS - bouquet.length} more bloom
              {MIN_BLOOMS - bouquet.length > 1 ? 's' : ''} to complete bouquet
            </span>
          ) : (
            <span className="text-[#02213c] font-medium">
              Bouquet ready to accompany your sentiments ({bouquet.length} blooms)
            </span>
          )}
        </p>

        <button
          onClick={() => {
            if (!canProceed) {
              showToast(`Please choose at least ${MIN_BLOOMS} blooms.`);
              return;
            }
            onNext();
          }}
          disabled={!canProceed}
          className={`group relative px-8 py-3.5 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 flex items-center gap-2.5 shadow-md ${
            canProceed
              ? 'bg-[#000816] text-white hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-[#000816]/30 text-white/70 cursor-not-allowed'
          }`}
        >
          <span>Next: Write Note</span>
          <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">
            arrow_forward
          </span>
        </button>
      </footer>

      {/* Tactile Micro-Toast */}
      <div
        className={`fixed bottom-6 z-50 transform transition-all duration-300 bg-[#02213c] text-white font-mono text-xs px-4 py-2 rounded-full shadow-lg pointer-events-none flex items-center gap-2 ${
          toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <span className="material-symbols-outlined text-sm">spa</span>
        <span>{toastMessage}</span>
      </div>

      {/* Handmade Flower Crafting Modal */}
      <FlowerCraftModal
        isOpen={isCraftModalOpen}
        onClose={() => setIsCraftModalOpen(false)}
        onSaveFlower={(flower) => {
          onSaveCustomFlower?.(flower);
          showToast(`Crafted handmade ${flower.name}!`);
        }}
      />
    </div>
  );
};

