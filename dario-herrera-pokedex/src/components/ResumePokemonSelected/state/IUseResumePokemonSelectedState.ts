import { Move, Type } from "../../../shared/interfaces/IPokemonDetailResponse";

export interface IUseResumePokemonSelectedState {
  spriteArray: string[];
  mainPokemonImageSrc: string;
  pokemonId: string;
  pokemonName: string;
  pokemonWeight: string;
  pokemonType: Type[];
  moveArray: Move[];
}
