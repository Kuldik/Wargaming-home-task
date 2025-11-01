export interface VehicleType {
  icons: Record<string,string>;
  sort_order: number;
  localization: { mark: Record<string,string> };
}
export type VehicleTypesResponse = Record<string, VehicleType>;
