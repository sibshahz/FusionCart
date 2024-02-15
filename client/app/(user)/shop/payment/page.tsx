'use client'

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/src/components/user/checkout/checkout-form.components";
import LayoutContainer from "@/src/components/user/layout-container/layout-container.component";
import AddressForm from "@/src/components/user/address-form/address-form.component";
import OrderSummary from "@/src/components/user/order-summary/order-summary.component";
import { useAppSelector } from "@/src/redux/client-hooks";
import { RootState } from "@/src/redux/client-store";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) || "";

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");
  //send cart products, user details for order creation
  const cartProducts=useAppSelector((state:RootState) => state.cart.cartProducts);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/v1/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({productsOrdered:cartProducts}),
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
      <h2 className="font-semibold text-black text-2xl md:text-4xl mb-4 md:mb-9">Payment details</h2>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </LayoutContainer>
  );
}