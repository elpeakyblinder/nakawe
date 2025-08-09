import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import "./admin.css";
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className='bodyAdmin'>
      {/* Sidebar */}
      <nav className='bodyAdminNav'>
        <Image src={'/logoNakawe.png'} alt='logo nakawe' width={150} height={50} />
        <hr />
        <div className='sidebarLinks'>
          <Link href={'/admin'}>Usuarios</Link>
          <Link href={'/admin/artisans'}>Artesanos</Link>
          <Link href={'/admin/categories'}>Categorias</Link>
          <Link href={'/admin/collections'}>Colecciones</Link>
          <Link href={'/admin/products'}>Productos</Link>
          <Link href={'/admin/roles'}>Roles</Link>
          <Link href={'/admin/user-roles'}>Roles de usuario</Link>
        </div>
      </nav>

      {/* Área de contenido principal */}
      <main className='panelAdmin'>
        {children}
      </main>
    </div>
  );
}