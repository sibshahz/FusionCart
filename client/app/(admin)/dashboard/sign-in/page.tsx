"use client"
import React from 'react'
import D_SignInForm from '@/src/components/admin/sign-in/sign-in.component'
import LayoutContainer from '@/src/components/user/layout-container/layout-container.component'
import Link from 'next/link'

type Props = {}


const D_SignIn = (props: Props) => {
  return (
    <>
    <div className="flex flex-col flex-grow justify-center p-5 items-center min-h-screen">
      <D_SignInForm />
    </div>

    </>
  )
}

export default D_SignIn