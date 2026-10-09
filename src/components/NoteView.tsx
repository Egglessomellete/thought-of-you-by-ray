import React, { useState } from 'react';
import { StemItem, StationeryTone, TypefaceStyle, WaxSealType, WrapStyle, SeasonalThemeId, PaperTextureId } from '../types/bouquet';
import { BouquetCanvas } from './BouquetCanvas';
import { SeasonalThemeBar } from './SeasonalThemeBar';
import { getPaperTextureStyle, SEASONAL_THEMES } from '../data/seasonalThemes';
import { sounds } from '../utils/audio';

interface NoteViewProps {
  bouquet: StemItem[];
  wrap: WrapStyle;
  noteText: string;
  tone: StationeryTone;
  typeface: TypefaceStyle;
  seal: WaxSealType;
  title: string;
  season?: SeasonalThemeId;
  texture?: PaperTextureId;
  onUpdateNote: (text: string) => void;
  onUpdateTone: (tone: StationeryTone) => void;
  onUpdateTypeface: (tf: TypefaceStyle) => void;
  onUpdateSeal: (seal: WaxSealType) => void;
  onUpdateTitle: (title: string) => void;
  onSelectSeason?: (season: SeasonalThemeId) => void;
  onSelectTexture?: (texture: PaperTextureId) => void;
  onOpenUnwrap: () => void;
  shareUrl: string;
}

export const NoteView: React.FC<NoteViewProps> = ({
  bouquet,
  wrap,
  noteText,
  tone,
  typeface,
  seal,
  title,
  season = 'summer',
  texture = 'parchment',
  onUpdateNote,
  onUpdateTone,
  onUpdateTypeface,
  onUpdateSeal,
  onUpdateTitle,
  onSelectSeason,
  onSelectTexture,
  onOpenUnwrap,
  shareUrl
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentTheme = SEASONAL_THEMES[season] || SEASONAL_THEMES.summer;
  const textureStyle = getPaperTextureStyle(texture);

  // Paper Tone backgrounds
  const toneClasses: Record<StationeryTone, string> = {
    chiffon: 'bg-[#fcf6bd]',
    pink: 'bg-[#eccbff]',
    mint: 'bg-[#c7ebd5]',
    sky: 'bg-[#d1e4ff]',
    wisteria: 'bg-[#f3daff]'
  };

  // Font typography classes
  const fontClasses: Record<TypefaceStyle, string> = {
    script: 'font-serif text-lg md:text-xl leading-relaxed',
    sans: 'font-sans text-base md:text-lg leading-relaxed',
    mono: 'font-mono text-sm md:text-base leading-relaxed'
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        sounds.playAdd();
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Group flower stems by variety
  const stemCounts = bouquet.reduce((acc, stem) => {
    acc[stem.data.name] = (acc[stem.data.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6">
      {/* Seasonal Paper Texture & Palette Bar */}
      {onSelectSeason && onSelectTexture && (
        <div className="w-full mb-6">
          <SeasonalThemeBar
            currentSeason={season}
            currentTexture={texture}
            onSelectSeason={onSelectSeason}
            onSelectTexture={onSelectTexture}
          />
        </div>
      )}

      {/* Editorial Asymmetrical Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Arrangement Preview (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div
            style={{
              backgroundColor: `${currentTheme.cardHex}B3`,
              ...textureStyle
            }}
            className="relative rounded-3xl p-5 sm:p-6 shadow-sm border border-[#02213c]/10 overflow-hidden flex flex-col gap-4 transition-all duration-500 backdrop-blur-md"
          >
            {/* Ambient Soft Color Wash Accent */}
            <div
              className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-2xl pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: `${currentTheme.ambientGlow1}60` }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-2xl pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: `${currentTheme.ambientGlow2}50` }}
            />

            {/* Header info */}
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#43474d] font-semibold">
                Your Handcrafted Bouquet
              </span>
              <span className="font-mono text-[10px] text-[#02213c] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#02213c]/5">
                {bouquet.length} Stems
              </span>
            </div>

            {/* Handcrafted Bouquet Visual Container */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white/60 shadow-sm border border-[#02213c]/5 flex items-center justify-center p-2">
              <BouquetCanvas
                stems={bouquet}
                wrap={wrap}
                season={season}
                texture={texture}
                interactive={false}
                tagText={title || 'FOR YOU'}
                className="h-full w-full"
              />

              {/* Bouquet Title Pill */}
              <div
                style={{ backgroundColor: `${currentTheme.cardHex}F0` }}
                className="absolute bottom-3 left-3 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-[#02213c]/10 z-30"
              >
                <span className="font-mono text-xs text-[#000816] uppercase tracking-wider font-semibold">
                  "{title || 'Morning Serenade'}"
                </span>
              </div>
            </div>

            {/* Stems Composition Breakdown */}
            <div className="bg-white/60 rounded-2xl p-4 border border-[#02213c]/5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#43474d] font-semibold block mb-2">
                Hand-Selected Stems ({bouquet.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(stemCounts).map(([name, count]) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fffadf] text-[#1e1c00] font-sans text-xs border border-[#02213c]/5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#02213c]" />
                    <span>{count}× {name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Stationery Letter Crafting (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Controls Bar: Paper Color & Font Choice */}
          <div className="bg-[#fcf6bd]/60 rounded-2xl p-4 sm:p-5 shadow-xs border border-[#02213c]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Stationery Hue Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-[#43474d] uppercase tracking-wider font-medium">
                Stationery Tone
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Lemon Chiffon"
                  onClick={() => onUpdateTone('chiffon')}
                  className={`w-7 h-7 rounded-full bg-[#fcf6bd] border border-[#02213c]/20 shadow-xs transition-transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer ${
                    tone === 'chiffon' ? 'ring-2 ring-[#02213c] ring-offset-2' : ''
                  }`}
                >
                  {tone === 'chiffon' && (
                    <span className="material-symbols-outlined text-[14px] text-[#000816]">check</span>
                  )}
                </button>

                <button
                  type="button"
                  aria-label="Baby Pink"
                  onClick={() => onUpdateTone('pink')}
                  className={`w-7 h-7 rounded-full bg-[#eccbff] border border-[#02213c]/20 shadow-xs transition-transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer ${
                    tone === 'pink' ? 'ring-2 ring-[#02213c] ring-offset-2' : ''
                  }`}
                >
                  {tone === 'pink' && (
                    <span className="material-symbols-outlined text-[14px] text-[#000816]">check</span>
                  )}
                </button>

                <button
                  type="button"
                  aria-label="Frosted Mint"
                  onClick={() => onUpdateTone('mint')}
                  className={`w-7 h-7 rounded-full bg-[#c7ebd5] border border-[#02213c]/20 shadow-xs transition-transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer ${
                    tone === 'mint' ? 'ring-2 ring-[#02213c] ring-offset-2' : ''
                  }`}
                >
                  {tone === 'mint' && (
                    <span className="material-symbols-outlined text-[14px] text-[#000816]">check</span>
                  )}
                </button>

                <button
                  type="button"
                  aria-label="Sky Blue"
                  onClick={() => onUpdateTone('sky')}
                  className={`w-7 h-7 rounded-full bg-[#d1e4ff] border border-[#02213c]/20 shadow-xs transition-transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer ${
                    tone === 'sky' ? 'ring-2 ring-[#02213c] ring-offset-2' : ''
                  }`}
                >
                  {tone === 'sky' && (
                    <span className="material-symbols-outlined text-[14px] text-[#000816]">check</span>
                  )}
                </button>

                <button
                  type="button"
                  aria-label="Wisteria"
                  onClick={() => onUpdateTone('wisteria')}
                  className={`w-7 h-7 rounded-full bg-[#f3daff] border border-[#02213c]/20 shadow-xs transition-transform hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer ${
                    tone === 'wisteria' ? 'ring-2 ring-[#02213c] ring-offset-2' : ''
                  }`}
                >
                  {tone === 'wisteria' && (
                    <span className="material-symbols-outlined text-[14px] text-[#000816]">check</span>
                  )}
                </button>
              </div>
            </div>

            {/* Font Typography Selector */}
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <label className="font-mono text-xs text-[#43474d] uppercase tracking-wider font-medium">
                Typeface
              </label>
              <div className="inline-flex p-1 bg-[#fffadf] rounded-full border border-[#02213c]/10 shadow-xs">
                <button
                  type="button"
                  onClick={() => onUpdateTypeface('script')}
                  className={`font-serif text-xs px-3.5 py-1 rounded-full transition-colors cursor-pointer ${
                    typeface === 'script'
                      ? 'bg-[#000816] text-white font-medium shadow-xs'
                      : 'text-[#43474d] hover:text-[#000816]'
                  }`}
                >
                  Serif
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateTypeface('sans')}
                  className={`font-sans text-xs px-3.5 py-1 rounded-full transition-colors cursor-pointer ${
                    typeface === 'sans'
                      ? 'bg-[#000816] text-white font-medium shadow-xs'
                      : 'text-[#43474d] hover:text-[#000816]'
                  }`}
                >
                  Clean
                </button>

                <button
                  type="button"
                  onClick={() => onUpdateTypeface('mono')}
                  className={`font-mono text-xs px-3.5 py-1 rounded-full transition-colors cursor-pointer ${
                    typeface === 'mono'
                      ? 'bg-[#000816] text-white font-medium shadow-xs'
                      : 'text-[#43474d] hover:text-[#000816]'
                  }`}
                >
                  Mono
                </button>
              </div>
            </div>
          </div>

          {/* The Tactile Letter Sheet Container with Dynamic Paper Texture */}
          <div
            id="note-sheet"
            style={textureStyle}
            className={`relative rounded-3xl p-6 sm:p-8 shadow-md border border-[#02213c]/10 transition-all duration-300 min-h-[380px] flex flex-col justify-between ${toneClasses[tone]}`}
          >
            {/* Stationery Title edit field */}
            <div className="flex items-center justify-between mb-4 border-b border-[#02213c]/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#02213c] text-sm">edit</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onUpdateTitle(e.target.value)}
                  placeholder="Bouquet Name (e.g. Morning Serenade)"
                  className="bg-transparent text-xs font-mono font-medium text-[#02213c] uppercase tracking-wider outline-none border-0 placeholder:text-[#43474d]/50"
                  maxLength={30}
                />
              </div>
              <span className="font-mono text-[10px] text-[#43474d]/75">
                {noteText.length} / 400
              </span>
            </div>

            {/* Letter Textarea */}
            <div className="w-full flex-grow flex flex-col">
              <textarea
                value={noteText}
                onChange={(e) => onUpdateNote(e.target.value)}
                maxLength={400}
                rows={7}
                placeholder="Write your heartfelt note here..."
                className={`w-full bg-transparent resize-none border-0 outline-none focus:outline-none focus:ring-0 text-[#000816] placeholder:text-[#43474d]/40 ${fontClasses[typeface]}`}
              />
            </div>

            {/* Bottom Note Bar: Wax Seal & Sign-off Stamp */}
            <div className="pt-4 mt-4 border-t border-[#02213c]/10 flex flex-wrap items-center justify-between gap-4">
              {/* Minimal Wax Seal Selector */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#43474d]">Seal:</span>
                <div className="flex items-center gap-2">
                  {/* Prussian Seal */}
                  <button
                    type="button"
                    onClick={() => onUpdateSeal('prussian')}
                    title="Prussian Blue Wax Seal"
                    className={`relative w-8 h-8 rounded-full bg-[#02213c] flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer ${
                      seal === 'prussian' ? 'ring-2 ring-[#02213c] ring-offset-2 ring-offset-white' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-white">spa</span>
                  </button>

                  {/* Wisteria Seal */}
                  <button
                    type="button"
                    onClick={() => onUpdateSeal('wisteria')}
                    title="Wisteria Wax Seal"
                    className={`relative w-8 h-8 rounded-full bg-[#6f5481] flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer ${
                      seal === 'wisteria' ? 'ring-2 ring-[#6f5481] ring-offset-2 ring-offset-white' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-white">spa</span>
                  </button>

                  {/* Rose Seal */}
                  <button
                    type="button"
                    onClick={() => onUpdateSeal('rose')}
                    title="Rose Wax Seal"
                    className={`relative w-8 h-8 rounded-full bg-[#f06292] flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer ${
                      seal === 'rose' ? 'ring-2 ring-[#f06292] ring-offset-2 ring-offset-white' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-white">spa</span>
                  </button>

                  {/* Sage Seal */}
                  <button
                    type="button"
                    onClick={() => onUpdateSeal('sage')}
                    title="Sage Wax Seal"
                    className={`relative w-8 h-8 rounded-full bg-[#4a7c59] flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer ${
                      seal === 'sage' ? 'ring-2 ring-[#4a7c59] ring-offset-2 ring-offset-white' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-white">spa</span>
                  </button>
                </div>
              </div>

              {/* Preview Unboxing Trigger */}
              <button
                type="button"
                onClick={onOpenUnwrap}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#02213c] hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Preview Unboxing</span>
              </button>
            </div>
          </div>

          {/* Action CTA Suite */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowShareModal(true);
                sounds.playAdd();
              }}
              className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#02213c] text-white hover:bg-[#02213c]/90 font-sans text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
            >
              <span>Send Gift Link</span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Sharing Modal Dialog (As seen in mockup & HTML) */}
          {showShareModal && (
            <div className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#02213c]/10 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#c7ebd5] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px] text-[#042518]">verified</span>
                  </div>
                  <h2 className="font-serif text-xl text-[#000816] font-semibold">
                    Your Digibouquet is Ready!
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#74777e] hover:text-[#000816] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <p className="font-sans text-sm text-[#43474d]">
                Send this private unboxing experience directly to your recipient via messaging apps or email.
              </p>

              <div className="flex items-center gap-2 bg-[#fffadf] p-2 rounded-full border border-[#02213c]/10">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="bg-transparent border-0 outline-none text-[#000816] font-mono text-xs px-3 flex-grow select-all truncate"
                />

                <button
                  type="button"
                  onClick={handleCopy}
                  className={`h-9 px-4 rounded-full font-mono text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                    copied
                      ? 'bg-[#042518] text-white'
                      : 'bg-[#000816] text-white hover:bg-[#000816]/90'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              {/* Direct Unboxing Test Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#02213c]/5">
                <span className="font-mono text-xs text-[#74777e]">
                  Private unlisted link · Never withers
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setShowShareModal(false);
                    onOpenUnwrap();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fcf6bd] hover:bg-[#f6f0b7] text-[#02213c] font-sans text-xs font-medium cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">celebration</span>
                  <span>Open Recipient Unboxing</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
