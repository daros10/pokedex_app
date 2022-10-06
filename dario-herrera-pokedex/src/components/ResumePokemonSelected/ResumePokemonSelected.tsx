import React from "react";
import { generateRandomColor } from "../../utils/utilsFile";
import { PokedexConstants } from "../../shared/constants/PokedexConstants";
import { Move, Type } from "../../shared/interfaces/IPokemonDetailResponse";
import { useResumePokemonSelectedState } from "./state/useResumePokemonSelectedState";
import "./ResumePokemonSelected.styles.css";

export const ResumePokemonSelected: React.FC = () => {
  const {
    spriteArray,
    mainPokemonImageSrc,
    pokemonId,
    pokemonName,
    pokemonWeight,
    pokemonType,
    moveArray,
  } = useResumePokemonSelectedState();

  return (
    <div
      className={"ResumePokemonSelectedContainer"}
      style={{ backgroundColor: generateRandomColor() }}
    >
      <div className={"CenterContent"}>
        <img
          src={mainPokemonImageSrc}
          alt={pokemonName}
          className={"PokemonSelectedImage"}
        />
      </div>
      <div className={"GridBasicInformation"}>
        <div className={"Id"}>{pokemonId}</div>
        <div className={"Name"}>{pokemonName}</div>
      </div>
      <div className={"GridTypeInformation"}>
        <div className={"Type"}>{PokedexConstants.TYPES}</div>
        {pokemonType.map((dataType: Type, index: number) => (
          <React.Fragment key={`${index}-${dataType.type.name}-type`}>
            <div
              className={"TypeText"}
              style={{ backgroundColor: generateRandomColor() }}
            >{`${dataType.type.name}`}</div>
          </React.Fragment>
        ))}
      </div>
      <div className={"GridWeight"}>
        <div className={"WeightTitle"}>{PokedexConstants.WEIGHT}</div>
        <div
          className={"WeightValue"}
          style={{ backgroundColor: generateRandomColor() }}
        >
          {pokemonWeight}
        </div>
      </div>
      <div className={"GridSprites"}>
        <div className={"Type"}>{PokedexConstants.SPRITES}</div>
        {spriteArray.map((spriteData: string, index: number) => (
          <React.Fragment key={`${index}-${spriteData}-sprites`}>
            <img
              src={`${spriteData}`}
              alt={spriteData}
              style={{
                backgroundColor: generateRandomColor(),
              }}
              className={"Sprite"}
            />
          </React.Fragment>
        ))}
      </div>
      <div className={"GridTypeInformation"}>
        <div className={"Type"}>{PokedexConstants.MOVES}</div>
        {moveArray.map((moveData: Move, index: number) => (
          <React.Fragment key={`${index}-${moveData.move.name}-moves`}>
            <div
              className={"TypeText"}
              style={{ backgroundColor: generateRandomColor() }}
            >{`${moveData.move.name}`}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
