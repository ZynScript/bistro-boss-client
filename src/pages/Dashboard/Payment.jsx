import React from "react";
import {Helmet} from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);
const Payment = () => {
  return (
    <div className="w-full px-5">
      <Helmet>
        <title>Bistro Boss | Payment</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center my-10">Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
