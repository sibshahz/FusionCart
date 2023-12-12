"use client"
import React from 'react'
import {FormHelperText,Button,FormControl,Stack,TextField,Box} from '@mui/material';
import { postLogin } from '@/src/api/auth/auth';
import {useQueryClient,useMutation} from 'react-query'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/src/redux/features/user/userSlice';

type Props = {}

const D_SignInForm = (props: Props) => {
  const dispatch=useDispatch();
  const router=useRouter();
  const queryClient=useQueryClient();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const { mutate, isLoading } = useMutation(postLogin, {
    onSuccess: data => {
    dispatch(setUser(data));    
    router.push('/dashboard')   
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

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '65ch' },
      }}
      noValidate
      autoComplete="on"
    >
      <FormControl required>
      <Stack spacing={2}>
        <TextField 
          id="outlined-basic" 
          label="Email" 
          variant="outlined" 
          placeholder='johndoe@gmail.com'
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        <TextField 
          id="outlined-basic" 
          type="password" 
          label="Password" 
          variant="outlined" 
          placeholder='*******'
          fullWidth  
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          />
        <Button 
          variant="outlined"
          onClick={handleSignin}
          >
            Sign in
          </Button>
      </Stack>
      </FormControl>

    </Box>
  )
}

export default D_SignInForm