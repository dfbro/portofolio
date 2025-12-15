'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SECRET_PASS = process.env.SECRET_PASS;

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const password = formData.get('password');
    
    if (password === SECRET_PASS) {
      const session = { isLoggedIn: true, expires: Date.now() + 24 * 60 * 60 * 1000 };
      cookies().set('session', JSON.stringify(session), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
    } else {
      return 'Authentication failed.';
    }
  } catch (error) {
    if ((error as Error).message.includes('credentialssignin')) {
      return 'Authentication failed.';
    }
    throw error;
  }
  redirect('/admin/dashboard');
}

export async function logout() {
  cookies().delete('session');
  redirect('/admin');
}
