"use client"
import React from 'react'
import { store } from './store'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor} from './store'

// Create a client
const StoreProvider = ({
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

export default StoreProvider