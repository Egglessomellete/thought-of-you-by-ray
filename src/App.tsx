import { useEffect, useState, useMemo, useCallback } from 'react';
import { FLORAL_DATABASE, INITIAL_BOUQUET_IDS } from './data/flowers';
import { BouquetState, FlowerData, StationeryTone, StemItem, TypefaceStyle, WaxSealType, WrapStyle, SeasonalThemeId, PaperTextureId } from './types/bouquet';
import { SEASONAL_THEMES, getPaperTextureStyle } from './data/seasonalThemes';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { ArrangeView } from './components/ArrangeView';
import { NoteView } from './components/NoteView';
import { UnwrapView } from './components/UnwrapView';
import { AboutModal } from './components/AboutModal';
import { AboutView } from './components/AboutView';
import { decodeBouquetFromHash, encodeBouquetToHash } from './utils/share';

function createStem(
  flowerId: string,
  customProps?: { rotation?: number; offsetX?: number; height?: number },
  flowerList: FlowerData[] = FLORAL_DATABASE
): StemItem | null {
  const flower = flowerList.find(f => f.id === flowerId);
  if (!flower) return null;

  const angleSpread = 58;
  const baseRotation = customProps?.rotation !== undefined 
    ? customProps.rotation 
    : (Math.random() * angleSpread) - (angleSpread / 2);
  const offsetX = customProps?.offsetX !== undefined 
    ? customProps.offsetX 
    : (Math.random() * 120) - 60;
  const stemHeight = customProps?.height !== undefined 
    ? customProps.height 
    : 175 + Math.random() * 55;

  return {
    uid: 'stem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    flowerId,
    rotation: Math.round(baseRotation),
    offsetX: Math.round(offsetX),
    height: Math.round(stemHeight),
    zIndex: Math.round(Math.random() * 20),
    data: flower
  };
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'arrange' | 'note' | 'unwrap' | 'about'>('home');
  const [aboutOpen, setAboutOpen] = useState(false);

  // Custom handmade flowers created by user
  const [customFlowers, setCustomFlowers] = useState<FlowerData[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('thought_of_you_custom_flowers');
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  const allFlowers = useMemo(() => [...customFlowers, ...FLORAL_DATABASE], [customFlowers]);

  // Bouquet state
  const [stems, setStems] = useState<StemItem[]>(() => {
    return INITIAL_BOUQUET_IDS.map((id, index) => {
      // Natural curated bouquet spread
      const rot = (index - 2.5) * 12 + (Math.random() * 8 - 4);
      const offX = (index - 2.5) * 22 + (Math.random() * 10 - 5);
      const h = 185 + Math.sin(index) * 20;
      return createStem(id, { rotation: rot, offsetX: offX, height: h })!;
    }).filter(Boolean);
  });

  const [title, setTitle] = useState('Morning Serenade');
  const [noteText, setNoteText] = useState(
    'Dearest Clara,\n\nWishing you an afternoon filled with bloom, light, and wonder. May these quiet stems bring warmth to your table today.\n\nAlways,\nPauline'
  );
  const [tone, setTone] = useState<StationeryTone>('chiffon');
  const [typeface, setTypeface] = useState<TypefaceStyle>('script');
  const [seal, setSeal] = useState<WaxSealType>('prussian');
  const [wrap, setWrap] = useState<WrapStyle>('kraft');
  const [season, setSeason] = useState<SeasonalThemeId>('summer');
  const [texture, setTexture] = useState<PaperTextureId>('parchment');

  const handleSelectSeason = useCallback((newSeason: SeasonalThemeId) => {
    setSeason(newSeason);
    const theme = SEASONAL_THEMES[newSeason];
    if (theme) {
      setTexture(theme.defaultTexture);
      setTone(theme.defaultTone);
      setWrap(theme.defaultWrap);
    }
  }, []);

  // Handle incoming gift URL parameters
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#gift=')) {
        const payload = hash.slice(6);
        const decoded = decodeBouquetFromHash(payload);
        if (decoded) {
          if (decoded.title) setTitle(decoded.title);
          if (decoded.message) setNoteText(decoded.message);
          if (decoded.tone) setTone(decoded.tone);
          if (decoded.typeface) setTypeface(decoded.typeface);
          if (decoded.seal) setSeal(decoded.seal);
          if (decoded.wrap) setWrap(decoded.wrap);
          if (decoded.season) setSeason(decoded.season);
          if (decoded.texture) setTexture(decoded.texture);

          let combinedFlowers = FLORAL_DATABASE;
          if (decoded._rawCustomFlowers && Array.isArray(decoded._rawCustomFlowers)) {
            setCustomFlowers(prev => {
              const existingIds = new Set(prev.map(f => f.id));
              const toAdd = decoded._rawCustomFlowers!.filter(f => !existingIds.has(f.id));
              return [...toAdd, ...prev];
            });
            combinedFlowers = [...decoded._rawCustomFlowers, ...FLORAL_DATABASE];
          }

          interface RawStem {
            id: string;
            r: number;
            x: number;
            h: number;
          }
          const rawStems = (decoded as unknown as { _rawStems?: RawStem[] })._rawStems;
          if (Array.isArray(rawStems) && rawStems.length > 0) {
            const restored = rawStems.map((s) =>
              createStem(s.id, { rotation: s.r, offsetX: s.x, height: s.h }, combinedFlowers)
            ).filter(Boolean) as StemItem[];
            if (restored.length > 0) {
              setStems(restored);
            }
          }
          setCurrentView('unwrap');
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Handlers for florist arranger
  const handleAddFlower = useCallback((flowerId: string) => {
    const newStem = createStem(flowerId, undefined, allFlowers);
    if (newStem) {
      setStems(prev => [...prev, newStem]);
    }
  }, [allFlowers]);

  const handleSaveCustomFlower = useCallback((flower: FlowerData) => {
    setCustomFlowers(prev => {
      const filtered = prev.filter(f => f.id !== flower.id);
      const updated = [flower, ...filtered];
      if (typeof window !== 'undefined') {
        localStorage.setItem('thought_of_you_custom_flowers', JSON.stringify(updated));
      }
      return updated;
    });

    // Automatically add newly created custom flower to stems
    const newStem = createStem(flower.id, undefined, [flower, ...allFlowers]);
    if (newStem) {
      setStems(prev => [...prev, newStem]);
    }
  }, [allFlowers]);

  const handleRemoveStem = useCallback((uid: string) => {
    setStems(prev => prev.filter(s => s.uid !== uid));
  }, []);

  const handleShuffle = useCallback(() => {
    const shuffleTimestamp = Date.now();
    setStems(prev =>
      prev.map((stem, i) => {
        const spread = 54;
        const targetRot = ((i / (prev.length || 1)) - 0.5) * spread + (Math.random() * 16 - 8);
        const targetX = ((i / (prev.length || 1)) - 0.5) * 110 + (Math.random() * 20 - 10);
        return {
          ...stem,
          uid: `stem_${stem.flowerId}_${shuffleTimestamp}_${i}`,
          rotation: Math.round(targetRot),
          offsetX: Math.round(targetX),
          height: Math.round(180 + Math.random() * 50)
        };
      })
    );
  }, []);

  const handleClear = useCallback(() => {
    setStems([]);
  }, []);

  // Bouquet state snapshot
  const bouquetState: BouquetState = useMemo(() => ({
    stems,
    title,
    recipientName: 'Clara',
    message: noteText,
    senderName: 'Pauline',
    tone,
    typeface,
    seal,
    wrap,
    season,
    texture
  }), [stems, title, noteText, tone, typeface, seal, wrap, season, texture]);

  // Generate shareable URL
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const hash = encodeBouquetToHash(bouquetState);
    return `${window.location.origin}${window.location.pathname}#gift=${hash}`;
  }, [bouquetState]);

  const currentTheme = SEASONAL_THEMES[season] || SEASONAL_THEMES.summer;
  const currentTextureStyle = getPaperTextureStyle(texture);

  return (
    <div
      style={{
        backgroundColor: currentTheme.bgHex,
        color: currentTheme.primaryInk,
        ...currentTextureStyle
      }}
      className="min-h-screen flex flex-col selection:bg-[#eccbff] transition-colors duration-700 relative"
    >
      {/* Ambient Seasonal Gradient Glows */}
      <div
        className="fixed -top-20 left-1/4 w-[650px] h-[450px] rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-700"
        style={{ backgroundColor: `${currentTheme.ambientGlow1}35` }}
      />
      <div
        className="fixed -bottom-20 right-1/4 w-[550px] h-[400px] rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-700"
        style={{ backgroundColor: `${currentTheme.ambientGlow2}30` }}
      />

      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenAbout={() => setCurrentView('about')}
        season={season}
      />

      {/* Main Screen Views */}
      <main className={`w-full flex-grow ${currentView !== 'unwrap' ? 'pt-20' : ''}`}>
        {currentView === 'home' && (
          <LandingView
            onStart={() => setCurrentView('arrange')}
            sampleStems={stems}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onStart={() => setCurrentView('arrange')}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'arrange' && (
          <ArrangeView
            bouquet={stems}
            wrap={wrap}
            season={season}
            texture={texture}
            customFlowers={customFlowers}
            onAddFlower={handleAddFlower}
            onRemoveStem={handleRemoveStem}
            onShuffle={handleShuffle}
            onClear={handleClear}
            onNext={() => setCurrentView('note')}
            onSetWrap={setWrap}
            onSelectSeason={handleSelectSeason}
            onSelectTexture={setTexture}
            onSaveCustomFlower={handleSaveCustomFlower}
          />
        )}

        {currentView === 'note' && (
          <NoteView
            bouquet={stems}
            wrap={wrap}
            season={season}
            texture={texture}
            noteText={noteText}
            tone={tone}
            typeface={typeface}
            seal={seal}
            title={title}
            onUpdateNote={setNoteText}
            onUpdateTone={setTone}
            onUpdateTypeface={setTypeface}
            onUpdateSeal={setSeal}
            onUpdateTitle={setTitle}
            onSelectSeason={handleSelectSeason}
            onSelectTexture={setTexture}
            onOpenUnwrap={() => setCurrentView('unwrap')}
            shareUrl={shareUrl}
          />
        )}

        {currentView === 'unwrap' && (
          <UnwrapView
            bouquetState={bouquetState}
            onSendBack={() => {
              window.location.hash = '';
              setCurrentView('arrange');
            }}
            onClose={() => setCurrentView('note')}
          />
        )}
      </main>

      {/* About Modal */}
      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onStart={() => {
          setAboutOpen(false);
          setCurrentView('arrange');
        }}
      />
    </div>
  );
}
