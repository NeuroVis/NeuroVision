'use client';
import Image from 'next/image';
import imagine from '../../public/logo-white.png';
import { SquareMenu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export function NavBar() {
  return (
    <div className='flex flex-row items-center gap-2 bg-indigo-800 text-white shadow-xl shadow-indigo-800'>
      <DropdownMenu>
        <DropdownMenuTrigger className={'ml-4'} asChild>
          <SquareMenu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>Learn with NeuroVision</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Core concepts</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={'/educational/learning-rate'}>Learning rate</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={'/educational/activation'}>Activation</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={'/educational/regularization'}>Regularization</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={'/educational/regularization-rate'}>
              Regularization rate
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={'/educational/problem-type'}>Problem type</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={'/'}>Home</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className='flex w-full flex-row items-center justify-center gap-2 text-white'>
        <Image src={imagine} alt={'icon'} width={50} height={50}></Image>
        <p className={'text-2xl font-semibold'}>NeuroVision</p>
      </div>
    </div>
  );
}
