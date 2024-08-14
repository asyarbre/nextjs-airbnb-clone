'use client';

import { signOut } from 'next-auth/react';
import * as React from 'react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export default function UserNavLogout() {
  return (
    <DropdownMenuItem
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/signin`,
        })
      }
    >
      Sign Out
    </DropdownMenuItem>
  );
}
