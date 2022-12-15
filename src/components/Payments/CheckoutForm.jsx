import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const CheckoutForm = ({ setThankYou, data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = async () => {
    const saveChangeRef = doc(db, "booking", data.id);

    try {
      await updateDoc(saveChangeRef, {
        booking: "upcoming",
        payDoneAt: serverTimestamp(),
      });
      setThankYou(false);
    } catch (error) {
      toast.error("Something went wrong,Try again");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173",
        },

        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }

        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment Successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <section className="paymentBar">
      <div className="payment">
        <form onSubmit={handleSubmit}>
          <div className="paymentAction">
            <h3>Stripe Payment</h3>
            <PaymentElement id="payment-element" />
            <div className="doPay">
              <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner">
                      <p>Processing...</p>
                    </div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
            </div>

            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
