import Link from 'next/link';

export default function Home() {
  return (
    <div className="glass-container">
      <h2>환영합니다!</h2>
      <p className="subtitle">원하시는 메뉴를 선택하세요</p>

      <div className="button-group" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
        <Link href="/login" style={{ textDecoration: 'none' }}>
          <button className="submit-btn" style={{ width: '100%' }}>로그인</button>
        </Link>
        <Link href="/signup" style={{ textDecoration: 'none' }}>
          <button className="submit-btn" style={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.2)' }}>회원가입</button>
        </Link>
      </div>
    </div>
  );
}
