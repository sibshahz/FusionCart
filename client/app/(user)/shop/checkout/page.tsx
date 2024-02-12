'use client'

import React from "react";
import LayoutContainer from "@/src/components/user/layout-container/layout-container.component";
import AddressForm from "@/src/components/user/address-form/address-form.component";

export default function CheckoutPage() {

  return (
    <LayoutContainer bg="inherit">
      <h2 className="font-semibold text-black text-2xl md:text-4xl mb-4 md:mb-9">Billing details</h2>
      <AddressForm />
    </LayoutContainer>
  );
}