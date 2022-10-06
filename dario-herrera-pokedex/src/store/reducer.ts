import { IAppState } from "../shared/interfaces/IAppState.interface";
import { IAppAction } from "./actionCreator";
import { ActionTypes } from "./actionTypes";

export const INITIAL_STATE: IAppState = {
  pokemonListResponse: undefined,
  pokemonDetailsResponse: undefined,
  isLoading: false,
  isNotFoundPokemon: false,
};

export const reducer = (
  state: IAppState = INITIAL_STATE,
  action: IAppAction
): IAppState => {
  switch (action.type) {
    case ActionTypes.SET_POKEMON_LIST_RESPONSE:
      return {
        ...state,
        pokemonListResponse: action.pokemonListResponse,
      };
    case ActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case ActionTypes.SET_POKEMON_DETAILS_RESPONSE:
      return {
        ...state,
        pokemonDetailsResponse: action.pokemonDetailsResponse,
      };
    case ActionTypes.SET_IS_NOT_FOUND:
      return {
        ...state,
        isNotFoundPokemon: action.isNotFoundPokemon,
      };
    default:
      return state;
  }
};
