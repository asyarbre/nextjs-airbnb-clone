import * as React from 'react';

import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddressPage() {
  return (
    <section>
      <div className='w-3/5 mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Where is your home located?
        </h2>
      </div>

      <form action=''>
        <div className='w-3/5 mx-auto'>
          <div className='mt-5'>
            <Select required>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a country' />
              </SelectTrigger>
            </Select>
          </div>
        </div>
      </form>
    </section>
  );
}
