"use client"
import React from 'react'
import {FormHelperText,Button,FormControl,Stack,TextField,Box, Typography} from '@mui/material';
import { postLogin } from '@/src/api/auth/auth';
import {useQueryClient,useMutation} from 'react-query'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { getUserDetails } from '@/src/utils/localstorage/localStorage';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { setUser } from '@/src/redux/features/user/userSlice';
import { RootState } from '@/src/redux/client-store';

type Props = {}
type Inputs = {
  email: string,
  password: string
}

const SigninForm = (props: Props) => {
  const router=useRouter();
  const dispatch=useAppDispatch();
  const queryClient=useQueryClient();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const { mutate, isLoading,isError } = useMutation(postLogin, {
    onSuccess: data => {
    dispatch(setUser(data));    
    console.log("로그인 성공: ",data);
    reset({email:"",password:""});
    // router.push('/dashboard')   
 },
   onError: (error) => {
        console.log("there was an error: ",error)
 },
   onSettled: () => {
      queryClient.invalidateQueries('create')
 }
 });

  const handleSignin=()=>{
    const userDetails={
      email,
      password
    };
    mutate(userDetails)
  }
  return(
    <>
    <h2 className='text-xl text-center'>Sign in</h2>
    <form className='w-full block'
          onSubmit={handleSubmit((data) => {
            mutate(data);
            reset();
          })} >
            <div className='flex flex-col gap-2 flex-grow w-full min-w-full'>
            <div className='mb-2 w-full min-w-full'>
              <input type="text" placeholder="your@gmail.com" className="input input-bordered w-full min-w-full mb-2"
                value={watch("email")}
                {...register("email", {required: true})}
              />

              {
              errors.email && <div role="alert" className="alert alert-error">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" 
                                      fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" 
                                      strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className='text-red-accents'>Please! enter your email.</span>
                                </div>}
            </div>

            <div className='mb-2 w-full min-w-full'>
              <input type="password" placeholder='*******' className="input input-bordered w-full min-w-full mb-2"
                value={watch("password")}
                {...register("password", {required: true})}
              />
              {errors.password && <div role="alert" className="alert alert-error">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" 
                                  fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" 
                                  strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className='text-red-accents'>Please! Enter your password.</span>
                                </div>}
            </div>

            <button className="btn btn-neutral mb-3" onClick={handleSignin}>Signin</button>
            {isError && 
                <div className="alert alert-error border border-red-accents p-4 text-red-accents text-center">Email or password is incorrect.</div>
            }
            <div>Already have an account? <Link href="signup" className='text-primary'>Signup</Link></div>
            </div>
        </form>
        </>
  )

}

export default SigninForm