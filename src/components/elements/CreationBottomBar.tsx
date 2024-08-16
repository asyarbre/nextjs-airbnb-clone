import Link from 'next/link';
import * as React from 'react';

import { CreationSubmit } from '@/components/elements/SubmitButton';
import { Button } from '@/components/ui/button';

export default function CreationBottomBar() {
  return (
    <div className='fixed w-full bottom-0 z-10 bg-background border-t h-24'>
      <div className='flex items-center justify-between mx-auto px-5 lg:px-10 h-full'>
        <Button variant='outline' asChild>
          <Link href='/'>Cancel</Link>
        </Button>
        <CreationSubmit />
      </div>
    </div>
  );
}
