export interface Nation {
  id: number;
  name: string;
  icons: Record<string, string>;
  color: number;
  tags: string[];
  localization: { mark: Record<string,string> };
}
