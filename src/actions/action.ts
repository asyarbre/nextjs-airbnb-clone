'use server';

import { redirect } from 'next/navigation';

import prisma from '@/lib/db';

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
  }
}
