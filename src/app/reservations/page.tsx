import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import * as React from 'react';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

import ListingCard from '@/components/elements/ListingCard';
import NoItem from '@/components/elements/NoItem';

async function getDataReservations(userId: number) {
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
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
      },
    },
  });

  return data;
}

export default async function ReservationsPage() {
  const session = await getServerSession(authOptions);
  const userIdFromSession = (session?.user as { userId: number } | undefined)
    ?.userId;

  if (!userIdFromSession) return redirect('/');

  const dataReservation = await getDataReservations(Number(userIdFromSession));

  return (
    <section className='container mx-auto py-5 px-10 mt-10'>
      <h2 className='text-3xl font-semibold tracking-tighter'>
        Your Reservations
      </h2>

      {dataReservation.length === 0 ? (
        <NoItem
          title='You dont have any reservations'
          description='Please make a reservation first'
        />
      ) : (
        <div className='mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {dataReservation.map((item) => (
            <ListingCard
              key={item.Home?.id}
              imagePath={item.Home?.photo as string}
              description={item.Home?.description as string}
              price={item.Home?.price as number}
              location={item.Home?.country as string}
              userId={userIdFromSession}
              favoriteId={item.Home?.Favorite[0]?.id as string}
              isFavorite={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
              homeId={item.Home?.id as string}
              pathname='/'
            />
          ))}
        </div>
      )}
    </section>
  );
}
