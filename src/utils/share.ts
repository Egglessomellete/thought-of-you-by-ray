import { BouquetState, FlowerData } from '../types/bouquet';

export function encodeBouquetToHash(state: BouquetState): string {
  try {
    // Collect any custom flower definitions in stems
    const customFlowers: FlowerData[] = [];
    const seen = new Set<string>();
    state.stems.forEach(stem => {
      if (stem.data.id.startsWith('custom-') && !seen.has(stem.data.id)) {
        seen.add(stem.data.id);
        customFlowers.push(stem.data);
      }
    });

    const compact = {
      s: state.stems.map(s => ({
        id: s.flowerId,
        r: s.rotation,
        x: s.offsetX,
        h: s.height
      })),
      t: state.title,
      rN: state.recipientName,
      m: state.message,
      sN: state.senderName,
      to: state.tone,
      tf: state.typeface,
      se: state.seal,
      wr: state.wrap,
      sn: state.season,
      tx: state.texture,
      cf: customFlowers.length > 0 ? customFlowers : undefined
    };
    const json = JSON.stringify(compact);
    const base64 = btoa(encodeURIComponent(json));
    return base64;
  } catch {
    return '';
  }
}

export interface DecodedBouquet extends Partial<BouquetState> {
  _rawStems?: { id: string; r: number; x: number; h: number }[];
  _rawCustomFlowers?: FlowerData[];
}

export function decodeBouquetFromHash(hash: string): DecodedBouquet | null {
  try {
    const json = decodeURIComponent(atob(hash));
    const compact = JSON.parse(json);
    return {
      title: compact.t,
      recipientName: compact.rN,
      message: compact.m,
      senderName: compact.sN,
      tone: compact.to,
      typeface: compact.tf,
      seal: compact.se,
      wrap: compact.wr,
      season: compact.sn,
      texture: compact.tx,
      _rawStems: compact.s,
      _rawCustomFlowers: compact.cf
    };
  } catch {
    return null;
  }
}
