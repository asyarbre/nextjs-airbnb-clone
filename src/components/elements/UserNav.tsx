import { MenuIcon, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import * as React from 'react';

import { authOptions } from '@/lib/auth';

import UserNavLogout from '@/components/elements/UserNavLogout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default async function UserNav() {
  const session = await getServerSession(authOptions);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='rounded-full border px-2 py-2 lg:px-4 flex items-center gap-x-3'>
          <MenuIcon className='w-6 h-6' />
          {session?.user ? (
            <Image
              src={session?.user.image ?? ''}
              alt='user'
              className='w-6 h-6 rounded-full'
              width={24}
              height={24}
            />
          ) : (
            <UserRound className='w-6 h-6 hidden lg:block' />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[200px]'>
        {session?.user ? (
          <>
            <UserNavLogout />
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href='/signin'>Sign In</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/signup'>Sign Up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
