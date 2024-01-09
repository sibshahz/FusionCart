"use client"
import React from 'react'
import { store } from './client-store'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor} from './client-store'

// Create a client
const ClientStoreProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ClientStoreProvider