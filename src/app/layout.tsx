import './globals.css';

export const metadata = {
  title: '앱',
  description: 'Next.js와 Prisma로 다시 작성된 앱',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
