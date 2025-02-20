export type PageSize = 'a4' | 'letter' | 'legal' | 'a3';
export type PageOrientation = 'portrait' | 'landscape';

export interface PageDimensions {
  width: number;  // in mm
  height: number; // in mm
}

export interface PageMargins {
  top: number;    // in mm
  right: number;  // in mm
  bottom: number; // in mm
  left: number;   // in mm
}

export const PAGE_SIZES: Record<PageSize, PageDimensions> = {
  a4: { width: 210, height: 297 },
  letter: { width: 216, height: 279 },
  legal: { width: 216, height: 356 },
  a3: { width: 297, height: 420 }
};

export const DEFAULT_MARGINS: PageMargins = {
  top: 25,
  right: 25,
  bottom: 25,
  left: 25
}; 