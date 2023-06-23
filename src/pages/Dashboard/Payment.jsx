import React from "react";
import {Helmet} from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import useCart from "../../hooks/useCart";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);
const Payment = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="w-full px-5">
      <Helmet>
        <title>Bistro Boss | Payment</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center my-10">Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} cart={cart} length={cart.length} />
      </Elements>
    </div>
  );
};

export default Payment;
