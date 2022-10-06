import React from "react";
import { PokedexConstants } from "../../shared/constants/PokedexConstants";
import { InputTypeEnum } from "../../shared/constants/InputTypeEnum";
import { useSearchState } from "./state/useSearchState";
import "./Search.styles.css";

export const Search: React.FC = () => {
  const { handleOnInputChance, isRenderMessage, isNotFoundPokemon } =
    useSearchState();

  return (
    <div className={"InputSearch"}>
      <label>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={"css-i6dzq1"}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          placeholder={PokedexConstants.SEARCH}
          type={InputTypeEnum.SEARCH}
          onChange={handleOnInputChance}
          onKeyPress={handleOnInputChance}
        />
      </label>
      {(isRenderMessage || isNotFoundPokemon) && (
        <div
          className={"AlertContainer"}
          style={{ backgroundColor: isNotFoundPokemon ? "#a52a2a" : "#2196f3" }}
        >
          <div className={"AlertContent"}>
            {isNotFoundPokemon
              ? PokedexConstants.NOT_FOUND
              : PokedexConstants.ALERT_MESSAGE}
          </div>
        </div>
      )}
    </div>
  );
};
