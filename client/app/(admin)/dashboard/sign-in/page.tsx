"use client"
import React from 'react'
import D_SignInForm from '@/src/components/admin/sign-in/sign-in.component'
import LayoutContainer from '@/src/components/user/layout-container/laytout-container.component'
import Link from 'next/link'

type Props = {}


const D_SignIn = (props: Props) => {
  return (
    <>
    <div className="flex flex-col justify-center p-5 items-center mt-28">
      <D_SignInForm />
    </div>

    </>
  )
}

export default D_SignIn