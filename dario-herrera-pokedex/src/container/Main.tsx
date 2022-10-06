import React from "react";
import { PokedexConstants } from "../shared/constants/PokedexConstants";
import { Search } from "../components/Search/Search";
import { CardPokemonContainer } from "../components/CardPokemonContainer/CardPokemonContainer";
import { ResumePokemonSelected } from "../components/ResumePokemonSelected/ResumePokemonSelected";
import { FooterActions } from "../components/FooterActions/FooterActions";
import { useMainState } from "./state/useMainState";
import { Spinner } from "../components/Spinner/Spinner";
import "./Main.styles.css";

export const Main: React.FC = () => {
  const { isLoading } = useMainState();

  return (
    <>
      <div className={"SpinnerContainer"}>{isLoading && <Spinner />}</div>
      <h1 className={"MainTitle"}>{PokedexConstants.POKEMON_LIST_TITLE}</h1>
      <div className={"Container"}>
        <Search />
        <CardPokemonContainer />
        <ResumePokemonSelected />
        <FooterActions />
      </div>
    </>
  );
};
