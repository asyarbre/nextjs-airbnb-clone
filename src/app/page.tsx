import * as React from 'react';

import prisma from '@/lib/db';

import FilterItems from '@/components/elements/FilterItems';
import ListingCard from '@/components/elements/ListingCard';
import NoItem from '@/components/elements/NoItem';
import SkeletonCard from '@/components/elements/SkeletonCard';

async function getDataHome({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      id: true,
      photo: true,
      price: true,
      description: true,
      country: true,
    },
  });

  return data;
}

export default function Home({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  return (
    <section className='container px-5 lg:px-10 mb-24'>
      <FilterItems />
      <React.Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </React.Suspense>
    </section>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const data = await getDataHome({ searchParams });

  return (
    <>
      {data.length === 0 ? (
        <NoItem />
      ) : (
        <div className='mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {data.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo as string}
              description={item.description as string}
              price={item.price as number}
              location={item.country as string}
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className='mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
