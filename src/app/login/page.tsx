'use client';

import { useFormState } from 'react-dom';
import { login } from '../actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const initialState = {
  error: null,
  success: false,
  user: null,
};

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state.success && !isSuccess) {
      setIsSuccess(true);
      
      // 폭죽 효과 실행
      var duration = 3 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#00f2fe', '#4facfe', '#fa709a', '#fee140']
        }));
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#00f2fe', '#4facfe', '#fa709a', '#fee140']
        }));
      }, 250);

      // 일정 시간 후 메인 페이지로 이동
      setTimeout(() => {
        router.push('/');
      }, 3500);

    } else if (state.error) {
      alert(state.error);
    }
  }, [state, router, isSuccess]);

  if (isSuccess) {
    return (
      <div className="glass-container">
        <h2>로그인 성공! 🎉</h2>
        <p className="subtitle">{state.user?.name}님 환영합니다!</p>
      </div>
    );
  }

  return (
    <div className="glass-container">
      <div className="icon-container">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10 17 15 12 10 7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
      </div>

      <h2>환영합니다</h2>
      <p className="subtitle">계정에 로그인하세요</p>

      <form action={formAction} className="auth-form">
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" name="email" placeholder="example@email.com" required />
        </div>

        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" placeholder="••••••••" required />
        </div>

        <div className="options-group">
          <label className="checkbox-container">
            <input type="checkbox" />
            로그인 유지
          </label>
          <a href="#" className="forgot-link">비밀번호 찾기</a>
        </div>

        <button type="submit" className="submit-btn">로그인</button>
      </form>

      <p className="switch-page">계정이 없으신가요? <Link href="/signup" style={{ cursor: 'pointer', color: '#00f2fe' }}>회원가입</Link></p>
    </div>
  );
}
