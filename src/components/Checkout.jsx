import React, { useState, useEffect } from "react";

const Checkout = () => {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [credit, setCredit] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <div className="checkout">
      <h2>Enter Address: </h2>
      <form 
        className="addressForm" 
        onSubmit={(e) => {
            e.preventDefault()
            alert('Your purchase was successful!')
        }}
      >
        <fieldset>
          <label htmlFor="streetAddress">
            Street Address:
            <input
              className="streetAddressInput"
              type="text"
              name="streetAddress"
              placeholder="Street (required)"
              value={streetAddress}
              onChange={(e) => {
                setStreetAddress(e.target.value);
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="city">
            City:
            <input
              className="cityInput"
              type="text"
              name="city"
              placeholder="City (required)"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="state">
            State:
            <input
              className="state"
              type="text"
              name="state"
              placeholder="State (required)"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="zip">
            Zip Code:
            <input
              className="zipInut"
              type="text"
              name="zip"
              placeholder="Zip (required)"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value);
              }}
            />
          </label>
        </fieldset>
        <h2>Card Number: </h2>
        <fieldset>
          <label htmlFor="creditCard">
            <input
              className="creditCardInput"
              type="text"
              name="creditCard"
              placeholder="1234 1234 1234 1234"
              value={credit}
              onChange={(e) => {
                setCredit(e.target.value);
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="expirationDate">
            <input
              className="expirationDateInput"
              type="text"
              name="expirationDate"
              placeholder="MM / DD"
              value={expirationDate}
              onChange={(e) => {
                setExpirationDate(e.target.value);
              }}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="CVC">
            <input
              className="cvcInput"
              type="text"
              name="CVC"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => {
                setCvc(e.target.value);
              }}
            />
          </label>
        </fieldset>
        <button>Submit Order</button>
      </form>
    </div>
  );
};

export default Checkout;
