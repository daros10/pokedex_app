import { IPokemonListResponse } from "../../../shared/interfaces/IPokemonListResponse";

export interface IUseCardPokemonContainer {
  handleOnContainerClick: (pokemonId: number) => void;
  pokemonListResponse: IPokemonListResponse | undefined;
}
