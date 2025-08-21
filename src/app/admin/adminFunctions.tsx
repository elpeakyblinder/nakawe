'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Definimos los tipos para las props que el componente recibirá.
type Props = {
  mainTitle: string
  title: string
  description: string
  searchPlaceholder: string
  buttonText: string
  onNew: () => void // Función que se ejecutará al hacer clic en el botón "Nuevo".
}

export default function AdminFunctions({
  mainTitle,
  title,
  description,
  searchPlaceholder,
  buttonText,
  onNew,
}: Props) {
  // --- LÓGICA DEL MENÚ MÓVIL ---
  // 1. Estado para controlar si el menú está abierto o cerrado.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // 2. Función para abrir/cerrar el menú.
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 3. Efecto para cerrar el menú automáticamente al cambiar de página.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  // --- FIN DE LA LÓGICA ---

  return (
    <>
      {/* Título principal del panel */}
      <h2>{mainTitle}</h2>

      <hr />

      {/* Título y descripción con el botón de hamburguesa */}
      <div className='navBarAdminMobile'>
        <h3>{title}</h3>
        {/* Este botón ahora controla el estado local */}
        <button onClick={toggleMenu} className="hamburgerBtn">
          <Image src={'/iconos/burgerBlack.svg'} alt='burger icon' width={40} height={40}/>
        </button>
      </div>
      <p>{description}</p>

      {/* Contenedor para los botones de acción y búsqueda */}
      <div className="panelAdminButtonsOptions">
        <input type="text" placeholder={searchPlaceholder} />
        <div>          
          <button>
            <Image src={'/iconos/filter.svg'} alt="filter icon" width={20} height={20} />
            Filtros
          </button>
          <button>
            <Image src={'/iconos/export.svg'} alt="export icon" width={20} height={20} />
            Exportar
          </button>
          <button onClick={onNew}>
            <Image src={'/iconos/add.svg'} alt="add icon" width={20} height={20} />
            {buttonText}
          </button>
        </div>
      </div>

      {/* 4. RENDERIZADO CONDICIONAL DEL MENÚ OVERLAY */}
      {/* Este bloque <nav> solo aparecerá si isMenuOpen es true */}
      {isMenuOpen && (
        <nav className='adminMobileNavOverlay'>
          <div className="navCloseBtnContainer">
              <button onClick={toggleMenu} className="navCloseBtn">
                  <Image src={'/iconos/burgerBlack.svg'} alt='Cerrar Menú' width={50} height={50} />
              </button>
            <Image src={'/logoNakawe.png'} alt='logo nakawe' width={150} height={50} />
          </div>
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
      )}
    </>
  )
}
