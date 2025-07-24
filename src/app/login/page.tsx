'use client'

import React, { useState } from "react";
import { Button } from '@nextui-org/react';
import Password from "../../components/passwordInput";
import Link from "next/link";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {login, register as registerUser} from '../../lib/api/auth';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .email('You must enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must have at least 8 characters')
  })
  .required();

export default function Page() {
  const { handleSubmit, register, formState: {errors} } = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      password: '',
      email: ''
    },
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: any) {
    const userid= await login(data.email, data.password);
    if(userid!==null){
      localStorage.setItem("token", String(userid));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex-col flex gap-2 pt-10 items-center h-screen mt-14'>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label className={"pl-1"} htmlFor="email">Email</Label>
        <Input {...register('email')} type="email" id="email" placeholder="Enter your email" />
      </div>
      <Password register={register("password")} />

      <Button onClick={handleSubmit(onSubmit)} radius="full" type="submit" className="bg-gradient-to-tr from-indigo-400 to-indigo-950  text-white shadow-lg px-32" >
        Log in
      </Button>
      <Link href='/register' className="underline text-gray-500 text-sm">Don't have an account? Register</Link>
    </form>
  );
}

