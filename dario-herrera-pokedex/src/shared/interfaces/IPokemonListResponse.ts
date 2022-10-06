export interface IPokemonListResponse {
  count: number;
  next: string;
  previous: string | null;
  results: ResultResponse[];
}

export interface ResultResponse {
  name: string;
  url: string;
}
