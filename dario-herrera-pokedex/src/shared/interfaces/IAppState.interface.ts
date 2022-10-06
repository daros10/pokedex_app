import { IPokemonListResponse } from "./IPokemonListResponse";
import { IPokemonDetailResponse } from "./IPokemonDetailResponse";

export interface IAppState {
  pokemonListResponse: IPokemonListResponse | undefined;
  pokemonDetailsResponse: IPokemonDetailResponse | undefined;
  isLoading: boolean | undefined;
  isNotFoundPokemon: boolean | undefined;
}
