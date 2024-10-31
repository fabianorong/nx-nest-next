import { authFetch } from '@/src/lib/authFetch';
import { BACKEND_URL } from '@/src/lib/constants';
import { deleteSession } from '@/src/lib/session';
import { revalidatePath } from 'next/cache';

import { redirect, RedirectType } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const response = await authFetch(`${BACKEND_URL}/auth/signout`, {
    method: 'POST',
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
  await deleteSession();

  // revalidatePath('/', 'layout');
  // revalidatePath('/', 'page');
  // return NextResponse.redirect(new URL('/', req.nextUrl));
  redirect('/auth/signin', RedirectType.push);
}
