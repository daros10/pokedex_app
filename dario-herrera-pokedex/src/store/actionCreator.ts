import { IAppState } from "../shared/interfaces/IAppState.interface";
import { ActionTypes } from "./actionTypes";
import { IPokemonListResponse } from "../shared/interfaces/IPokemonListResponse";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios, { AxiosResponse } from "axios";
import { BaseApiRouteEnum } from "../shared/constants/BaseApiRouteEnum";
import { IPokemonDetailResponse } from "../shared/interfaces/IPokemonDetailResponse";

export type IAppAction = { type: string } & Partial<IAppState>;

export const setPokemonList = (payload: IPokemonListResponse | undefined) => {
  return {
    type: ActionTypes.SET_POKEMON_LIST_RESPONSE,
    pokemonListResponse: payload,
  };
};

export const setPokemonDetails = (
  payload: IPokemonDetailResponse | undefined
) => {
  return {
    type: ActionTypes.SET_POKEMON_DETAILS_RESPONSE,
    pokemonDetailsResponse: payload,
  };
};

export const setIsLoading = (payload: boolean) => {
  return {
    type: ActionTypes.SET_IS_LOADING,
    isLoading: payload,
  };
};

export const setIsNotFoundPokemon = (payload: boolean) => {
  return {
    type: ActionTypes.SET_IS_NOT_FOUND,
    isNotFoundPokemon: payload,
  };
};

export const getPokemonListByLimitAndOffset = (
  nextOrPreviousUrl?: string
): ThunkAction<void, IAppState, undefined, IAppAction> => {
  return (dispatch: ThunkDispatch<IAppState, any, IAppAction>): void => {
    const endpoint_url: string = nextOrPreviousUrl
      ? nextOrPreviousUrl
      : `${
          BaseApiRouteEnum.BASE_GENERAL_PATH_URL
        }/pokemon?offset=${0}&limit=${4}`;

    dispatch(setIsLoading(true));

    axios
      .get<IPokemonListResponse>(endpoint_url)
      .then((axiosResponse: AxiosResponse<IPokemonListResponse>) => {
        const response: IPokemonListResponse = axiosResponse.data;

        dispatch(setPokemonList(response));
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 500);
      })
      .catch(() => {
        dispatch(setPokemonList(undefined));
        dispatch(setIsLoading(false));
      });
  };
};

export const getPokemonDetailsByNameOrId = (
  nameOrId: string | number,
  isForResume: boolean = false
): ThunkAction<void, IAppState, undefined, IAppAction> => {
  return (dispatch: ThunkDispatch<IAppState, any, IAppAction>): void => {
    const endpoint_url: string = `${BaseApiRouteEnum.BASE_GENERAL_PATH_URL}/pokemon/${nameOrId}`;

    axios
      .get<IPokemonDetailResponse>(endpoint_url)
      .then((axiosResponse: AxiosResponse<IPokemonDetailResponse>) => {
        const response: IPokemonDetailResponse = axiosResponse.data;
        const buildCustomResponse: IPokemonListResponse = {
          count: 1154,
          next: `${BaseApiRouteEnum.BASE_GENERAL_PATH_URL}/pokemon?offset=0&limit=4`,
          previous: null,
          results: [
            {
              name: response.name,
              url: `${BaseApiRouteEnum.BASE_GENERAL_PATH_URL}/pokemon/${response.id}/`,
            },
          ],
        };

        if (isForResume) {
          dispatch(setPokemonDetails(response));
        } else {
          dispatch(setPokemonDetails(response));
          dispatch(setPokemonList(buildCustomResponse));
        }
      })
      .catch(() => {
        dispatch(setIsNotFoundPokemon(true));
      });
  };
};
