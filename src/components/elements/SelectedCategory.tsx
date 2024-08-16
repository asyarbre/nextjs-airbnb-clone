'use client';

import Image from 'next/image';
import * as React from 'react';

import { categoryItems } from '@/data/categoryItems';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function SelectedCategory() {
  const [selectedCategory, setSelectedCategory] = React.useState<
    string | undefined
  >(undefined);

  return (
    <div className='grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-32'>
      <input
        type='hidden'
        name='categoryName'
        value={selectedCategory as string}
      />
      {categoryItems.map((category) => (
        <div key={category.id} className='cursor-pointer'>
          <Card
            className={
              selectedCategory === category.name
                ? 'border-primary border-2'
                : ''
            }
            onClick={() => setSelectedCategory(category.name)}
          >
            <CardHeader>
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={32}
                height={32}
                className='w-8 h-8'
              />
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
