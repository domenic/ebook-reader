export enum LocalFont {
  KZUDGOTHIC = 'KZ UDGothic',
  KZUDMINCHO = 'KZ UDMincho',
  GENEI = 'Genei Koburi Mincho v5',
  KLEEONE = 'Klee One',
  KLEEONESEMIBOLD = 'Klee One SemiBold',
  NOTOSANSJP = 'Noto Sans JP',
  NOTOSERIFJP = 'Noto Serif JP',
  SHIPPORIMINCHO = 'Shippori Mincho',
  SERIF = 'Browser default serif',
  SANSSERIF = 'Browser default sans-serif'
}

export interface UserFont {
  name: string;
  path: string;
  fileName: string;
}

export const userFontsCacheName = 'miwake-userfonts';

export const reservedFontNames = new Set([
  'KZ UDGothic',
  'KZ UDMincho',
  'Genei Koburi Mincho v5',
  'Klee One',
  'Klee One SemiBold',
  'Noto Sans JP',
  'Noto Serif JP',
  'Shippori Mincho',
  'Browser default serif',
  'Browser default sans-serif'
]);

export function isStoredFont(fontName: string, userFonts: UserFont[]) {
  return (
    reservedFontNames.has(fontName) || !!userFonts.find((userFont) => userFont.name === fontName)
  );
}

const genericFamilyCss: Record<string, string> = {
  [LocalFont.SERIF]: 'serif',
  [LocalFont.SANSSERIF]: 'sans-serif'
};

export function fontFamilyCss(name: string): string {
  return genericFamilyCss[name] ?? `'${name}'`;
}

export type FontGroup = 'serif' | 'sans-serif';

export const fontGroupLabels: Record<FontGroup, string> = {
  serif: 'Serif font',
  'sans-serif': 'Sans-serif font'
};

export const defaultFonts: Record<FontGroup, LocalFont> = {
  serif: LocalFont.NOTOSERIFJP,
  'sans-serif': LocalFont.NOTOSANSJP
};

export const bundledFonts: Record<FontGroup, LocalFont[]> = {
  serif: [
    LocalFont.NOTOSERIFJP,
    LocalFont.KZUDMINCHO,
    LocalFont.GENEI,
    LocalFont.SHIPPORIMINCHO,
    LocalFont.KLEEONE,
    LocalFont.KLEEONESEMIBOLD,
    LocalFont.SERIF
  ],
  'sans-serif': [LocalFont.NOTOSANSJP, LocalFont.KZUDGOTHIC, LocalFont.SANSSERIF]
};
