import React from "react";
import "../css/beforeCalculated.css";
import empty from "../../assets/images/illustration-empty.svg";

function BeforeCalculated() {
  return (
    <article className="before-calc-wrapper">
      <div className="before-calc-container">
        <img src={empty} alt="illustration-empty" className="empty-img" />
        <h2 className="before-calc-title">Results shown here</h2>
        <p className="before-calc-parag">
          Complete the form and click "calculate repayments" to see what your
          monthly repayments would be.
        </p>
      </div>
    </article>
  );
}

export default BeforeCalculated;
