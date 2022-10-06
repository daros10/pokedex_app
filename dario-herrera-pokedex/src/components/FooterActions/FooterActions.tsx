import React from "react";
import { PokedexConstants } from "../../shared/constants/PokedexConstants";
import { useFooterActionState } from "./state/useFooterActionState";
import "./FooterAction.styles.css";

export const FooterActions: React.FC = () => {
  const {
    isEnableNextButton,
    isEnableBackButton,
    handleClickNextButton,
    handleClickBackButton,
  } = useFooterActionState();

  return (
    <div className={"FooterActionsContainer"}>
      <button
        type={"button"}
        className={!isEnableBackButton ? "DisabledButton" : "Ripple"}
        onClick={handleClickBackButton}
      >
        <span className={"RightSpanIcon"}>&#9001;</span>
        {PokedexConstants.BACK}
      </button>
      <button
        type={"button"}
        className={!isEnableNextButton ? "DisabledButton" : "Ripple"}
        onClick={handleClickNextButton}
      >
        {PokedexConstants.NEXT}
        <span className={"LeftSpanIcon"}>&#9002;</span>
      </button>
    </div>
  );
};
