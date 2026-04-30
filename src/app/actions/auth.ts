'use server';

import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';

export async function signup(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('password-confirm') as string;

  if (password !== passwordConfirm) {
    return { error: '비밀번호가 일치하지 않습니다.' };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: '이미 가입된 이메일입니다.' };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password, // In a real app, hash this with bcrypt!
      },
    });
    
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: '회원가입 중 오류가 발생했습니다.' };
  }
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return { error: '이메일이나 비밀번호가 일치하지 않습니다.' };
    }

    // In a real app, you would set a session cookie here.
    return { success: true, user: { name: user.name, email: user.email } };
  } catch (err) {
    console.error(err);
    return { error: '로그인 중 오류가 발생했습니다.' };
  }
}
