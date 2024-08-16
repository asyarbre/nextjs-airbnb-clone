'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

export function CreationSubmit() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size='lg'>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Please Wait
        </Button>
      ) : (
        <Button type='submit' size='lg'>
          Next
        </Button>
      )}
    </>
  );
}
