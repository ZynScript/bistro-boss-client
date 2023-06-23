import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({price, cart, length}) => {
  console.log(cart.length);
  const stripe = useStripe();
  const {user} = useAuth();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [cardErr, setCardErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    console.log(price);
    if (length > 0) {
      axiosSecure.post("/create-payment-intent", {price}).then((res) => {
        console.log(res.data.clientSecret);
        console.log(res);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price]);

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
      // console.log("payment method", paymentMethod);
      setCardErr("");
    }
    setProcessing(true);

    const {paymentIntent, error: confirmError} =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }
    console.log("payment intent", paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        cartItems: cart.map((item) => item._id),
        itemNames: cart.map((item) => item.name),
        menuItems: cart.map((item) => item.menuItemId),
        quantity: length,
        data: new Date(),
        price,
        status: "pending",
      };

      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertResult.insertedId) {
          alert("payment complete");
        }
      });
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
          disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
      {cardErr && <p className="text-red-600">{cardErr}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction Complete with Transaction Id: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
