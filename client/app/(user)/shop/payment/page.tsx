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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { postOrder } from "@/src/api/payment/payment";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) || "";

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntent, setPaymentIntent] = useState(false);
  //send cart products, user details for order creation
  const user=useAppSelector((state:RootState) => state.user);
  const cartProducts=useAppSelector((state:RootState) => state.cart.cartProducts);


  const queryClient = useQueryClient();

  const { mutate:mutatePayment, isLoading:paymentLoading } = useMutation(postOrder, {
    onSuccess: data => {
    setClientSecret(data);
  },
    onError: (error) => {
      console.log("there was an error: ",error)
  },
    onSettled: () => {
      queryClient.invalidateQueries('payment')
  },retry:false
  });
  useEffect(() => {
    if(paymentIntent==false){
    console.table("*** POSTING ORDER",cartProducts)
      mutatePayment({
        customer:user._id,
        productsOrdered:cartProducts,
      });
      setPaymentIntent((prev) => !prev);
    }
  }, [paymentIntent]);

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