'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';

import { useCountries } from '@/lib/getCountries';

import CreationBottomBar from '@/components/elements/CreationBottomBar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import { createLocation } from '@/actions/action';

export default function AddressPage({ params }: { params: { id: string } }) {
  const { getAllCountries } = useCountries();
  const [locationValue, setLocationValue] = React.useState('');

  const LazyMap = dynamic(() => import('@/components/elements/Map'), {
    ssr: false,
    loading: () => <Skeleton className='h-[50vh] w-full' />,
  });

  return (
    <section>
      <div className='w-3/5 mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Where is your home located?
        </h2>
      </div>

      <form action={createLocation}>
        <input type='hidden' name='homeId' value={params.id} />
        <input type='hidden' name='countryValue' value={locationValue} />
        <div className='w-3/5 mx-auto mb-36'>
          <div className='mt-5'>
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a country' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.flag} {country.label} / {country.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={locationValue} />
        </div>
        <CreationBottomBar />
      </form>
    </section>
  );
}
