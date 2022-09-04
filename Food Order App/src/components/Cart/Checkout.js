import styles from "./Checkout.module.css";
import React, { useState, useRef } from "react";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  const [inputValidity, setInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const validEneteredName = !isEmpty(enteredName);
    const validEneteredStreet = !isEmpty(enteredStreet);
    const validEneteredPostal = !isEmpty(enteredPostal);
    const validEneteredCity = !isEmpty(enteredCity);

    setInputValidity({
      name: validEneteredName,
      street: validEneteredStreet,
      postal: validEneteredPostal,
      city: validEneteredCity,
    });

    const validForm =
      validEneteredName &&
      validEneteredStreet &&
      validEneteredPostal &&
      validEneteredCity;

    if (!validForm) {
      return;
    }
  };

  const nameStyles = `${styles.control} ${
    inputValidity.name ? "" : styles.invalid
  }`;
  const streetStyles = `${styles.control} ${
    inputValidity.street ? "" : styles.invalid
  }`;
  const postalStyles = `${styles.control} ${
    inputValidity.postal ? "" : styles.invalid
  }`;
  const cityStyles = `${styles.control} ${
    inputValidity.city ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameStyles}>
        <label htmlFor="name">Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!inputValidity.name && <p>Enter a valid name.</p>}
      </div>

      <div className={streetStyles}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!inputValidity.street && <p>Enter a valid street.</p>}
      </div>

      <div className={postalStyles}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!inputValidity.postal && <p>Enter a valid postal.</p>}
      </div>

      <div className={cityStyles}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!inputValidity.city && <p>Enter a valid city.</p>}
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={props.onHideCart}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
