import SigninForm from '@/src/components/user/signin/signin-form.component'
import React from 'react'

type Props = {}

const SignIn = (props: Props) => {
  return (
    <>
      <div className='flex flex-col gap-6 justify-center max-w-[80%] w-96'>
        <SigninForm />
      </div>
    </>
  )
}

export default SignIn