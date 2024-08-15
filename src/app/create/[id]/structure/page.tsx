import Link from 'next/link';
import * as React from 'react';

import SelectedCategory from '@/components/elements/SelectedCategory';
import { Button } from '@/components/ui/button';

export default function StructurePage() {
  return (
    <section>
      <div className='w-3/5 mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Which of these best descrive your home?
        </h2>
      </div>

      <form action=''>
        <SelectedCategory />

        <div className='fixed w-full bottom-0 z-10 bg-white border-t h-24'>
          <div className='flex items-center justify-between mx-auto px-5 lg:px-10 h-full'>
            <Button variant='outline' asChild>
              <Link href='/'>Cancel</Link>
            </Button>
            <Button>Save</Button>
          </div>
        </div>
      </form>
    </section>
  );
}
