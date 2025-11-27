export type BikeResponseType = {
  id: number;
  model: string;
  brand_id: number | null;
};

export type BikeYearResponseType = {
  id: number;
  model_year: string;
  bike_id: number | null;
};
