'use client'

import React, { useState } from "react";
import Password from "../../components/passwordInput";
import Link from "next/link";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {register as registerUser} from '../../lib/api/auth';
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = yup
  .object({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must have at least 3 characters')
      .max(50, 'Username must have less than 50 characters'),
    email: yup
      .string()
      .required('Email is required')
      .email('You must enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must have at least 8 characters'),
    passwordRep: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Passwords must match')
  })
  .required();

export default function Page() {
  const { handleSubmit, register, formState: {errors} } = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      passwordRep: ''
    },
    resolver: yupResolver(schema),
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  async function onSubmit(data: any) {
    await registerUser(data.email, data.username, data.password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex-col flex gap-2 pt-10 items-center h-screen mt-14'>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label className={"pl-1"} htmlFor="username">Username</Label>
        <Input {...register('username')} type="username" id="username" placeholder="Enter a username" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label className={"pl-1"} htmlFor="email">Email</Label>
        <Input {...register('email')} type="email" id="email" placeholder="Enter your email" />
      </div>
      <Password register={register("password")} />
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label className={"pl-1"} htmlFor="passwordRep">Repeat password</Label>
        <div className="relative">
          <Input
            {...register("passwordRep")}
            id="passwordRep"
            placeholder="Repeat your password"
            type={isVisible ? "text" : "password"}
            className="pr-10"
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
            aria-label="Toggle password visibility"
          >
            {isVisible ? (
              <Eye className="h-4 w-4 text-gray-500" />
            ) : (
              <EyeOff className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>
      <Button onClick={handleSubmit(onSubmit)}  type="submit" className="rounded-full bg-gradient-to-tr from-indigo-400 to-indigo-950  text-white shadow-lg px-32" >
        Register
      </Button>
      <Link href='/login' className="underline text-gray-500 text-sm">Already have an account? Log In</Link>
    </form>
  );
}

