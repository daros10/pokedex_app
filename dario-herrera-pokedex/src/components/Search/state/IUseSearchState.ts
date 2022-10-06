import React from "react";

export interface IUseSearchState {
  handleOnInputChance: (
    event: React.ChangeEvent<HTMLInputElement> &
      React.KeyboardEvent<HTMLInputElement>
  ) => void;
  isRenderMessage: boolean;
  isNotFoundPokemon: boolean;
}
