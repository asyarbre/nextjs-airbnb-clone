import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import UserNav from '@/components/elements/UserNav';

import Logo from '../../../public/images/logo.png';
import LogoMobile from '../../../public/images/logo-mobile.png';

export default function Navbar() {
  return (
    <nav className='w-full border-b'>
      <div className='container flex items-center justify-between mx-auto px-5 lg:px-10 py-5'>
        <Link href='/'>
          <Image src={Logo} alt='logo' className='w-32 hidden lg:block' />
          <Image src={LogoMobile} alt='logo' className='w-12 block lg:hidden' />
        </Link>

        <UserNav />
      </div>
    </nav>
  );
}
