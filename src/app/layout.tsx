'use client'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import { League_Spartan } from 'next/font/google'

const leagueSpartan = League_Spartan({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNav = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className={leagueSpartan.className}>
        {!hideNav && (
          <nav className="navBar">
            <Image src="/logoNakawe.png" alt="Logo Nakawe" width={170} height={50} />

            <div className="linksDiv">
              <Link className='links' href={'/'}>Cine</Link>
              <Link className='links' href={'/colecciones'}>Colecciones</Link>
              <Link className='links' href={'/'}>Objetivos</Link>
              <Link className='links' href={'/sobre-nosotros'}>Sobre nosotros</Link>
              <Link className='links' href={'/'}>Talleres</Link>
            </div>

            <div className="rightNavBar">
              <Image src='/language.svg' alt="Icono de lenguaje" width={25} height={25} />
              <button><Link className="iniciarSesionLink" href={'/login'}>Iniciar sesión</Link></button>
            </div>
          </nav>
        )}

        {children} {/*Contenido principal*/}
      </body>
    </html>
  );
}
