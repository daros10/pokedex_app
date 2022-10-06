import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonDetailsByNameOrId,
  getPokemonListByLimitAndOffset,
} from "../../store/actionCreator";
import { IAppState } from "../../shared/interfaces/IAppState.interface";
import { defaultTo } from "lodash";
import { IUseMainState } from "./IUseMainState";

export const useMainState = (): IUseMainState => {
  const dispatch = useDispatch();

  const isLoading: boolean = useSelector((state: IAppState) =>
    defaultTo(state.isLoading, false)
  );

  useEffect(() => {
    dispatch(getPokemonListByLimitAndOffset());
    dispatch(getPokemonDetailsByNameOrId(1, true));
  }, []);

  return {
    isLoading,
  };
};
