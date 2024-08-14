import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import * as z from 'zod';

const userSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(20, 'Username is too long'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    // check if email is already in use
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { message: 'Email is already in use' },
        { status: 409 },
      );
    }

    // check if username is already in use
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { message: 'Username is already in use' },
        { status: 409 },
      );
    }

    const hashedPassoword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassoword,
        ProfileImage: `https://avatar.vercel.sh/${username}`,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: 'User created',
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred',
        error,
      },
      { status: 500 },
    );
  }
}
