'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { categoryItems } from '@/data/categoryItems';

export default function FilterItems() {
  const searchParams = useSearchParams();
  const search = searchParams.get('filter');
  const pathname = usePathname();

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <section className='flex gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar md:gap-x-0 md:justify-between'>
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          className={cn(
            search === item.name
              ? 'border-b-2 border-primary pb-2 flex-shrink-0'
              : 'opacity-70 flex-shrink-0',
            'flex flex-col gap-y-2 items-center',
          )}
          href={pathname + '?' + createQueryString('filter', item.name)}
        >
          <div className='relative w-6 h-6'>
            <Image
              src={item.imageUrl}
              alt={`icon for ${item.title}`}
              className='w-6 h-6'
              width={24}
              height={24}
            />
          </div>
          <p className='font-medium text-xs'>{item.name}</p>
        </Link>
      ))}
    </section>
  );
}
