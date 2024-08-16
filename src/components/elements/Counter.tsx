'use client';

import { Minus, Plus } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';

interface CounterProps {
  name: string;
}

export default function Counter({ name }: CounterProps) {
  const [count, setCount] = React.useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  return (
    <div className='flex items-center gap-x-4'>
      <input type='hidden' name={name} value={count} />
      <Button
        variant='outline'
        size='icon'
        type='button'
        onClick={decrement}
        disabled={count <= 0}
      >
        <Minus className='h-4 w-4 text-primary' />
      </Button>
      <p className='font-medium text-lg'>{count}</p>
      <Button variant='outline' size='icon' type='button' onClick={increment}>
        <Plus className='h-4 w-4 text-primary' />
      </Button>
    </div>
  );
}
