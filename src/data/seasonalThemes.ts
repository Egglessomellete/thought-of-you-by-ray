import { SeasonalThemeId, PaperTextureId, WrapStyle, StationeryTone } from '../types/bouquet';

export interface SeasonalThemeConfig {
  id: SeasonalThemeId;
  name: string;
  seasonLabel: string;
  tagline: string;
  icon: string;
  bgHex: string;
  cardHex: string;
  ambientGlow1: string;
  ambientGlow2: string;
  primaryInk: string;
  accentColor: string;
  badgeBg: string;
  defaultWrap: WrapStyle;
  defaultTone: StationeryTone;
  defaultTexture: PaperTextureId;
}

export const SEASONAL_THEMES: Record<SeasonalThemeId, SeasonalThemeConfig> = {
  summer: {
    id: 'summer',
    name: 'Summer Solstice',
    seasonLabel: 'Summer',
    tagline: 'Sunlit Chiffon & Golden Chamomile',
    icon: 'wb_sunny',
    bgHex: '#FFFADF',
    cardHex: '#FCF6BD',
    ambientGlow1: '#ECCBFF',
    ambientGlow2: '#FCF6BD',
    primaryInk: '#000816',
    accentColor: '#B8860B',
    badgeBg: '#F0EAB2',
    defaultWrap: 'kraft',
    defaultTone: 'chiffon',
    defaultTexture: 'parchment'
  },
  spring: {
    id: 'spring',
    name: 'Spring Blossom',
    seasonLabel: 'Spring',
    tagline: 'Dewy Cherry Petals & Young Mint',
    icon: 'local_florist',
    bgHex: '#FFF3F6',
    cardHex: '#FFE4EB',
    ambientGlow1: '#FFCCD5',
    ambientGlow2: '#C7EBD5',
    primaryInk: '#260D1E',
    accentColor: '#D81B60',
    badgeBg: '#FFCCD5',
    defaultWrap: 'blush',
    defaultTone: 'pink',
    defaultTexture: 'flecked'
  },
  autumn: {
    id: 'autumn',
    name: 'Autumn Equinox',
    seasonLabel: 'Autumn',
    tagline: 'Warm Russet, Oatmeal & Dry Kraft',
    icon: 'park',
    bgHex: '#F7EFE5',
    cardHex: '#EDE0D4',
    ambientGlow1: '#E6CCB2',
    ambientGlow2: '#DDB892',
    primaryInk: '#331B0E',
    accentColor: '#9C6644',
    badgeBg: '#DDB892',
    defaultWrap: 'kraft',
    defaultTone: 'chiffon',
    defaultTexture: 'linen'
  },
  winter: {
    id: 'winter',
    name: 'Winter Stillness',
    seasonLabel: 'Winter',
    tagline: 'Frosted Eucalyptus & Slate Wisteria',
    icon: 'ac_unit',
    bgHex: '#F0F4F8',
    cardHex: '#DFEAF5',
    ambientGlow1: '#D0E1FD',
    ambientGlow2: '#E8DFF5',
    primaryInk: '#091A2D',
    accentColor: '#457B9D',
    badgeBg: '#C2D9EE',
    defaultWrap: 'linen',
    defaultTone: 'sky',
    defaultTexture: 'clean'
  }
};

export const PAPER_TEXTURES: { id: PaperTextureId; name: string; description: string; preview: string }[] = [
  {
    id: 'clean',
    name: 'Deckle Cotton',
    description: 'Smooth hot-pressed artisan cotton rag',
    preview: 'Smooth'
  },
  {
    id: 'parchment',
    name: 'Warm Parchment',
    description: 'Natural fiber grain with warm tactile shading',
    preview: 'Grain'
  },
  {
    id: 'linen',
    name: 'French Linen',
    description: 'Subtle woven cross-hatch textile texture',
    preview: 'Woven'
  },
  {
    id: 'flecked',
    name: 'Petal Flecked',
    description: 'Delicate botanical speckles embedded in paper',
    preview: 'Flecks'
  }
];

/**
 * Returns CSS style for tactile paper texture overlay
 */
export function getPaperTextureStyle(texture: PaperTextureId): React.CSSProperties {
  switch (texture) {
    case 'linen':
      return {
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.02) 0px, rgba(0, 0, 0, 0.02) 1px, transparent 1px, transparent 4px),
          repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.02) 0px, rgba(0, 0, 0, 0.02) 1px, transparent 1px, transparent 4px)
        `,
      };
    case 'flecked':
      return {
        backgroundImage: `
          radial-gradient(circle at 15% 25%, rgba(130, 80, 50, 0.06) 1px, transparent 1.5px),
          radial-gradient(circle at 75% 65%, rgba(160, 60, 90, 0.06) 1.2px, transparent 2px),
          radial-gradient(circle at 45% 85%, rgba(60, 110, 70, 0.06) 1px, transparent 1.5px),
          radial-gradient(circle at 85% 15%, rgba(140, 90, 40, 0.05) 1.5px, transparent 2px),
          radial-gradient(circle at 30% 60%, rgba(90, 50, 80, 0.06) 1px, transparent 1.5px)
        `,
        backgroundSize: '160px 160px',
      };
    case 'parchment':
      return {
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.015) 0%, transparent 60%),
          repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.012) 0px, rgba(0, 0, 0, 0.012) 1px, transparent 1px, transparent 6px)
        `,
      };
    case 'clean':
    default:
      return {};
  }
}
