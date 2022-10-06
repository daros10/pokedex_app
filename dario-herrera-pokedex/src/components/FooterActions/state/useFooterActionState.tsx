import { IUseFooterActionState } from "./IUseFooterActionState";
import { useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { IPokemonListResponse } from "../../../shared/interfaces/IPokemonListResponse";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonListByLimitAndOffset } from "../../../store/actionCreator";
import { IAppState } from "../../../shared/interfaces/IAppState.interface";

export const useFooterActionState = (): IUseFooterActionState => {
  const dispatch = useDispatch();

  const [isEnableNextButton, setIsEnableNextButton] = useState<boolean>(false);
  const [isEnableBackButton, setIsEnableBackButton] = useState<boolean>(false);

  const pokemonListResponse: IPokemonListResponse | undefined = useSelector(
    (state: IAppState) => state.pokemonListResponse
  );

  useEffect(() => {
    setIsEnableNextButton(!isEmpty(get(pokemonListResponse, "next")));
    setIsEnableBackButton(get(pokemonListResponse, "previous") !== null);
  }, [pokemonListResponse]);

  const handleClickNextButton = (): void => {
    if (isEnableNextButton) {
      dispatch(
        getPokemonListByLimitAndOffset(get(pokemonListResponse, "next"))
      );
    }
  };

  const handleClickBackButton = (): void => {
    if (isEnableBackButton) {
      dispatch(
        getPokemonListByLimitAndOffset(get(pokemonListResponse, "previous")!)
      );
    }
  };

  return {
    isEnableNextButton,
    isEnableBackButton,
    handleClickNextButton,
    handleClickBackButton,
  };
};
