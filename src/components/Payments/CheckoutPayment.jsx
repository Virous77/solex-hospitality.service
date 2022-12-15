import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MCPQJSHnj0cswqZAK0Vu8w3Xg1odRd3jDRXfE9DGcXE5JPgvELM9ZZE4dhP6wT4RGqymYInfxtSuvtBnQk0xxgA001IazUNCF"
);

const CheckoutPayment = ({ setThankYou, data, email }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Initializing checkout...");
  const total = data?.grandTotal?.replaceAll(",", "");
  const description = `solex: email: ${email}, Ammounts: ${total}`;

  const shippingAdd = {
    line1: "kohara",
    line2: "patna",
    city: "saran",
    country: "united states",
    postal_code: 841205,
    name: "reetesh kumar",
    phone: 8323220747,
  };

  useEffect(() => {
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shipping: shippingAdd,
        description,
        total: total,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })

      .catch((error) => {
        setMessage("failed to initialize checkout");
        toast.error(error.message);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section className="initial">
        {!clientSecret && <h4>{message}</h4>}
        <div className="checkForm">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm setThankYou={setThankYou} data={data} />
            </Elements>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutPayment;
