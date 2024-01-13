'use client'

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "@/src/components/user/checkout/checkout-form.components";
import LayoutContainer from "@/src/components/user/layout-container/layout-container.component";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/v1/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <LayoutContainer bg="inherit">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-44">
        <div className="address-form">
        <label>Address</label>
        <input type="text" placeholder="your@gmail.com" className="input input-bordered w-full min-w-full mb-2"
            // value={watch("email")}
            // {...register("email", {required: true})}
          />
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
    </LayoutContainer>
  );
}