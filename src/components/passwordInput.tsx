import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function Password({register}: {register: UseFormRegisterReturn<any>;}){
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return(
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label className={"pl-1"} htmlFor="password">Password</Label>
      <div className="relative">
        <Input
          {...register}
          id="password"
          placeholder="Enter your password"
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
  );
}
