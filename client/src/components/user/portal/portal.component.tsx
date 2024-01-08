import React from 'react'
import { createPortal } from 'react-dom'

type Props = {}

const ClientPortal = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
    {createPortal(
      <div className='w-full h-full bg-black bg-opacity-20 z-10 fixed top-0 overflow-hidden'>{children}</div>,
      document.body
    )}
    </>
  )
}

export default ClientPortal