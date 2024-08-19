import { Bath, Bed, PersonStanding } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import * as React from 'react';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { useCountries } from '@/lib/getCountries';

import CategoryShowCase from '@/components/elements/CategoryShowCase';
import { HomeMap } from '@/components/elements/HomeMap';
import ReservationSubmitButton from '@/components/elements/SubmitButton';
import { Button } from '@/components/ui/button';
import Calendar from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';

import { createReservation } from '@/actions/action';

async function getDataHome(homeId: string) {
  const dataHome = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      id: true,
      title: true,
      photo: true,
      country: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      price: true,
      description: true,
      categoryName: true,
      User: {
        select: {
          ProfileImage: true,
          username: true,
        },
      },
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
    },
  });

  return dataHome;
}

export default async function HomePage({ params }: { params: { id: string } }) {
  const data = await getDataHome(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);

  const session = await getServerSession(authOptions);
  const userIdFromSession = (session?.user as { userId: number } | undefined)
    ?.userId;

  if (!userIdFromSession) return redirect('/');

  return (
    <section className='container mx-auto w-[75%] my-10'>
      <h1 className='font-medium text-2xl mb-5'>{data?.title}</h1>
      <div className='relative h-[500px]'>
        <Image
          src={`https://djbwfrjvtnsghpuhpvpo.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt='Image of House'
          fill
          className='rounded-lg h-[500px] object-cover'
        />
      </div>
      <div className='flex justify-between gap-x-24 mt-8'>
        <div className='w-2/3'>
          <h3 className='text-xl font-medium'>
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className='flex w-full gap-x-2 text-muted-foreground mt-2'>
            <div className='flex gap-x-1'>
              <PersonStanding />
              <p>{data?.guests} Guests </p>
            </div>
            <div className='flex gap-x-1'>
              <Bed />
              <p>{data?.bedrooms} Bedrooms </p>
            </div>
            <div className='flex gap-x-1'>
              <Bath />
              <p>{data?.bathrooms} Bathrooms </p>
            </div>
          </div>
          <div className='flex items-center mt-8'>
            <Image
              src={
                data?.User?.ProfileImage ??
                'https://avatar.vercel.sh/rauchg.svg?text=US'
              }
              alt='User Profile'
              width={50}
              height={50}
              className='w-11 h-11 rounded-full'
            />
            <div className='flex flex-col ml-4'>
              <h3 className='font-medium'>Hosted By {data?.User?.username}</h3>
              <p className='text-sm text-muted-foreground'>Host Since 2015</p>
            </div>
          </div>
          <Separator className='my-6' />
          <CategoryShowCase categoryName={data?.categoryName as string} />
          <Separator className='my-6' />
          <p className='text-muted-foreground'>{data?.description}</p>
          <Separator className='my-6' />
          <HomeMap locationValue={country?.value as string} />
        </div>
        <form action={createReservation}>
          <input type='hidden' name='homeId' value={params.id} />
          <input type='hidden' name='userId' value={userIdFromSession} />
          <Calendar reservation={data?.Reservation} />

          {userIdFromSession ? (
            <ReservationSubmitButton />
          ) : (
            <Button className='w-full' asChild>
              <Link href='/signin'>Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </section>
  );
}
