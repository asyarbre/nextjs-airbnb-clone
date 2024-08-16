import * as React from 'react';

import CreationBottomBar from '@/components/elements/CreationBottomBar';
import SelectedCategory from '@/components/elements/SelectedCategory';

import { createCategoryPage } from '@/actions/action';

export default function StructurePage({ params }: { params: { id: string } }) {
  return (
    <section>
      <div className='w-3/5 mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Which of these best descrive your home?
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input type='hidden' name='homeId' value={params.id} />
        <SelectedCategory />
        <CreationBottomBar />
      </form>
    </section>
  );
}
