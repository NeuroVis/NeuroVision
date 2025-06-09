'use client';
import Image from 'next/image';
import imagine from '../../public/logo-white.png';
import { Home } from 'lucide-react';
import Link from 'next/link';

export function NavBar() {
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
    </div>
  );
}
