export type VehicleImageSet = {
  small?: string;
  medium?: string;
  large?: string;
  contour?: string;
  default?: string;
};

export type VehicleLocalization = {
  mark?: Record<string, string>;       // локализованное имя
  shortmark?: Record<string, string>;  // краткое имя
  description?: Record<string, string>;
};

export type Vehicle = {
  name: string; // имя судна (ключ)
  level: number; // 1..11
  nation: string; // код нации
  tags: string[]; // типы судов
  icons?: VehicleImageSet;
  images?: VehicleImageSet;
  localization?: VehicleLocalization;
  [k: string]: any;
};

export type VehiclesResponse = Record<string, Vehicle>;
