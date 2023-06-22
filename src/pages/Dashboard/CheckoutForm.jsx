import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React from "react";
import {useState} from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardErr, setCardErr] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    console.log("card", card);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("err", error);
      setCardErr(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setCardErr("");
    }
  };
  return (
    <div className="w-2/3 mx-auto">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-outline btn-accent my-5"
          type="submit"
          disabled={!stripe}>
          Pay
        </button>
      </form>
      {cardErr && <p className="text-red-600">{cardErr}</p>}
    </div>
  );
};

export default CheckoutForm;
