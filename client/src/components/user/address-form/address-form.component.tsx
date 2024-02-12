import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  firstName: string,
  lastName: string,
  streetAddress: string,
  city: string,
  state: string,
  country: string,
  zipcode: string,
  phone: string
}

type Props = {}

const AddressForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("firstName")) // watch input 

  return (

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-8">
          <div className="form-group flex flex-col gap-5">
            <label htmlFor="firstName" className='font-medium text-base text-black'>First Name</label>
            <input 
            {...register("firstName")}
            type="text" id="firstName" name="firstName" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>
          <div className="form-group flex flex-col gap-5">
            <label htmlFor="lastName" className='font-medium text-base text-black'>Last Name</label>
            <input 
            {...register("lastName")}
            type="text" id="lastName" name="lastName" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>
          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="streetAddress" className='font-medium text-base text-black'>Street address</label>
            <input 
            {...register("streetAddress")}
            type="text" id="streetAddress" name="streetAddress" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="city" className='font-medium text-base text-black'>City</label>
            <input 
            {...register("city")}
            type="text" id="city" name="city" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="state" className='font-medium text-base text-black'>State</label>
            <input 
            {...register("state")}
            type="text" id="state" name="state" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="country" className='font-medium text-base text-black'>Country</label>
            <input 
            {...register("country")}
            type="text" id="country" name="country" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="zipcode" className='font-medium text-base text-black'>Zipcode</label>
            <input 
            {...register("zipcode")}
            type="text" id="zipcode" name="zipcode" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

          <div className="col-span-2 form-group flex flex-col gap-5">
            <label htmlFor="phone" className='font-medium text-base text-black'>Phone</label>
            <input 
            {...register("phone")}
            type="phone" id="phone" name="phone" className='p-2 rounded-xl border border-gray-5 h-16' />
          </div>

        </div>
      </form>
  )
}

export default AddressForm