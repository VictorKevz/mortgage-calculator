import React from "react";
import "../css/calculatedResult.css";
function CalculatedResult({result}) {
  return (
    <article className="calc-result-wrapper">
      <header>
        <h3 className="calc-result-title">Your results</h3>
        <p className="calc-result-parag header">
          Your results are shown below based on the information you provided. To
          adjust the results, edit the form and click "calculate repayments"
          again.
        </p>
      </header>

      <div className="calc-result-box">
        <p className="calc-result-parag">Your monthly repayments</p>
        <h4 className="monthly-repayment-num">{`£ ${result.monthly}`}</h4>
        <div className="divider"></div>
        <p className="calc-result-parag bottom">Total you'll repay over the term</p>
        <h5 className="total">{`£ ${result.total}`}</h5>
      </div>
    </article>
  );
}

export default CalculatedResult;
