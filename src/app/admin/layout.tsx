
'use client'
// app/admin/layout.tsx
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import UserForm from './UserForm'

import "./admin.css";
import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [showForm, setShowForm] = useState(false)

  const handleNew = () => {
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
  }
  return (
    <html>
      <body className='bodyAdmin'>
        <nav className='bodyAdminNav'>
          <Image src={'/logoNakawe.png'} alt='logo nakawe' width={150} height={50} />

          <hr />

          <div>
            <Link className='' href={'/'}>Usuarios</Link>
            <Link className='' href={'/'}>Colecciones</Link>
            <Link className='' href={'/'}>Productos</Link>
            <Link className='' href={'/'}>Cine</Link>
            <Link className='' href={'/'}>Revista</Link>
          </div>
        </nav>

        {/* ESTA SECCION AUN NO SE SABE SI VA A SER GENERATIVA */}

        <div className='panelAdmin'>
          <h2>PANEL DE ADMINISTRACION</h2>

          <hr />

          <h3>Gestion de usuarios</h3>
          <p>Administra la información de los usuarios registrados.</p>

          <div className='panelAdminButtonsOptions'>
            <input type="text" placeholder='Busca un usuario'/>
            <button><Image src={'/iconos/filter.svg'} alt='filter icon' width={20} height={20} />Filtros</button>
            <button><Image src={'/iconos/export.svg'} alt='export icon' width={20} height={20} />Exportar</button>
            <button onClick={handleNew}>
              <Image src={'/iconos/add.svg'} alt='add icon' width={20} height={20} />
              Nuevo usuario
            </button>
          </div>

          {showForm && (
            <div className="modalOverlay">
              <div className="modalContent">
                <h2>Nuevo Usuario</h2>
                <UserForm
                  mode="create"
                  onSuccess={() => {
                    closeForm()
                    // Opcional: aquí podrías disparar un evento para refrescar la lista en page.tsx
                  }}
                />
                <button className="cerrarBtn" onClick={closeForm}>Cerrar</button>
              </div>
            </div>
          )}


            {children}
        </div>
      </body>
    </html>
  )
}