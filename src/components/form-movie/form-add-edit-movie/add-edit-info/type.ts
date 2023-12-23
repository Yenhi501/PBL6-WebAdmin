export type MovieInfoField = {
  name?: string;
  director?: Array<{ label: string; value: number; key?: number }>;
  yearOfManufacturer?: string;
  type?: boolean;
  level?: { label: string; value: number; key?: number };
  country?: string;
  genre?: Array<{ label: string; value: number; key?: number }>;
  actor?: Array<{ label: string; value: number; key?: number }>;
  desc?: string;
};
