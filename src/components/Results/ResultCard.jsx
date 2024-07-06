import React, { useState } from "react";
import "../css/resultCard.css";
import "../css/form.css"
import BeforeCalculated from "./BeforeCalculated";
import CalculatedResult from "./CalculatedResult";

function ResultCard({ result, showResult }) {
  return (
    <section className="result-card-wrapper">
      {showResult ? <CalculatedResult result={result} /> : <BeforeCalculated />}
    </section>
  );
}

export default ResultCard;
