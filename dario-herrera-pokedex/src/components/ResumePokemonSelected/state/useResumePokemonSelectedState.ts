import { IUseResumePokemonSelectedState } from "./IUseResumePokemonSelectedState";
import { BaseApiRouteEnum } from "../../../shared/constants/BaseApiRouteEnum";
import { get } from "lodash";
import { FormatEnum } from "../../../shared/constants/FormatEnum";
import {
  IPokemonDetailResponse,
  Move,
  Type,
} from "../../../shared/interfaces/IPokemonDetailResponse";
import { capitalizeFirstLetter } from "../../../utils/utilsFile";
import { useSelector } from "react-redux";
import { IAppState } from "../../../shared/interfaces/IAppState.interface";
import { useEffect, useState } from "react";

export const useResumePokemonSelectedState =
  (): IUseResumePokemonSelectedState => {
    const [basePath, setBasePath] = useState<
      IPokemonDetailResponse | undefined
    >(undefined);
    const [spriteArray, setSpriteArray] = useState<string[]>([]);
    const [mainPokemonImageSrc, setMainPokemonImageSrc] = useState<string>("");
    const [pokemonId, setPokemonId] = useState<string>("");
    const [pokemonName, setPokemonName] = useState<string>("");
    const [pokemonWeight, setPokemonWeight] = useState<string>("");
    const [pokemonType, setPokemonType] = useState<Type[]>([]);
    const [moveArray, setMoveArray] = useState<Move[]>([]);

    const pokemonDetailsResponse: IPokemonDetailResponse | undefined =
      useSelector((state: IAppState) => state.pokemonDetailsResponse);

    useEffect(() => {
      setBasePath(pokemonDetailsResponse);

      if (pokemonDetailsResponse) {
        setSpriteArray(
          Object.values(pokemonDetailsResponse.sprites)
            .slice(0, 7)
            .filter((data: string) => data !== null)
            .slice(0, 4)
        );

        setMainPokemonImageSrc(
          `${BaseApiRouteEnum.BASE_IMAGE_SVG_URL}/${get(basePath, "id", 1)}.${
            FormatEnum.SVG
          }`
        );
        setPokemonId(`# ${get(basePath, "id", 1)}`);
        setPokemonName(`${capitalizeFirstLetter(get(basePath, "name", ""))}`);
        setPokemonWeight(`${get(basePath, "weight")} Kg`);
        setPokemonType(get(basePath, "types", []));
        setMoveArray(get(basePath, "moves", []).slice(0, 7));
      }
    }, [pokemonDetailsResponse, basePath]);

    return {
      spriteArray,
      mainPokemonImageSrc,
      pokemonId,
      pokemonName,
      pokemonWeight,
      pokemonType,
      moveArray,
    };
  };
