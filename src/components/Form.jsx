import React, { useState, useEffect } from "react";
import "./css/form.css";

import ResultCard from "./Results/ResultCard";
import calculatorIcon from "../assets/images/icon-calculator.svg";

function Form() {
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    interest: "",
    mortgageType: "",
  });

  const [result, setResult] = useState({
    monthly: "",
    total: "",
  });

  const [formValid, setFormValid] = useState({
    amount: true,
    term: true,
    interest: true,
    mortgageType: true,
  });

  const [showResult, setShowResult] = useState(false);

  const errorMessage = "This field is required";

  // Handle Changes Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
    setFormValid((prevValid) => ({
      ...prevValid,
      [name]: true,
    }));
  };

  useEffect(() => {
    const calculateResults = () => {
      let rate = Number(formData.interest) / (12 * 100);
      let numberOfPayments = Number(formData.term) * 12;
      let principal = Number(formData.amount);
      let calcMonthly = 0;
      let calcTotal = 0;

      if (formData.mortgageType === "repayment") {
        calcMonthly =
          principal *
          ((rate * Math.pow(1 + rate, numberOfPayments)) /
            (Math.pow(1 + rate, numberOfPayments) - 1));
        calcMonthly = Math.round(calcMonthly * 100) / 100;

        calcTotal = numberOfPayments * calcMonthly;
        calcTotal = Math.round(calcTotal * 100) / 100;
      } else if (formData.mortgageType === "interest") {
        calcMonthly = principal * rate;
        calcMonthly = Math.round(calcMonthly * 100) / 100;

        calcTotal = calcMonthly * numberOfPayments;
        calcTotal = Math.round(calcTotal * 100) / 100;
      }

      setResult({
        monthly: calcMonthly,
        total: calcTotal,
      });
    };

    calculateResults();
  }, [formData]);

  const handleReset = () => {
    setFormData({
      amount: "",
      term: "",
      interest: "",
      mortgageType: "",
    });
    setResult({
      monthly: "",
      total: "",
    });
    setFormValid({
      amount: true,
      term: true,
      interest: true,
      mortgageType: true,
    });
    setShowResult(false);
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    let isValid = true;
    let newFormValid = { ...formValid };

    if (!formData.amount) {
      newFormValid.amount = false;
      isValid = false;
    }

    if (!formData.term) {
      newFormValid.term = false;
      isValid = false;
    }

    if (!formData.interest) {
      newFormValid.interest = false;
      isValid = false;
    }

    if (!formData.mortgageType) {
      newFormValid.mortgageType = false;
      isValid = false;
    }

    setFormValid(newFormValid);

    if (isValid) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  };

  return (
    <section className="form-wrapper">
      <form onSubmit={handleSubmission} className="form-container" noValidate autoComplete="off">
        <header className="heading-container">
          <h1 className="heading-title">Mortgage Calculator</h1>
          <button type="button" className="reset-button" onClick={handleReset}>
            Clear All
          </button>
        </header>
        <div className="fields-container">
          {/* ------------------- THE FIRST FIELD ------------------- */}
          <fieldset className="field amount">
            <legend>Mortgage Amount</legend>
            <div className="amount-sign-container">
              <label htmlFor="mortgage-amount"></label>
              <input
                type="number"
                id="mortgage-amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`input amount ${!formValid.amount && 'error-border'}`}
              />
              <span className={`sign pound ${!formValid.amount && 'error-bg'}`}>£</span>
            </div>
            {!formValid.amount && <span className="error">{errorMessage}</span>}
          </fieldset>
          {/* ------------------- CONTAINER FOR TWO FIELDS ------------------- */}
          <div className={`term-interest-container ${!formValid.term || !formValid.interest ? 'error-margin':''}`}>
            <fieldset className="field term">
              <legend>Mortgage Term</legend>
              <div className="term-sign-container">
                <label htmlFor="mortgage-term"></label>
                <input
                  type="number"
                  id="mortgage-term"
                  name="term"
                  value={formData.term}
                  onChange={handleChange}
                  className={`input mortgage ${!formValid.term && 'error-border'}`}
                />
                <span className={`sign years ${!formValid.term && 'error-bg'}`}>years</span>
              </div>
              {!formValid.term && <span className="error">{errorMessage}</span>}
            </fieldset>
            {/* ------------------- 2ND INNER FIELD ------------------- */}
            <fieldset className="field interest">
              <legend>Interest Rate</legend>
              <div className="interest-sign-container">
                <label htmlFor="mortgage-interest"></label>
                <input
                  type="number"
                  id="mortgage-interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className={`input interest ${!formValid.interest && 'error-border'}`}
                />
                <span className={`sign percentage ${!formValid.interest && 'error-bg'}`}>%</span>
              </div>
              {!formValid.interest && <span className="error">{errorMessage}</span>}
            </fieldset>
          </div>
          {/* ------------------- THIRD GROUPED FIELD ------------------- */}
          <fieldset className={`field repayment-interest ${!formValid.mortgageType && 'error-margin'}`}>
            <legend>Mortgage Type</legend>
            <div className="repayment-option-container">
              <label className="radio-label" htmlFor="repayment-option">
                <input
                  type="radio"
                  id="repayment-option"
                  name="mortgageType"
                  value="repayment"
                  checked={formData.mortgageType === "repayment"}
                  onChange={handleChange}
                  className="my-radio repayment"
                />
                <span className="custom-radio">
                  <span className="inner-circle"></span>
                </span>
                Repayment
              </label>
            </div>
            <div className="interest-option-container">
              <label className="radio-label" htmlFor="interest-option">
                <input
                  type="radio"
                  id="interest-option"
                  name="mortgageType"
                  value="interest"
                  checked={formData.mortgageType === "interest"}
                  onChange={handleChange}
                  className="my-radio interest-option"
                />
                <span className="custom-radio">
                  <span className="inner-circle"></span>
                </span>
                Interest Only
              </label>
            </div>
            {!formValid.mortgageType && <span className="error last">{errorMessage}</span>}
          </fieldset>
          <fieldset className="field submission">
            <button type="submit" className="submit-btn">
              <img
                src={calculatorIcon}
                alt="icon-calculator"
                className="icon-calculator"
              />
              Calculate Repayments
            </button>
          </fieldset>
        </div>
      </form>
      <ResultCard result={result} showResult={showResult} />
    </section>
  );
}

export default Form;