import { Montserrat as MontserratFont } from 'next/font/google';
import './globals.css';
import { getAuthenticatedUserProfile } from '@/lib/data';
import { CartProvider } from '@/context/CartProvider'
import { FavoritesProvider } from '@/context/FavoritesProvider';
import Navbar from '@/components/layout/Navbar';
import { AuthProvider } from '@/context/AuthProvider';
import { Toaster } from 'sonner'

export const dynamic = 'force-dynamic';

const montserrat = MontserratFont({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthenticatedUserProfile();

  return (
    <html lang="es">
      <body className={montserrat.className}>
        <AuthProvider user={user}>
          <CartProvider>
            <FavoritesProvider>
              <Toaster richColors position="bottom-center" />
              <Navbar user={user} />
              <main>
                {children}
              </main>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}