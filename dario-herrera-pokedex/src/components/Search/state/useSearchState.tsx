import { IUseSearchState } from "./IUseSearchState";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { defaultTo, get, isEmpty } from "lodash";
import {
  getPokemonDetailsByNameOrId,
  setIsNotFoundPokemon,
} from "../../../store/actionCreator";
import { KeyEnum } from "../../../shared/constants/KeyEnum";
import { IAppState } from "../../../shared/interfaces/IAppState.interface";

export const useSearchState = (): IUseSearchState => {
  const dispatch = useDispatch();

  const [isRenderMessage, setIsRenderMessage] = useState<boolean>(false);

  const isNotFoundPokemon: boolean = useSelector((state: IAppState) =>
    defaultTo(state.isNotFoundPokemon, false)
  );

  const handleOnInputChance = (
    event: React.ChangeEvent<HTMLInputElement> &
      React.KeyboardEvent<HTMLInputElement>
  ): void => {
    const valueToSearch: string = get(event, "target.value", "");
    const isPressedEnterKey: boolean = get(event, "key", "") === KeyEnum.ENTER;

    if (isPressedEnterKey && !isEmpty(valueToSearch)) {
      dispatch(getPokemonDetailsByNameOrId(valueToSearch.toLowerCase()));
    }

    setIsRenderMessage(valueToSearch.length > 4);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsRenderMessage(false);
    }, 3000);
  }, [isRenderMessage]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsNotFoundPokemon(false));
    }, 3000);
  }, [isNotFoundPokemon]);

  return {
    handleOnInputChance,
    isRenderMessage,
    isNotFoundPokemon,
  };
};
