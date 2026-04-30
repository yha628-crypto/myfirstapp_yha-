'use client';

import { useFormState } from 'react-dom';
import { signup } from '../actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const initialState = {
  error: null,
  success: false,
};

export default function SignupPage() {
  const [state, formAction] = useFormState(signup, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      router.push('/login');
    } else if (state.error) {
      alert(state.error);
    }
  }, [state, router]);

  return (
    <div className="glass-container">
      <div className="icon-container">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <line x1="19" y1="8" x2="19" y2="14"></line>
          <line x1="22" y1="11" x2="16" y2="11"></line>
        </svg>
      </div>

      <h2>계정 생성</h2>
      <p className="subtitle">새로운 계정을 만들어보세요</p>

      <form action={formAction} className="auth-form">
        <div className="input-group">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" name="name" placeholder="홍길동" required />
        </div>

        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" name="email" placeholder="example@email.com" required />
        </div>

        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" placeholder="••••••••" required />
        </div>

        <div className="input-group">
          <label htmlFor="password-confirm">비밀번호 확인</label>
          <input type="password" id="password-confirm" name="password-confirm" placeholder="••••••••" required />
        </div>

        <button type="submit" className="submit-btn">가입하기</button>
      </form>

      <p className="switch-page">이미 계정이 있으신가요? <Link href="/login" style={{ cursor: 'pointer', color: '#00f2fe' }}>로그인</Link></p>
    </div>
  );
}
