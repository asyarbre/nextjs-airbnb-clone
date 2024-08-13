import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default async function UserNav() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='rounded-full border px-2 py-2 lg:px-4 flex items-center gap-x-3'>
          <MenuIcon className='w-6 h-6' />
          <Image
            src={user?.picture || ''}
            alt='user'
            className='w-6 h-6 hidden lg:block'
            width={24}
            height={24}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[200px]'>
        {user ? (
          <DropdownMenuItem asChild>
            <LogoutLink className='w-full'>Logout</LogoutLink>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <RegisterLink className='w-full'>Register</RegisterLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <LoginLink className='w-full'>Login</LoginLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
