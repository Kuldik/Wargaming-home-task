export type Lang = string;

export interface VehicleLocalization {
  mark: Record<Lang, string>;
  shortmark?: Record<Lang, string>;
  description?: Record<Lang, string>;
}
export interface VehicleIconSet {
  default: string;
  medium?: string; small?: string; large?: string;
  contour?: string; contour_alive?: string; contour_dead?: string;
  local_contour?: string; local_contour_alive?: string; local_contour_dead?: string;
}
export interface Vehicle {
  level: number;
  name: string; 
  icons: VehicleIconSet;
  tags: string[];
  localization: VehicleLocalization;
  nation: string;
}
export type VehiclesResponse = Record<string, Vehicle>;
