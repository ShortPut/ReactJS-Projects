import { useState } from "react";

const useImput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [touched, setTouched] = useState(false);

  const validValue = validateValue(enteredValue);
  const hasError = touched && !validValue;

  const enteredValueHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setTouched(false);
  };

  return {
    value: enteredValue,
    validValue: validValue,
    hasError: hasError,
    enteredValueHandler,
    inputBlurHandler,
    reset,
  };
};

export default useImput;
