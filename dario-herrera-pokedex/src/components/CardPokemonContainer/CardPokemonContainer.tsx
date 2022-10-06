import React from "react";
import {
  capitalizeFirstLetter,
  generateRandomColor,
  getPokemonId,
} from "../../utils/utilsFile";
import { ResultResponse } from "../../shared/interfaces/IPokemonListResponse";
import { get } from "lodash";
import { BaseApiRouteEnum } from "../../shared/constants/BaseApiRouteEnum";
import { FormatEnum } from "../../shared/constants/FormatEnum";
import { useCardPokemonContainerState } from "./state/useCardPokemonContainerState";
import "./CardPokemonContainer.styles.css";

export const CardPokemonContainer: React.FC = () => {
  const { pokemonListResponse, handleOnContainerClick } =
    useCardPokemonContainerState();

  return (
    <div className={"CardPokemonContainer"}>
      {get(pokemonListResponse, "results", []).map(
        (resultResponse: ResultResponse, index: number) => (
          <React.Fragment key={`${resultResponse.name}-${index}`}>
            <div
              className={"CardPokemonItem"}
              style={{ backgroundColor: generateRandomColor() }}
              onClick={() => {
                handleOnContainerClick(getPokemonId(resultResponse));
              }}
            >
              <div>
                <img
                  src={`${BaseApiRouteEnum.BASE_IMAGE_URL}/${getPokemonId(
                    resultResponse
                  )}.${FormatEnum.PNG}`}
                  alt={resultResponse.name}
                  className={"PokemonImage"}
                />
              </div>
              <div>
                <h1 className={"PokemonInformation"}>{`# ${getPokemonId(
                  resultResponse
                )}`}</h1>
                <h1 className={"PokemonInformation"}>{`${capitalizeFirstLetter(
                  resultResponse.name
                )}`}</h1>
              </div>
            </div>
          </React.Fragment>
        )
      )}
    </div>
  );
};
