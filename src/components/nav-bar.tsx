'use client';
import Image from 'next/image';
import imagine from '../../public/logo-white.png';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function NavBar() {

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleAccountClick = () => {
    if (isLoggedIn) {
      router.push('/account');
    } else {
      router.push('/register');
    }
  };

  return (
    <div className='sticky top-0 left-0 z-50 flex flex-row items-center gap-2 bg-indigo-800 text-white'>
      <Link href='/' className='pl-2'>
        <Home />
      </Link>
      <Link
        href='/'
        className='flex w-full flex-row items-center justify-center gap-2 text-white'
      >
        <Image src={imagine} alt={'icon'} width={50} height={50}></Image>
        <p className={'text-2xl font-semibold'}>NeuroVision</p>
      </Link>
      <Button onClick={handleAccountClick} className={"px-2 py-1 bg-indigo-750 mr-3 rounded-full border-2 border-white text-white"}>
        Account
      </Button>
    </div>
  );
}
