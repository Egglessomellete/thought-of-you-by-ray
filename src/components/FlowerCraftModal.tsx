import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { FlowerData } from '../types/bouquet';

interface FlowerCraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveFlower: (flower: FlowerData) => void;
}

type FlowerShapePreset = 'daisy' | 'rose' | 'lily' | 'poppy' | 'ranunculus';

const PRESET_PALETTES = [
  { name: 'Sunset Peach', petal: '#FFB385', inner: '#FF844B', core: '#6B3E11' },
  { name: 'Blush Velvet', petal: '#F7CAD0', inner: '#EE6983', core: '#850E35' },
  { name: 'Golden Glow', petal: '#FFE169', inner: '#FAD02C', core: '#5C3D2E' },
  { name: 'Sage & Mint', petal: '#B7E4C7', inner: '#74C69D', core: '#2D6A4F' },
  { name: 'Lavender Mist', petal: '#D8B4E2', inner: '#AE75B8', core: '#4A2545' },
  { name: 'Cornflower Sky', petal: '#A2D2FF', inner: '#68B0AB', core: '#1D3557' },
];

export const FlowerCraftModal: React.FC<FlowerCraftModalProps> = ({
  isOpen,
  onClose,
  onSaveFlower,
}) => {
  const [tab, setTab] = useState<'studio' | 'svg'>('studio');
  const [name, setName] = useState('Golden Marigold');
  const [botanicalName, setBotanicalName] = useState('Tagetes erecta');
  const [meaning, setMeaning] = useState('Warmth, creativity & radiant joy');
  
  // Studio generator parameters
  const [shape, setShape] = useState<FlowerShapePreset>('daisy');
  const [petalColor, setPetalColor] = useState('#FFB385');
  const [innerColor, setInnerColor] = useState('#FF844B');
  const [coreColor, setCoreColor] = useState('#6B3E11');
  const [petalCount, setPetalCount] = useState(8);
  
  // Custom SVG code
  const [rawSvg, setRawSvg] = useState('');
  const [svgError, setSvgError] = useState('');

  // Generate SVG string based on current studio settings
  const generatedSvg = useMemo(() => {
    if (tab === 'svg' && rawSvg.trim()) {
      // Clean and sanitize custom SVG
      let cleaned = rawSvg.trim();
      // Ensure SVG has proper viewBox
      if (!cleaned.includes('viewBox')) {
        cleaned = cleaned.replace('<svg', '<svg viewBox="0 0 100 100"');
      }
      return cleaned;
    }

    if (shape === 'daisy') {
      const angles = Array.from({ length: petalCount }, (_, i) => (360 / petalCount) * i);
      const petals = angles
        .map(
          (angle) =>
            `<ellipse cx="50" cy="24" rx="7" ry="18" fill="${petalColor}" transform="rotate(${angle} 50 50)" />`
        )
        .join('');
      const innerPetals = angles
        .map(
          (angle) =>
            `<ellipse cx="50" cy="30" rx="4" ry="12" fill="${innerColor}" opacity="0.6" transform="rotate(${angle} 50 50)" />`
        )
        .join('');

      return `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
        <g>${petals}</g>
        <g>${innerPetals}</g>
        <circle cx="50" cy="50" r="14" fill="${coreColor}" />
        <circle cx="50" cy="50" r="10" fill="#FFF59D" opacity="0.3" />
        <circle cx="50" cy="50" r="4" fill="#FFFFFF" opacity="0.5" />
      </svg>`;
    }

    if (shape === 'rose') {
      return `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
        <circle cx="50" cy="50" r="34" fill="${petalColor}" />
        <path d="M26 44 C28 28 46 26 50 32 C58 26 74 28 74 44 C76 62 60 72 50 72 C36 72 24 62 26 44 Z" fill="${innerColor}" />
        <path d="M34 48 C36 38 46 36 50 40 C56 36 64 38 66 48 C66 58 58 64 50 64 C42 64 34 58 34 48 Z" fill="${petalColor}" opacity="0.8" />
        <path d="M42 50 C45 44 55 44 58 50 C58 56 42 56 42 50 Z" fill="${coreColor}" />
        <circle cx="50" cy="50" r="4" fill="#FFE082" />
      </svg>`;
    }

    if (shape === 'lily') {
      const angles = [0, 60, 120, 180, 240, 300];
      const petals = angles
        .map(
          (angle) =>
            `<ellipse cx="50" cy="22" rx="10" ry="24" fill="${petalColor}" transform="rotate(${angle} 50 50)" />`
        )
        .join('');
      const accents = angles
        .map(
          (angle) =>
            `<ellipse cx="50" cy="30" rx="5" ry="16" fill="${innerColor}" opacity="0.6" transform="rotate(${angle} 50 50)" />`
        )
        .join('');

      return `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
        <g>${petals}</g>
        <g>${accents}</g>
        <circle cx="50" cy="50" r="8" fill="${coreColor}" />
        <circle cx="50" cy="50" r="4" fill="#FFE082" />
      </svg>`;
    }

    if (shape === 'poppy') {
      return `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
        <circle cx="40" cy="40" r="24" fill="${petalColor}" />
        <circle cx="60" cy="40" r="24" fill="${petalColor}" />
        <circle cx="50" cy="62" r="24" fill="${innerColor}" />
        <circle cx="50" cy="48" r="13" fill="${coreColor}" />
        <circle cx="50" cy="48" r="7" fill="#757575" />
        <circle cx="50" cy="48" r="3" fill="#FFFFFF" opacity="0.6" />
      </svg>`;
    }

    // Ranunculus
    return `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <circle cx="50" cy="50" r="36" fill="${petalColor}" />
      <circle cx="50" cy="50" r="28" fill="${innerColor}" opacity="0.8" />
      <circle cx="50" cy="50" r="20" fill="${petalColor}" opacity="0.9" />
      <circle cx="50" cy="50" r="14" fill="${innerColor}" />
      <circle cx="50" cy="50" r="7" fill="${coreColor}" />
      <circle cx="50" cy="50" r="3" fill="#FFF59D" />
    </svg>`;
  }, [tab, rawSvg, shape, petalColor, innerColor, coreColor, petalCount]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      return;
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newFlower: FlowerData = {
      id: `custom-${slug}-${Date.now().toString(36)}`,
      name: name.trim(),
      botanicalName: botanicalName.trim() || undefined,
      meaning: meaning.trim() || undefined,
      color: petalColor,
      darkColor: innerColor,
      svg: generatedSvg,
    };

    onSaveFlower(newFlower);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#02213c]/35 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#fffadf] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#02213c]/10 flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#02213c]/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#eccbff] flex items-center justify-center text-[#6e5380]">
              <span className="material-symbols-outlined text-[18px]">palette</span>
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#000816] font-semibold leading-tight">
                Craft Your Handmade Flower
              </h2>
              <p className="font-mono text-[11px] text-[#43474d] tracking-wide mt-0.5">
                Design a custom botanical stem to add to your shelf & bouquet
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#74777e] hover:text-[#000816] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab switch */}
        <div className="inline-flex p-1 bg-white/70 rounded-full border border-[#02213c]/10 text-xs font-mono mb-5 self-start shadow-xs">
          <button
            type="button"
            onClick={() => setTab('studio')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              tab === 'studio'
                ? 'bg-[#000816] text-white font-medium shadow-xs'
                : 'text-[#43474d] hover:text-[#000816]'
            }`}
          >
            Botanical Studio
          </button>
          <button
            type="button"
            onClick={() => setTab('svg')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              tab === 'svg'
                ? 'bg-[#000816] text-white font-medium shadow-xs'
                : 'text-[#43474d] hover:text-[#000816]'
            }`}
          >
            Paste Custom SVG Code
          </button>
        </div>

        {/* Studio Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
          {/* Left Column: Form Controls */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Flower Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#43474d] font-semibold block mb-1">
                  Flower Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Starlight Dahlia"
                  className="w-full bg-white/80 border border-[#02213c]/15 rounded-xl px-3 py-2 text-xs font-serif text-[#000816] outline-none focus:border-[#02213c]"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#43474d] font-semibold block mb-1">
                  Botanical Name (Latin)
                </label>
                <input
                  type="text"
                  value={botanicalName}
                  onChange={(e) => setBotanicalName(e.target.value)}
                  placeholder="e.g. Dahlia pinnata"
                  className="w-full bg-white/80 border border-[#02213c]/15 rounded-xl px-3 py-2 text-xs font-sans italic text-[#000816] outline-none focus:border-[#02213c]"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#43474d] font-semibold block mb-1">
                Botanical Meaning
              </label>
              <input
                type="text"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="e.g. Elegant poise & inner devotion"
                className="w-full bg-white/80 border border-[#02213c]/15 rounded-xl px-3 py-2 text-xs font-sans text-[#000816] outline-none focus:border-[#02213c]"
              />
            </div>

            {tab === 'studio' ? (
              <>
                {/* Shape Presets */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#43474d] font-semibold block mb-1.5">
                    Petal Silhouette
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(['daisy', 'rose', 'lily', 'poppy', 'ranunculus'] as FlowerShapePreset[]).map(
                      (preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setShape(preset)}
                          className={`px-2 py-1.5 rounded-xl border text-[11px] font-sans capitalize transition-all cursor-pointer text-center ${
                            shape === preset
                              ? 'bg-[#02213c] text-white border-[#02213c] font-medium shadow-xs'
                              : 'bg-white/60 text-[#43474d] border-[#02213c]/10 hover:bg-white'
                          }`}
                        >
                          {preset}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Color Swatch Presets */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#43474d] font-semibold block mb-1.5">
                    Palette Swatches
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_PALETTES.map((palette) => (
                      <button
                        key={palette.name}
                        type="button"
                        onClick={() => {
                          setPetalColor(palette.petal);
                          setInnerColor(palette.inner);
                          setCoreColor(palette.core);
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 hover:bg-white border border-[#02213c]/10 text-[10px] font-mono cursor-pointer transition-all"
                        title={palette.name}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: palette.petal }}
                        />
                        <span className="text-[#43474d]">{palette.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Pickers */}
                <div className="grid grid-cols-3 gap-3 bg-white/50 p-3 rounded-2xl border border-[#02213c]/5">
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-wider text-[#74777e] block mb-1">
                      Petals
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={petalColor}
                        onChange={(e) => setPetalColor(e.target.value)}
                        className="w-7 h-7 rounded-lg border border-black/10 cursor-pointer p-0"
                      />
                      <span className="font-mono text-[10px] text-[#000816] uppercase">
                        {petalColor}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-wider text-[#74777e] block mb-1">
                      Shading
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={innerColor}
                        onChange={(e) => setInnerColor(e.target.value)}
                        className="w-7 h-7 rounded-lg border border-black/10 cursor-pointer p-0"
                      />
                      <span className="font-mono text-[10px] text-[#000816] uppercase">
                        {innerColor}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-wider text-[#74777e] block mb-1">
                      Center Core
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={coreColor}
                        onChange={(e) => setCoreColor(e.target.value)}
                        className="w-7 h-7 rounded-lg border border-black/10 cursor-pointer p-0"
                      />
                      <span className="font-mono text-[10px] text-[#000816] uppercase">
                        {coreColor}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Petal count slider if daisy */}
                {shape === 'daisy' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-[#43474d] font-semibold">
                        Petal Count
                      </label>
                      <span className="font-mono text-[10px] text-[#02213c] font-bold">
                        {petalCount}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={16}
                      value={petalCount}
                      onChange={(e) => setPetalCount(Number(e.target.value))}
                      className="w-full accent-[#02213c] cursor-pointer"
                    />
                  </div>
                )}
              </>
            ) : (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#43474d] font-semibold block mb-1">
                  Paste Raw SVG (100×100 viewBox recommended)
                </label>
                <textarea
                  value={rawSvg}
                  onChange={(e) => setRawSvg(e.target.value)}
                  placeholder={`<svg viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="#FFB385"/>\n  ...\n</svg>`}
                  rows={8}
                  className="w-full bg-white/80 border border-[#02213c]/15 rounded-xl p-3 font-mono text-[11px] text-[#000816] outline-none focus:border-[#02213c]"
                />
                <p className="font-mono text-[10px] text-[#74777e] mt-1">
                  Tip: Export your handmade illustration from Figma, Illustrator, or pen tool.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Live Botanical Preview */}
          <div className="md:col-span-5 bg-white/70 rounded-3xl p-5 border border-[#02213c]/10 flex flex-col items-center justify-between h-full min-h-[300px]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#74777e] font-semibold">
              Live Stem Preview
            </span>

            {/* Bloom & Stem Rendering */}
            <div className="relative w-full h-44 flex flex-col items-center justify-end">
              <motion.div
                key={generatedSvg}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-20 h-20 -mb-2 z-10"
                dangerouslySetInnerHTML={{ __html: generatedSvg }}
              />
              {/* Botanical stem stalk */}
              <div className="w-1.5 h-20 bg-gradient-to-b from-[#4A7c59] to-[#3A5A40] rounded-full relative">
                <div className="absolute top-1/3 -left-1.5 w-2 h-4 bg-[#4A7c59] rounded-full transform -rotate-30" />
              </div>
            </div>

            {/* Shelf Card Miniature Preview */}
            <div className="w-full bg-[#fffadf] p-2.5 rounded-2xl border border-[#02213c]/5 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#f6f0b7]/40 flex items-center justify-center p-1">
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: generatedSvg }}
                />
              </div>
              <div className="flex-1 truncate">
                <div className="font-serif text-xs font-semibold text-[#000816] truncate">
                  {name || 'Handmade Flower'}
                </div>
                <div className="font-mono text-[9px] text-[#74777e] truncate">
                  {meaning || 'Custom Handmade Bloom'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#02213c]/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-mono text-xs text-[#43474d] hover:text-[#000816] cursor-pointer"
          >
            Cancel
          </button>

          <motion.button
            type="button"
            onClick={handleSave}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#02213c] text-white font-sans text-xs font-medium tracking-wide shadow-md hover:bg-[#02213c]/90 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Handmade Flower to Shelf</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
