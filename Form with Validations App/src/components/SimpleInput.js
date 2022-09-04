import React from "react";
import useInput from "./useInput";

const SimpleInput = (props) => {
  const {
    value: name,
    validValue: validName,
    hasError: nameError,
    enteredValueHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((enteredValue) => enteredValue.trim() !== "");

  const {
    value: email,
    validValue: validEmail,
    hasError: emailError,
    enteredValueHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((enteredValue) => enteredValue.includes("@"));

  let formValid = false;
  if (validName && validEmail) {
    formValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!validName || !validEmail) {
      return;
    }

    resetName();
    resetEmail();
  };

  const nameClasses = nameError ? "form-control invalid" : "form-control";
  const emailClasses = emailError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={name}
        />
      </div>
      {nameError && <p className="error-text">Field must not be empty.</p>}

      <div className={emailClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={email}
        />
      </div>
      {emailError && <p className="error-text">Not a valid email.</p>}

      <div className="form-actions">
        <button disabled={!formValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
