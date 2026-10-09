import { FlowerData } from '../types/bouquet';

export const FLORAL_DATABASE: FlowerData[] = [
  {
    id: 'pink-orchid',
    name: 'Pink Orchid',
    botanicalName: 'Phalaenopsis',
    meaning: 'Refined grace & rare beauty',
    color: '#F4A5C1',
    darkColor: '#B04B76',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <ellipse cx="50" cy="35" rx="14" ry="24" fill="#FCE4EC"/>
      <ellipse cx="28" cy="48" rx="18" ry="12" fill="#F8BBD0" transform="rotate(-25 28 48)"/>
      <ellipse cx="72" cy="48" rx="18" ry="12" fill="#F8BBD0" transform="rotate(25 72 48)"/>
      <path d="M38 72 C42 55 58 55 62 72 C55 80 45 80 38 72 Z" fill="#E91E63"/>
      <ellipse cx="50" cy="54" rx="8" ry="8" fill="#FFF59D"/>
      <circle cx="50" cy="52" r="3" fill="#C2185B"/>
    </svg>`
  },
  {
    id: 'mandarin-rose',
    name: 'Mandarin Rose',
    botanicalName: 'Rosa chinensis',
    meaning: 'Enthusiasm, passion & gratitude',
    color: '#FFB26B',
    darkColor: '#C45D1C',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <circle cx="50" cy="50" r="32" fill="#FFE0B2"/>
      <path d="M30 45 C35 30 65 30 70 45 C75 60 55 72 50 72 C40 72 25 60 30 45 Z" fill="#FFA726"/>
      <path d="M40 45 Q50 35 60 45 Q50 62 40 45" fill="#FB8C00"/>
      <path d="M45 48 Q50 42 55 48 Q50 56 45 48" fill="#E65100"/>
      <circle cx="50" cy="50" fill="#FFE082" r="4"/>
    </svg>`
  },
  {
    id: 'carnation',
    name: 'Carnation',
    botanicalName: 'Dianthus caryophyllus',
    meaning: 'Pure devotion & affectionate admiration',
    color: '#FF94A8',
    darkColor: '#A82A45',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <circle cx="50" cy="50" r="30" fill="#FFCDD2"/>
      <path d="M32 38 L36 32 L44 35 L48 28 L56 32 L62 26 L66 34 L74 36 L70 46 L76 54 L68 60 L70 68 L60 68 L54 74 L46 70 L40 74 L36 66 L28 62 L32 54 L26 46 Z" fill="#F06292"/>
      <path d="M38 44 L44 40 L50 44 L56 38 L62 44 L58 52 L62 58 L54 60 L50 64 L44 58 L38 58 L42 50 Z" fill="#E91E63"/>
    </svg>`
  },
  {
    id: 'anemone',
    name: 'Anemone',
    botanicalName: 'Anemone coronaria',
    meaning: 'Unfading anticipation & quiet thought',
    color: '#E8DFF5',
    darkColor: '#02213C',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <circle cx="34" cy="40" r="16" fill="#F3E5F5"/>
      <circle cx="66" cy="40" r="16" fill="#EDE7F6"/>
      <circle cx="38" cy="64" r="16" fill="#E1BEE7"/>
      <circle cx="62" cy="64" r="16" fill="#EDE7F6"/>
      <circle cx="50" cy="32" r="16" fill="#F3E5F5"/>
      <circle cx="50" cy="50" r="14" fill="#02213C"/>
      <circle cx="50" cy="50" r="17" stroke="#4A148C" stroke-width="1.5" stroke-dasharray="2 2" fill="none"/>
    </svg>`
  },
  {
    id: 'peony',
    name: 'Peony',
    botanicalName: 'Paeonia suffruticosa',
    meaning: 'Prosperity, gentle joy & honor',
    color: '#F8B4D9',
    darkColor: '#A13D75',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <circle cx="50" cy="50" r="34" fill="#FCE4EC"/>
      <path d="M26 48 C28 32 45 28 50 34 C58 28 72 32 74 48 C76 64 62 74 50 74 C36 74 24 62 26 48 Z" fill="#F48FB1"/>
      <path d="M34 50 C36 40 45 38 50 42 C55 38 64 40 66 50 C66 60 58 66 50 66 C42 66 34 60 34 50 Z" fill="#EC407A"/>
      <path d="M42 52 C45 46 55 46 58 52 C58 58 42 58 42 52 Z" fill="#D81B60"/>
    </svg>`
  },
  {
    id: 'camellia',
    name: 'Camellia',
    botanicalName: 'Camellia japonica',
    meaning: 'Adoration & faithful perfection',
    color: '#FFCCD5',
    darkColor: '#B31B34',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <circle cx="50" cy="50" r="32" fill="#FFEBEE"/>
      <path d="M30 40 Q50 20 70 40 Q75 65 50 72 Q25 65 30 40 Z" fill="#FFCDD2"/>
      <circle cx="50" cy="50" r="18" fill="#EF5350"/>
      <circle cx="50" cy="50" r="11" fill="#E53935"/>
      <circle cx="50" cy="50" r="5" fill="#FFE082"/>
    </svg>`
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    botanicalName: 'Helianthus annuus',
    meaning: 'Radiant warmth, loyalty & optimism',
    color: '#FEE440',
    darkColor: '#4A2810',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <g fill="#FBC02D">
        <ellipse cx="50" cy="18" rx="7" ry="16"/>
        <ellipse cx="50" cy="82" rx="7" ry="16"/>
        <ellipse cx="18" cy="50" rx="16" ry="7"/>
        <ellipse cx="82" cy="50" rx="16" ry="7"/>
        <ellipse cx="28" cy="28" rx="8" ry="16" transform="rotate(-45 28 28)"/>
        <ellipse cx="72" cy="72" rx="8" ry="16" transform="rotate(-45 72 72)"/>
        <ellipse cx="72" cy="28" rx="8" ry="16" transform="rotate(45 72 28)"/>
        <ellipse cx="28" cy="72" rx="8" ry="16" transform="rotate(45 28 72)"/>
      </g>
      <circle cx="50" cy="50" r="18" fill="#4E342E"/>
      <circle cx="50" cy="50" r="14" fill="#3E2723"/>
      <circle cx="50" cy="50" r="8" fill="#2E1B15"/>
    </svg>`
  },
  {
    id: 'bellflower',
    name: 'Bellflower',
    botanicalName: 'Campanula persicifolia',
    meaning: 'Unwavering gratitude & delicate poise',
    color: '#B8C0FF',
    darkColor: '#3F4E99',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <path d="M50 20 C68 20 80 40 76 65 L66 60 L50 78 L34 60 L24 65 C20 40 32 20 50 20 Z" fill="#9FA8DA"/>
      <path d="M50 30 C60 30 68 44 64 60 L50 70 L36 60 C32 44 40 30 50 30 Z" fill="#7986CB"/>
      <line x1="50" y1="45" x2="50" y2="70" stroke="#FFF59D" stroke-width="2"/>
      <circle cx="50" cy="71" r="2.5" fill="#FDD835"/>
    </svg>`
  },
  {
    id: 'tulip',
    name: 'Tulip',
    botanicalName: 'Tulipa gesneriana',
    meaning: 'Perfect love, fresh renewal & cheerful thoughts',
    color: '#FF6B8B',
    darkColor: '#B82E55',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <!-- Back Petal -->
      <path d="M50 20 C42 32 40 50 50 68 C60 50 58 32 50 20 Z" fill="#E83E6C"/>
      <!-- Left Tulip Petal Cup -->
      <path d="M50 68 C34 68 22 52 24 34 C26 25 35 24 40 32 C45 42 48 56 50 68 Z" fill="#FF7597"/>
      <!-- Right Tulip Petal Cup -->
      <path d="M50 68 C66 68 78 52 76 34 C74 25 65 24 60 32 C55 42 52 56 50 68 Z" fill="#FF527B"/>
      <!-- Center Front Petal with Soft Highlight -->
      <path d="M50 68 C42 66 36 54 38 38 C40 28 48 24 50 24 C52 24 60 28 62 38 C64 54 58 66 50 68 Z" fill="#FF8DA7"/>
      <!-- Soft Tulip Glow Highlight -->
      <path d="M48 30 C45 36 44 48 48 58 C47 50 48 38 51 32 C50 30 49 30 48 30 Z" fill="#FFE3EC" opacity="0.75"/>
    </svg>`
  },
  {
    id: 'garden-rose',
    name: 'Garden Rose',
    botanicalName: 'Rosa centifolia',
    meaning: 'Deep affection & timeless romance',
    color: '#F3C4FB',
    darkColor: '#782C87',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <circle cx="50" cy="50" r="33" fill="#F3E5F5"/>
      <path d="M28 42 C30 25 70 25 72 42 C74 62 58 74 50 74 C42 74 26 62 28 42 Z" fill="#CE93D8"/>
      <path d="M36 46 Q50 34 64 46 Q50 64 36 46" fill="#BA68C8"/>
      <path d="M42 48 Q50 40 58 48 Q50 58 42 48" fill="#AB47BC"/>
      <circle cx="50" cy="50" r="3.5" fill="#FFE082"/>
    </svg>`
  },
  {
    id: 'lavender-lily',
    name: 'Lavender Lily',
    botanicalName: 'Lilium washingtonianum',
    meaning: 'Serenity, devotion & silent understanding',
    color: '#D0BCFF',
    darkColor: '#473B7B',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <ellipse cx="50" cy="22" rx="9" ry="24" fill="#D1C4E9"/>
      <ellipse cx="24" cy="58" rx="9" ry="24" transform="rotate(-60 24 58)" fill="#B39DDB"/>
      <ellipse cx="76" cy="58" rx="9" ry="24" transform="rotate(60 76 58)" fill="#B39DDB"/>
      <ellipse cx="36" cy="74" rx="8" ry="20" transform="rotate(-30 36 74)" fill="#9575CD"/>
      <ellipse cx="64" cy="74" rx="8" ry="20" transform="rotate(30 64 74)" fill="#9575CD"/>
      <circle cx="50" cy="54" r="5" fill="#FFF59D"/>
    </svg>`
  },
  {
    id: 'poppy',
    name: 'Poppy',
    botanicalName: 'Papaver rhoeas',
    meaning: 'Pleasure, peaceful remembrance & vivid dreams',
    color: '#FF6B6B',
    darkColor: '#8C1515',
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-sm pointer-events-none">
      <circle cx="40" cy="42" r="22" fill="#EF5350"/>
      <circle cx="60" cy="42" r="22" fill="#E53935"/>
      <circle cx="50" cy="60" r="22" fill="#C62828"/>
      <circle cx="50" cy="48" r="10" fill="#212121"/>
      <circle cx="50" cy="48" r="5" fill="#757575"/>
    </svg>`
  }
];

export const INITIAL_BOUQUET_IDS = [
  'pink-orchid',
  'mandarin-rose',
  'tulip',
  'anemone',
  'peony',
  'bellflower'
];

export const EDITORIAL_BOUQUET_PHOTO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD49M1nO22UHQgiXIELbqz6U8A_5nf1gtUesVtnF_qVGy8_HckNi0GmWT_MSvFjDsKWiJ8yQc66BXpwLtP4jpMnwIme0sGfSzzNXEUmAW9JeJBtuIviLi8-cgRHreb2_iOPgchVjiXtLQGZi4R7RCjmNn83PgJkQrMM4n_dI6LZzwRux96x_HIwsBUkKETWHGdxpDX315P7__-KuhZd2FXBucxeXWMZsMFdTrsA7ZhmBHC_YeT_YC8';
