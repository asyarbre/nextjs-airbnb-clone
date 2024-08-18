import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { useCountries } from '@/lib/getCountries';

import {
  AddFavoriteButton,
  DeleteFavoriteButton,
} from '@/components/elements/SubmitButton';

import { addToFavorite, deleteFavorite } from '@/actions/action';

interface ListingCardProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: number | undefined;
  isFavorite: boolean;
  favoriteId: string;
  homeId: string;
  pathname: string;
}

export default function ListingCard({
  imagePath,
  description,
  location,
  price,
  userId,
  isFavorite,
  favoriteId,
  homeId,
  pathname,
}: ListingCardProps) {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <section className='flex flex-col'>
      <div className='relative h-72'>
        <Image
          src={`https://djbwfrjvtnsghpuhpvpo.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt='Image of House'
          fill
          className='rounded-lg h-full object-cover'
        />
        {userId && (
          <div className='z-10 absolute top-2 right-2'>
            {isFavorite ? (
              <form action={deleteFavorite}>
                <input type='hidden' name='favoriteId' value={favoriteId} />
                <input type='hidden' name='userId' value={userId} />
                <input type='hidden' name='pathname' value={pathname} />
                <DeleteFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type='hidden' name='homeId' value={homeId} />
                <input type='hidden' name='userId' value={userId} />
                <input type='hidden' name='pathname' value={pathname} />
                <AddFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`} className='mt-2'>
        <h3 className='font-medium text-base'>
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className='text-muted-foreground line-clamp-2'>{description}</p>
        <p className='pt-2 text-muted-foreground'>
          <span className='font-medium text-black'>${price} </span>Night
        </p>
      </Link>
    </section>
  );
}
