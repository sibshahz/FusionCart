import React from 'react'

import { 
  Input,InputGroup, FormControl, 
  FormLabel, FormHelperText, InputRightElement, 
  Button, 
  Link
} from '@chakra-ui/react'

type Props = {}

const D_SignInForm = (props: Props) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md' className='flex flex-col lg:max-w-[50%] gap-5'>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type='email' />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme='teal' size='md' w={120}>
        Sign In
      </Button>
      <div className="self-start">
        Don't have an account? <Link href="/dashboard/register">Register</Link>
      </div>
    </InputGroup>
  )
}

export default D_SignInForm