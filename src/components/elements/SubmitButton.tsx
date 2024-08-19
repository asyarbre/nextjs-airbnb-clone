'use client';

import { Heart, Loader2 } from 'lucide-react';
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

export function AddFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant='outline'
          size='icon'
          className='bg-primary-foreground'
          disabled
        >
          <Loader2 className='h-4 w-4 animate-spin' />
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          className='bg-primary-foreground'
          type='submit'
        >
          <Heart className='h-4 w-4' />
        </Button>
      )}
    </>
  );
}

export function DeleteFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant='outline'
          size='icon'
          className='bg-primary-foreground'
          disabled
        >
          <Loader2 className='h-4 w-4 animate-spin' />
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          className='bg-primary-foreground'
          type='submit'
        >
          <Heart className='h-4 w-4 text-primary' fill='#E21C49' />
        </Button>
      )}
    </>
  );
}

export default function ReservationSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className='w-full' disabled>
          <Loader2 className='h-4 w-4 animate-spin' /> Please Wait...
        </Button>
      ) : (
        <Button className='w-full' type='submit'>
          Make a Reservation
        </Button>
      )}
    </>
  );
}
