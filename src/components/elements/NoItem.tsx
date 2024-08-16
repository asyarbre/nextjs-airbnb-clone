import { File } from 'lucide-react';
import * as React from 'react';

export default function NoItem() {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10'>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
        <File className='h-10 w-10 text-primary' />
      </div>
      <h2 className='mt-8 text-xl font-semibold'>
        Sorry, we couldn't find any items that match your search criteria.
      </h2>
      <p className='mt-2 text-center text-sm leading-6 text-muted-foreground'>
        Please try another search or browse the available.
      </p>
    </div>
  );
}
