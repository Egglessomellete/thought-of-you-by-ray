export interface FlowerData {
  id: string;
  name: string;
  botanicalName?: string;
  meaning?: string;
  color: string;
  darkColor: string;
  svg: string;
}

export interface StemItem {
  uid: string;
  flowerId: string;
  rotation: number;
  offsetX: number;
  height: number;
  zIndex: number;
  data: FlowerData;
}

export type StationeryTone = 'chiffon' | 'pink' | 'mint' | 'sky' | 'wisteria';

export type TypefaceStyle = 'script' | 'sans' | 'mono';

export type WaxSealType = 'prussian' | 'wisteria' | 'rose' | 'sage';

export type WrapStyle = 'kraft' | 'linen' | 'blush' | 'sage';

export type SeasonalThemeId = 'summer' | 'spring' | 'autumn' | 'winter';

export type PaperTextureId = 'clean' | 'linen' | 'flecked' | 'parchment';

export interface BouquetState {
  stems: StemItem[];
  title: string;
  recipientName: string;
  message: string;
  senderName: string;
  tone: StationeryTone;
  typeface: TypefaceStyle;
  seal: WaxSealType;
  wrap: WrapStyle;
  season?: SeasonalThemeId;
  texture?: PaperTextureId;
}
