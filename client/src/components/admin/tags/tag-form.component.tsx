"use client"
import React from 'react'
import { Stack, FormGroup, TextField, FormHelperText, Button } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form"


type Props = {}
type Inputs = {
  tagName: string
  tagSlug: string
  tagDescription:string
}
const D_TagForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  return (
    <>
       <form 
          onSubmit={handleSubmit((data) => {
          console.table(data);
          })} >
          <Stack direction="column" rowGap={2}>
            <FormGroup>
              <TextField 
                id="tag-name" 
                label="Name" 
                variant="outlined" 
                autoComplete="false" 
                {...register("tagName", {required: true})}
              />
              {errors.tagName && <FormHelperText error filled>Tag name is required</FormHelperText>}
            </FormGroup>

            <FormGroup>
              <TextField 
                id="tag-slug" 
                label="Slug" 
                variant="outlined" 
                autoComplete="false" 
                {...register("tagSlug", {required: true})}
              />
              {errors.tagSlug && <FormHelperText error filled>Tag slug is required</FormHelperText>}
            </FormGroup>
            
            <FormGroup>
              <TextField 
                label="Description"
                multiline
                rows={8}
                variant="outlined"
                {...register("tagDescription")}
              />
            </FormGroup>

            <Button variant="contained" size="large" type='submit'>
              Add new tag
            </Button>
          </Stack>
        </form>
    </>
  )
}

export default D_TagForm