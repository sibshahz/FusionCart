import { useAppDispatch } from '@/src/redux/client-hooks'
import { setAddress } from '@/src/redux/features/client/address/addressSlice'
import Link from 'next/link'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import CheckoutForm from '../checkout/checkout-form.components'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

type Inputs = {
  firstName: string,
  lastName: string,
  streetAddress: string,
  shippingCity: string,
  shippingState: string,
  shippingCountry: string,
  shippingPostalCode: string,
  phone: string
}

type Props = {}

const AddressForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { shippingCity,shippingCountry,shippingState,shippingPostalCode } = data;
    dispatch(setAddress({ shippingCity,shippingCountry,shippingState,shippingPostalCode }))
    router.push("/shop/payment")
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-44 gap-y-16">
        <div className="grid grid-cols-2 gap-8">
          <div className="form-group flex flex-col gap-5">
            <label htmlFor="firstName" className='font-medium text-base text-black'>First Name</label>
            <input
            value={watch("firstName")} 
            {...register("firstName")}
            type="text" id="firstName" name="firstName" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>
          <div className="form-group flex flex-col gap-5">
            <label htmlFor="lastName" className='font-medium text-base text-black'>Last Name</label>
            <input 
            value={watch("lastName")}
            {...register("lastName")}
            type="text" id="lastName" name="lastName" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>
          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="streetAddress" className='font-medium text-base text-black'>Street address</label>
            <input 
            value={watch("streetAddress")}
            {...register("streetAddress")}
            type="text" id="streetAddress" name="streetAddress" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="shippingCity" className='font-medium text-base text-black'>City</label>
            <input 
            value={watch('shippingCity')}
            {...register("shippingCity")}
            type="text" id="shippingCity" name="shippingCity" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="shippingState" className='font-medium text-base text-black'>State</label>
            <input
            value={watch("shippingState")} 
            {...register("shippingState")}
            type="text" id="shippingState" name="shippingState" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="shippingCountry" className='font-medium text-base text-black'>Country</label>
            <input
            value={watch("shippingCountry")} 
            {...register("shippingCountry")}
            type="text" id="shippingCountry" name="shippingCountry" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="shippingPostalCode" className='font-medium text-base text-black'>Zipcode</label>
            <input
            value={watch("shippingPostalCode")} 
            {...register("shippingPostalCode")}
            type="text" id="shippingPostalCode" name="shippingPostalCode" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="phone" className='font-medium text-base text-black'>Phone</label>
            <input 
            value={watch("phone")}
            {...register("phone")}
            type="phone" id="phone" name="phone" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

        </div>



        <div className='flex flex-col gap-y-7'>
        <div className="flex flex-col gap-y-4 pb-10 border-b border-border-gray">
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-medium text-black">Product</p>
            <p className="text-2xl font-medium text-black">Subtotal</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-base font-normal text-gray-5">Asgard sofa <span className='font-medium'>x 1</span></p>
            <p className="text-base font-light text-black">Rs. 250.000.00</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-base font-normal text-black">Subtotal</p>
            <p className="text-base font-light text-black">Rs. 250.000.00</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-base font-normal text-black">Total</p>
            <p className="text-2xl font-bold text-golden">Rs. 250.000.00</p>
          </div>
        </div>

        <p className='text-base font-light text-justify'>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link href="#" className="font-semibold">privacy policy.</Link></p>

        <button type='submit' className='btn btn-primary font-normal text-xl'>Continue to payment</button>
      </div>
        </div>
      </form>
  )
}

export default AddressForm