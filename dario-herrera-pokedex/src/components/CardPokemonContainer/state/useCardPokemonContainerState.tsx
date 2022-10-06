import { IUseCardPokemonContainer } from "./IUseCardPokemonContainer";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetailsByNameOrId } from "../../../store/actionCreator";
import { IPokemonListResponse } from "../../../shared/interfaces/IPokemonListResponse";
import { IAppState } from "../../../shared/interfaces/IAppState.interface";

export const useCardPokemonContainerState = (): IUseCardPokemonContainer => {
  const dispatch = useDispatch();

  const pokemonListResponse: IPokemonListResponse | undefined = useSelector(
    (state: IAppState) => state.pokemonListResponse
  );

  const handleOnContainerClick = (pokemonId: number): void => {
    dispatch(getPokemonDetailsByNameOrId(pokemonId, true));
  };

  return {
    pokemonListResponse,
    handleOnContainerClick,
  };
};
