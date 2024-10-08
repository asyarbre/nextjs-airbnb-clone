'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import prisma from '@/lib/db';
import { supabase } from '@/lib/supabase';

export async function createHome({ userId }: { userId: number }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: Number(userId),
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: Number(userId),
      },
    });

    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.home.create({
      data: {
        userId: Number(userId),
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get('categoryName') as string;
  const homeId = formData.get('homeId') as string;

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });

  return redirect(`/create/${data.id}/description`);
}

export async function CreateDescription(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price');
  const imageFile = formData.get('image') as File;
  const guestNumber = formData.get('guest') as string;
  const roomNumber = formData.get('room') as string;
  const bathroomNumber = formData.get('bathroom') as string;
  const homeId = formData.get('homeId') as string;

  const { data: imageData } = await supabase.storage
    .from('images')
    .upload(`${imageFile.name}-${new Date().toISOString()}`, imageFile, {
      cacheControl: '3600',
      contentType: 'image/png',
    });

  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title,
      description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomNumber,
      guests: guestNumber,
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get('homeId') as string;
  const countryValue = formData.get('countryValue') as string;

  await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addedLocation: true,
      country: countryValue,
    },
  });

  return redirect('/');
}

export async function addToFavorite(formData: FormData) {
  const homeId = formData.get('homeId') as string;
  const userId = formData.get('userId');
  const pathname = formData.get('pathname') as string;

  await prisma.favorite.create({
    data: {
      homeId: homeId,
      userId: Number(userId),
    },
  });

  revalidatePath(pathname);
}

export async function deleteFavorite(formData: FormData) {
  const favoriteId = formData.get('favoriteId') as string;
  const userId = formData.get('userId') as string;
  const pathname = formData.get('pathname') as string;

  await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: Number(userId),
    },
  });

  revalidatePath(pathname);
}

export async function createReservation(formData: FormData) {
  const homeId = formData.get('homeId') as string;
  const userId = formData.get('userId');
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  await prisma.reservation.create({
    data: {
      homeId: homeId,
      userId: Number(userId),
      startDate,
      endDate,
    },
  });

  return redirect('/');
}
