import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import * as React from 'react';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

import ListingCard from '@/components/elements/ListingCard';
import NoItem from '@/components/elements/NoItem';

async function getHomes(userId: number) {
  const dataHome = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return dataHome;
}

export default async function HomesPage() {
  const session = await getServerSession(authOptions);
  const userIdFromSession = (session?.user as { userId: number } | undefined)
    ?.userId;

  if (!userIdFromSession) return redirect('/signin');

  const data = await getHomes(Number(userIdFromSession));

  return (
    <section className='container mx-auto px-5 lg:px-10 my-10'>
      <h2 className='text-3xl font-semibold tracking-tight'>Your Homes</h2>
      {data.length === 0 ? (
        <NoItem
          title='You dont have any homes'
          description='Please add home to see them right here...'
        />
      ) : (
        <div className='mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {data.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo as string}
              description={item.description as string}
              price={item.price as number}
              location={item.country as string}
              userId={userIdFromSession}
              favoriteId={item.Favorite[0]?.id as string}
              isFavorite={(item.Favorite.length as number) > 0 ? true : false}
              homeId={item.id as string}
              pathname='/homes'
            />
          ))}
        </div>
      )}
    </section>
  );
}
