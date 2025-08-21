import { Montserrat as MontserratFont } from 'next/font/google';
import './globals.css';
import { getAuthenticatedUserProfile } from '@/lib/data';
import Navbar from '@/components/layout/Navbar';
import type { Metadata } from 'next'


export const dynamic = 'force-dynamic';

const montserrat = MontserratFont({ subsets: ['latin'] });

export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1.0',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthenticatedUserProfile();

  return (
    <html lang="es">
      <body className={montserrat.className}>
        <Navbar user={user} />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}