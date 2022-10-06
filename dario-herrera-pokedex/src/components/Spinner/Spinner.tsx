import React from "react";
import { generateRandomColor } from "../../utils/utilsFile";
import "./Spinner.styles.css";

export const Spinner: React.FC = () => {
  return (
    <div
      className="ProgressBar"
      style={{ backgroundColor: generateRandomColor() }}
    >
      <div />
    </div>
  );
};
